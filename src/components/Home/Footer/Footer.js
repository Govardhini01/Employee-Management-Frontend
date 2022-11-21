import React from 'react';
import { Facebook, LinkedIn, YouTube, Twitter } from '@mui/icons-material';
import '../Index.css';

const Footer = () => {
    return (
        <div>
            <div className='login-content'>
                <p>Plan better with real-time information on employee absences.
                    Improve your employee engagement by allowing your employees to check-in from the web app.
                    Admin can also choose how to calculate the total work hours based on the number of check-in and check-out.
                    It can be integrated with a time tracker to allow employees to log their daily, weekly, and monthly work hours.
                    These reports give you an tabular view of the logged attendance and work hours.</p>
            </div>
            <div className='footer-content'>
                <div className='footer-menu footer-section'>
                    <p className='footer-title'>Login Portal</p>
                    <ul className='footer-menu footer-list'>
                        <li>Empoyee</li>
                        <li>Admin</li>
                    </ul>
                </div>
                <div className='footer-features footer-section'>
                    <p className='footer-title'>Features</p>
                    <ul className='footer-features footer-list'>
                        <li>Multiple Roles</li>
                        <li>Secure Login</li>
                        <li>Working Hours</li>
                        <li>Tables View</li>
                    </ul>
                </div>
                <div className='footer-address footer-section'>
                    <p className='footer-title'>Address</p>
                    <ul className='footer-address footer-list'>
                        <li>address one</li>
                        <li>address two</li>
                        <li>sample@gmail.com</li>
                    </ul>
                </div>
                <div className='footer-connections footer-section'>
                    <div className='connections-section'>
                        <p className='footer-title'>Connect With us</p>
                        <div className='footer-icons footer-list'>
                            <li><Facebook className='footer-icon' /></li>
                            <li><Twitter className='footer-icon' /></li>
                            <li><YouTube className='footer-icon' /></li>
                            <li><LinkedIn className='footer-icon' /></li>
                        </div>
                    </div>
                    <div className='support-section'>
                        <p className='footer-title'>Application Support</p>
                        <p className='devices'>Web Application / Mobile</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer