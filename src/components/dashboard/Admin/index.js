import React from 'react';
import { Button, Grid } from '@mui/material';
import Sidenav from './Sidenav/Sidenav';
import EmployeeList from './Main/EmployeeList/EmployeeList';
import CreateEmployee from './Main/CreateEmployee/CreateEmployee';
import Profile from './Main/Profile/Profile';
import ResetPassword from './Main/ResetPassword/ResetPassword';
import './index.css';


const AdminDashBoard = ({ adminData }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const getSelectedMenu = () => {
        switch (selectedIndex) {
            case 0: return <EmployeeList adminData={adminData} />;
            case 1: return <CreateEmployee adminData={adminData} />;
            case 2: return <Profile userData={adminData} />;
            case 3: return <ResetPassword userData={adminData} />;

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

export default AdminDashBoard