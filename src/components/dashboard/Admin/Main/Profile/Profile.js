import React, { useEffect, useState } from 'react';
import { handleEmployeeProfile } from '../../../../common/services';
import './Profile.css';

const Profile = ({ userData }) => {
  const [profile, setProfile] = useState({});
  
  useEffect(() => {
    getEmplyeeProfile()
  }, [])

  const getEmplyeeProfile = async () => {
    const profileRes = await handleEmployeeProfile(userData.token, 'admin')
    if(profileRes){
      setProfile(profileRes)
    }
  }
  return (
    <div className='profile-continer'>
      <div className='profile-header'>
        <h2>Your Personal Info</h2>
      </div>
      <div className='profile-content'>
        <div className='personal-info'>
          <p>Personal Information</p>
          <table>
            <tr>
              <td>{`E-mail :`}</td>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <td>{`Total Employees :`}</td>
              <td>{profile.totalEmployees}</td>
            </tr>
            <tr>
              <td>{`Total DeActive Employees :`}</td>
              <td>{profile.deActivatedEmployees}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Profile