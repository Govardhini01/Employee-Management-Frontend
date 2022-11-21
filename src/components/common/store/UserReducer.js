import { SET_LOGED_IN_USER } from "./UserAction";

const INITIAL_STATE = {
    admin: {},
    employee: {},
    logedinUser: {}
};

const UserReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_LOGED_IN_USER:
            return {
                ...state, logedinUser: action.payload,
            };  

        default: return state;
    }

};

export default UserReducer;