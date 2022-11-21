import React, { useState } from 'react'
import { Alert, Button, Snackbar, TextField, } from '@mui/material';
import { handlePasswordUpdation } from '../../../../common/services';
import pwdreset from '../../../../../../src/assests/images/pwd-reset.jpg'
import './ResetPassword.css';

const ResetPassword = ({ userData }) => {
  const [passwordDetails, setPasswordDetails] = useState({
    currentPwd: '',
    newPwd: '',
    confirmPwd: '',
  });
  const [changePwdStatus, setChangePwdStatus] = useState({
    status: '',
    message: ''
  });
  const [updationStatus, setUpdationStatus] = useState(false);

  const getPasswordErrorSatus = () => {
    let error = '';
    const { currentPwd, confirmPwd, newPwd } = passwordDetails;
    const pwdReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!currentPwd || !confirmPwd || !newPwd) {
      error = 'Please enter Passwords';
    } else if (confirmPwd !== newPwd) {
      error = 'New password and Confirm password must be same';
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
        email: userData.email,
        currentPassword: passwordDetails.currentPwd,
        newPassword: passwordDetails.newPwd,
      })
      if (pwdResponse.token) {
        setUpdationStatus(true);
        setPasswordDetails({
          currentPwd: '',
          newPwd: '',
          confirmPwd: '',
        });
        setChangePwdStatus({
          status: 'success',
          message: 'Password Updated Successfully'
        })
      } else {
        setChangePwdStatus({
          status: 'failed',
          message: 'Password Updated Failed'
        })
      }
    } else {
      setChangePwdStatus({
        status: 'failed',
        message: 'Password Updated Failed'
      })
    }
  }

  return (
    <div className="reset-container">
      <div className='empchangepwd-form'>
        <p className='changepwd-header'>Reset your password</p>
        {changePwdStatus.status === 'failed' && <p className='failed'>{changePwdStatus.message}</p>}
        {updationStatus && (
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={updationStatus}
            autoHideDuration={4000}
            onClose={() => setUpdationStatus(false)}>
            <Alert onClose={() => setUpdationStatus(false)} severity="success" sx={{ width: '100%' }}>
              Password Updated successfully
            </Alert>
          </Snackbar>
        )}
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
            Change Password
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
      <div className='resetEmp-bg'>
        <img src={pwdreset} alt="password-reset-form-background" />
      </div>
    </div>
  )
}

export default ResetPassword