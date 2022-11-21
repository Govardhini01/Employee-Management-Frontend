import { Button, IconButton,TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLoginConnection, handlePasswordUpdation } from '../../common/services';
import { setVerfiedLoginUserData } from '../../common/store/UserAction';
import '../Index.css';

const PasswordUpdate = ({ email, setIsPwdUpdate, setIsLoginSuccess, setLoginData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [changePwdStatus, setChangePwdStatus] = useState({
        status: '',
        message: ''
    });
    const [passwordDetails, setPasswordDetails] = useState({
        currentPwd: '',
        newPwd: '',
        confirmPwd: '',
    });

    const getPasswordErrorSatus = () => {
        let error = '';
        const { currentPwd, confirmPwd, newPwd } = passwordDetails;
        const pwdReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!currentPwd || !confirmPwd || !newPwd) {
            error = 'Please enter Passwords';
        } else if (confirmPwd !== newPwd) {
            error = 'New password and Confirm password must be same';
        } else if (currentPwd === newPwd) {
            error = 'Current password and New password are equal';
        } else if (currentPwd.length < 8 || confirmPwd.length < 8 || newPwd.length < 8) {
            error = 'Passwords should contain minimun 8 characters';
        } else if ((!pwdReq.test(currentPwd)) || (!pwdReq.test(confirmPwd)) || (!pwdReq.test(newPwd))) {
            error = 'Passwords are inValid';
        }
        return error;
    }

    const handlePwdUpdation = async () => {
        const passwordStatus = getPasswordErrorSatus();
        if (!passwordStatus) {
            const pwdResponse = await handlePasswordUpdation({
                email,
                currentPassword: passwordDetails.currentPwd,
                newPassword: passwordDetails.newPwd,
            })
            if (pwdResponse.token) {
                setChangePwdStatus({
                    status: 'success',
                    message: 'Password Updated Successfully'
                })
                const loginResponse = await handleLoginConnection({
                    email,
                    password: passwordDetails.newPwd,
                });
                console.log('61', loginResponse);
                dispatch(setVerfiedLoginUserData(loginResponse));
                localStorage.setItem('loginToken', JSON.stringify({ email, password: passwordDetails.newPwd }));
                setPasswordDetails({
                    currentPwd: '',
                    newPwd: '',
                    confirmPwd: '',
                })
                navigate(`/dashboard?usertype=${loginResponse.userType}?id=${loginResponse._id}`);

            } else {
                setChangePwdStatus({
                    status: 'failed',
                    message: 'Password Updated Failed'
                })
            }
        } else {
            setChangePwdStatus({
                status: 'failed',
                message: passwordStatus
            })
        }
    }

    const handleAlertClose = () => {
        setIsPwdUpdate(false);
        setIsLoginSuccess(false);
        setLoginData({});
    }

    const backButton = () => {
        return (
            <Tooltip title="close to logout">
                <IconButton aria-label="back button" className='back-btn' onClick={() => { handleAlertClose() }}>
                    <ClearIcon />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <div className='changepwd-form'>
            <p className='changepwd-header'>
                <span>Password Change for New Account</span>
                {backButton()}
            </p>
            <p className='changepwd-msg'>
                {`Hi ${email}, Please change your password for the new createdly account.`}
            </p>
            {changePwdStatus.status === 'failed' && <p className='failed'>{changePwdStatus.message}</p>}
            <div className='password-input'>
                <TextField
                    required
                    id="text-input"
                    label="Current Password"
                    type="text"
                    value={passwordDetails.currentPwd}
                    onChange={(e) => setPasswordDetails({ ...passwordDetails, currentPwd: e.target.value })}
                    error={false}
                    helperText={''}
                />
            </div>
            <div className='password-input'>
                <TextField
                    required
                    id="text-input"
                    label="New Password"
                    type="text"
                    value={passwordDetails.newPwd}
                    onChange={(e) => setPasswordDetails({ ...passwordDetails, newPwd: e.target.value })}
                    error={false}
                    helperText={''}
                />
            </div>
            <div className='password-input'>
                <TextField
                    required
                    id="text-input"
                    label="Confirm Password"
                    type="text"
                    value={passwordDetails.confirmPwd}
                    onChange={(e) => setPasswordDetails({ ...passwordDetails, confirmPwd: e.target.value })}
                    error={false}
                    helperText={''}
                />
            </div>
            <div className='changepwd-submit-btn'>
                <Button variant="contained" onClick={handlePwdUpdation}>
                    Submit
                </Button>
            </div>
            <div className='pwd-notes'>
                <p>Note: Password must contain the following:</p>
                <ul>
                    <li>A lowerCase letter</li>
                    <li>A uppercase (capital) letter</li>
                    <li>A number</li>
                    <li>A symbol</li>
                    <li>Minimun 8 characters</li>
                </ul>
            </div>
        </div>
    )
}

export default PasswordUpdate


