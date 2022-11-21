import axios from 'axios';

const BASE_URL = "http://localhost:3000/";

export const handleAuthLogin = () => {

}

export const handleLoginConnection = async (payload) => {
    const response = await axios({
        method: 'post',
        url: `${BASE_URL}auth/user/signin`,
        data: payload
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    }else{
        return response?.response
    }
}

export const handleLogoutConnection = async (payload) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}auth/user/logout/${payload.id}`,
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return true;
    } else {
        return false;
    } 
}


// employee

export const handleCheckIn = async (token) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}employee/checkin`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handleCheckOut = async (payload) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}employee/checkout/${payload.id}`,
        headers: {
            Authorization: `Bearer ${payload.token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handleEmployeeTimeSheet = async (token) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}employee/timesheet`,
        headers: {
            Authorization:  `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handleEmployeeProfile = async (token, type) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}${type}/profile`,
        headers: {
            Authorization:  `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handlePasswordUpdation = async (payload) => {
    const response = await axios({
        method: 'post',
        url: `${BASE_URL}auth/user/changepassword`,
        data: payload
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

//  admin
export const handleEmployeeCreation = async (payload) => {
    const response = await axios({
        method: 'post',
        url: `${BASE_URL}auth/user/signup`,
        headers: {
            Authorization : payload.token
        },
        data: payload.empData
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return true
    } else {
        return false;
    }
}

export const handleEmployeeList = async (token) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}admin/employeeList`,
        headers: {
            Authorization:  `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handleViewEmployeeInfo = async (id, token) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}admin/profile/employee/${id}`,
        headers: {
            Authorization:  `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handleEmployeeDeactivate = async (token, id) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}admin/deactivate/${id}`,
        headers: {
            Authorization:  `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}

export const handleEmployeeActivate = async (token, id) => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}admin/activate/${id}`,
        headers: {
            Authorization:  `Bearer ${token}`
        },
    }).then(res => res).catch(err => err);
    if (response?.status === 200) {
        return response?.data;
    } else {
        return response?.response?.data
    } 
}




























