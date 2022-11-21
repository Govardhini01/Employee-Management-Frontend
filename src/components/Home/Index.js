import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, CircularProgress, TextField } from '@mui/material';
import loginBg from '../../assests/images/image-one.jpg';
import userLoginProfile from '../../assests/images/user-login.jpg';
import Features from './Features/Features';
import Footer from './Footer/Footer';
import PasswordUpdate from './PasswordUpdate/PasswordUpdate';
import { handleLoginConnection } from '../common/services';
import { setVerfiedLoginUserData } from '../common/store/UserAction';
import { useNavigate } from 'react-router-dom';
import './Index.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isLoginloading, setIsLoginLoading] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState({
        status: false,
        messaage: '',
    });
    const [isPwdUpdate, setIsPwdUpdate] = useState(false);
    const [loginData, setLoginData] = useState({});
    const [hasError, setHasError] = useState({
        email: '',
        password: '',
    });

    const resetForm = () => {
        setHasError({
            email: '',
            password: '',
        });
        setEmail('');
        setPassword('');
    }

    const handleFormError = (type) => {
        if (type === 'email') {
            return !email ? 'Please enter valid email' : '';
        } else if (type === 'password') {
            if (password && password.length < 8) {
                return 'Password should contain minimun 8 characters';
            } else if (!password) {
                return 'Please enter valid password';
            }
        }
    }

    const handleLogin = async () => {
        if (email && (password && password.length >= 8)) {
            setIsLoginLoading(true);
            setTimeout(async () => {
                const loginResponse = await handleLoginConnection({
                    email,
                    password,
                });
                if (loginResponse?.firstTimeLogin) {
                    setIsLoginSuccess(true);
                    setLoginData(loginResponse);
                    resetForm();
                    if (!loginResponse.emailVerified) {
                        setIsPwdUpdate(true)
                        setIsLoginFailed({
                            status: false,
                            messaage: '',
                        });
                    }
                } else if (loginResponse?.token && !loginResponse?.firstTimeLogin && loginResponse?.email) {
                    dispatch(setVerfiedLoginUserData(loginResponse));
                    localStorage.setItem('loginToken', JSON.stringify({ email, password }));
                    navigate(`/dashboard?usertype=${loginResponse.userType}?id=${loginResponse._id}`);
                } else if (loginResponse?.data) {
                    setIsLoginFailed({
                        status: true,
                        messaage: loginResponse?.data?.info || 'Login Failed',
                    });
                }
                setIsLoginLoading(false);
            }, 2000);
        } else {
            setHasError({
                email: email ? false : true,
                password: password && password.length >= 8 ? false : true,
            });
            setIsLoginLoading(false);
        }
    }

    const loadingSpinner = () => {
        return (
            <div className='login-loading'>
                <CircularProgress className='loading-spinner' />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="header-section">
                <p className='header-title'>Welcome to Login Portal</p>
            </div>
            {(!isLoginSuccess || isLoginFailed.status) && (
                <>
                    <div className="login-form-container">
                        <div className='login-form'>
                            <img src={userLoginProfile} className="login-profile-img" alt='user-login' />
                            {isLoginFailed.status && <p className='login-err'>{isLoginFailed.messaage}</p>}
                            <div className='email-input'>
                                <TextField
                                    required
                                    id="email-required"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setHasError({ ...hasError, email: false });
                                    }}
                                    error={!email && hasError.email}
                                    helperText={hasError.email ? handleFormError('email') : ''}
                                />
                            </div>
                            <div className='password-input'>
                                <TextField
                                    required
                                    id="password-input"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setHasError({ ...hasError, password: false });
                                    }}
                                    error={hasError.password}
                                    helperText={hasError.password ? handleFormError('password') : ''}
                                />
                            </div>

                            {isLoginloading ? loadingSpinner() :
                                (
                                    <div className='submit-btn'>
                                        <Button variant="contained" onClick={handleLogin}>
                                            Login
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                        <div className='login-bg'>
                            <img src={loginBg} alt="login-form-background" />
                        </div>
                    </div>
                    <div className='content-section'>
                        <Features />
                        <Footer />
                    </div>
                </>)}
            {(isPwdUpdate && loginData?.email) &&
                (<div className='otp-section'>
                    <PasswordUpdate email={loginData.email} loadingSpinner={loadingSpinner} setIsPwdUpdate={setIsPwdUpdate} setIsLoginSuccess={setIsLoginSuccess} setLoginData={setLoginData} />
                </div>)}
        </div>
    )
}

export default Login