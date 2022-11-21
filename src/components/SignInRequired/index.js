/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignInRequired = ({ children }) => {
    const navigate = useNavigate();
    const userData = useSelector(state => state.users.logedinUser);

    const token = JSON.parse(localStorage.getItem('loginToken'));
    useEffect(() => {
        if (!token && !userData?.token) {
            navigate('/');
        }
    },[])
    if (token) {
        return children
    }
}

export default SignInRequired