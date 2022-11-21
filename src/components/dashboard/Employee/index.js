import React from 'react';
import { Grid } from '@mui/material';
import Sidenav from './Sidenav/Sidenav';
import EmployeeInfo from './Main/EmployeeInfo/EmployeeInfo';
import Profile from './Main/Profile/Profile';
import ResetPassword from './Main/ResetPassword/ResetPassword';
import './index.css';


const EmployeeDashBoard = ({ EmployeeData , checkIn}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const getSelectedMenu = () => {
        switch (selectedIndex) {
            case 0: return <EmployeeInfo userData={EmployeeData} checkIn={checkIn} />;
            case 1: return <Profile userData={EmployeeData} />;
            case 2: return <ResetPassword userData={EmployeeData} />;

            default:
                break;
        }
    }
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidenav selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                </Grid>
                <Grid item xs={10}>
                    {getSelectedMenu()}
                </Grid>
            </Grid>
        </div>
    )
}

export default EmployeeDashBoard