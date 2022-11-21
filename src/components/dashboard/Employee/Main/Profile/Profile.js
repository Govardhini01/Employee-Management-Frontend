/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { handleEmployeeProfile } from '../../../../common/services';
import './Profile.css';

const Profile = ({ userData }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getAdminProfile()
  }, [])

  const getAdminProfile = async () => {
    const profileRes = await handleEmployeeProfile(userData.token,'employee')
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
              <td>{`Joining Date :`}</td>
              <td>{moment(profile?.joiningDate).format('MMMM Do YYYY')}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Profile