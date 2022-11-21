export const SET_LOGED_IN_USER = 'SET_LOGED_IN_USER';

export const setVerfiedLoginUserData = (data) => ({
    type: SET_LOGED_IN_USER,
    payload: data,
});
