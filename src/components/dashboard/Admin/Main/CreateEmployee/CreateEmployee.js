
import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Link, Snackbar, TextField } from '@mui/material';
import CraeteEmp from '../../../../../assests/images/createEmp.jpg';
import './CreateEmployee.css';
import { handleEmployeeCreation } from '../../../../common/services';

const CreateEmployee = ({ adminData }) => {
    const [empData, setEmpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [creationStatus, setCreationStatus] = useState(false);

    const getPasswordErrorSatus = () => {
        let error = '';
        const { email, password, confirmPassword } = empData;
        const pwdReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!password || !confirmPassword || !email) {
            error = 'Please enter valid values';
        } else if (password !== confirmPassword) {
            error = 'New password and Confirm password must be same';
        } else if (!pwdReq.test(password) || !pwdReq.test(confirmPassword)) {
            error = 'Passwords are inValid';
        }
        return error;
    }

    const createEmployee = async () => {
        const passwordStatus = getPasswordErrorSatus();
        if (!passwordStatus) {
            setLoading(true);
            setTimeout(async () => {
                const creationResponse = await handleEmployeeCreation({
                    token: adminData.token,
                    empData: {
                        email: empData.email,
                        password: empData.password,
                        userType:"employee"
                    },
                });
                if (creationResponse) {
                    setCreationStatus(true);
                    setError('');
                    setEmpData({
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                } else {
                    setError('Error in Creating Employee');
                }
                setLoading(false);
            }, 2000)
        } else {
            setError(passwordStatus);
        }
    }

    return (
        <>
            <h2 className='create-header'>Create Employee</h2>
            <div className='create-emp-container'>
                <div className="create-emp-form">
                    {error && <p className='err-msg'>{error}</p>}
                    <p className='form-header'>Please fill the below details</p>
                    {creationStatus && (
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={creationStatus}
                            autoHideDuration={4000}
                            onClose={() => setCreationStatus(false)}>
                            <Alert onClose={() => setCreationStatus(false)} severity="success" sx={{ width: '100%' }}>
                                Employee Created successfully
                            </Alert>
                        </Snackbar>
                    )}
                    <div className='email-input'>
                        <TextField
                            required
                            id="email-required"
                            label="Email"
                            value={empData.email}
                            onChange={(e) => {
                                setEmpData({ ...empData, email: e.target.value });
                                setError('');
                            }}
                        />
                    </div>
                    <div className='password-input'>
                        <TextField
                            required
                            id="password-input"
                            label="Password"
                            type="password"
                            value={empData.password}
                            onChange={(e) => {
                                setEmpData({ ...empData, password: e.target.value });
                                setError('');
                            }}
                        />
                    </div>
                    <div className='password-input'>
                        <TextField
                            required
                            id="password-input"
                            label="Confirm Password"
                            type="password"
                            value={empData.confirmPassword}
                            onChange={(e) => {
                                setEmpData({ ...empData, confirmPassword: e.target.value });
                                setError('');
                            }}
                        />
                    </div>
                    {loading ? 
                     <div className='login-loading'>
                     <CircularProgress className='loading-spinner' />
                     <span>Creating...</span>
                 </div> :
                    <div className='submit-btn'>
                        <Button variant="contained" onClick={createEmployee}>
                            Create
                        </Button>
                    </div>
}
                </div>
                <div className='createEmp-bg'>
                    <img src={CraeteEmp} alt="ceateEmp-form-background" />
                </div>
            </div>
        </>
    )
}

export default CreateEmployee