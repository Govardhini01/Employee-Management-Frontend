import React from 'react';
import workingHours from '../../../assests/images/working-hours.png';
import tablesimg from '../../../assests/images/tables.png';
import secureLogin from '../../../assests/images/secure-login.jpg';
import multipleHours from '../../../assests/images/multiple-roles.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../Index.css';

const Features = () => {
    return (
        <div className='features-container'>
            <div className='features-header'>
                <h1>Explore Features</h1>
            </div>
            <div className='features-section'>
                <div className='feature-card'>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={multipleHours}
                                className='card-image'
                                alt="multiple roles"
                            />
                            <CardContent height="120" className='feature-card-content'>
                                <Typography className='card-header' gutterBottom variant="h5" component="div">
                                    Multiple Roles
                                </Typography>
                                <Typography className='card-content' variant="body2" color="text.secondary">
                                    Provides a powerful but simple way to manage both admin and employee access with single interface
                                    smarter and more efficient software.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className='feature-card'>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={secureLogin}
                                className='card-image'
                                alt="secure login"
                            />
                            <CardContent height="120" className='feature-card-content'>
                                <Typography className='card-header' gutterBottom variant="h5" component="div">
                                    Secure Login
                                </Typography>
                                <Typography className='card-content' variant="body2" color="text.secondary">
                                security is the foundation of everything, we deploy industry-leading safety measures so you can rest assured that your data is safe and protected.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className='feature-card'>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={workingHours}
                                alt="Calculated Working Hours"
                                className='card-image'
                            />
                            <CardContent height="120" className='feature-card-content'>
                                <Typography className='card-header' gutterBottom variant="h5" component="div">
                                    Working Hours
                                </Typography>
                                <Typography className='card-content' variant="body2" color="text.secondary">
                                Spend less time tracking time and days off. Time and attendance system lets you focus on employee productivity while accurately tracking work hours and providing error-free reporting.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className='feature-card'>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={tablesimg}
                                className='card-image'
                                alt="tabular view"
                            />
                            <CardContent height="120" className='feature-card-content'>
                                <Typography className='card-header' gutterBottom variant="h5" component="div">
                                    Tables View
                                </Typography>
                                <Typography className='card-content' variant="body2" color="text.secondary">
                                Get insight on how each emloyee is performing, every individual's skills and potential, and the ways you can improve employee performance. and can view in more interactive way.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Features