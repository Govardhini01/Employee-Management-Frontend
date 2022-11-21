/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setVerfiedLoginUserData } from '../common/store/UserAction';
import { handleCheckIn, handleCheckOut, handleLoginConnection, handleLogoutConnection } from '../common/services';
import { useNavigate } from 'react-router-dom';
import AdminDashBoard from './Admin';
import EmployeeDashBoard from './Employee';
import './index.css';


const DashBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.users.logedinUser);
    const [checkIn, setCheckIn] = useState(false);
    const [checkInResponse, setCheckInResponse] = useState('');

    const login = async (token) => {
        const loginResponse = await handleLoginConnection({
            email: token.email,
            password: token.password,
        });
        if (loginResponse.token) {
            dispatch(setVerfiedLoginUserData(loginResponse))
        }
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('loginToken'));
        const checkInStatus = JSON.parse(localStorage.getItem('checkIn'));
        if (token && !userData?.token) {
            login(token);
        }
        if(checkInStatus?.status){
            setCheckIn(checkInStatus)
            setCheckInResponse(checkInStatus?.checkResponse)
        }
    }, [])

    const handleLogout = async () => {
        const logoutResponse = await handleLogoutConnection({
            id: userData._id,
        });
        if (logoutResponse) {
            localStorage.clear();
            dispatch(setVerfiedLoginUserData({}))
            navigate('/');
        }
    }

    const handleCheckin = async () => {
        if (!checkIn) {
            const checkinResponse  = await handleCheckIn(userData.token)
            if(checkinResponse?.checkIn){
               setCheckIn(true);
               localStorage.setItem('checkIn', JSON.stringify({status:true, checkResponse:checkinResponse }));
               setCheckInResponse(checkinResponse);
           }
        }else{
            const checkOutResponse  = await handleCheckOut({
                id: checkInResponse._id,
                token: userData.token
            })
            if(checkOutResponse?.checkOut){
                setCheckIn(false);
                localStorage.setItem('checkIn', JSON.stringify({status:false, checkResponse:checkOutResponse }));
                setCheckInResponse(checkOutResponse);
            }
        }
    }

    return (
        userData?.email ?
            <div>
                < div className="header-container" >
                    <div className='user-name'>
                        {`Welcome`}
                        <span>{userData?.email}</span>
                    </div>
                    <div className='user-actions'>
                        {userData?.userType === "employee" && <Button className='Check-btn' onClick={handleCheckin}>{checkIn ? 'Checkout' : 'Checkin'}</Button>}
                        <Button className='logout-btn' onClick={handleLogout}>Logout</Button>
                    </div>
                </div >
                <div>
                    {userData?.userType === "admin" && <AdminDashBoard adminData={userData} />}
                    {userData?.userType === "employee" && <EmployeeDashBoard EmployeeData={userData} checkIn={checkIn} />}
                </div>
            </div >
            : ''
    )
}

export default DashBoard