import { act } from "react-test-renderer";
import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
    LOGIN_USER_LOAD, TYPE_ADD_FAIL, TYPE_ADD_SUCCESS
} from '../types';

const INITIAL_STATE = {
    email: '', password: '',
    user: null, usertype: false, error: '', loading: false
};

export default (state = INITIAL_STATE, action) => {
    //    console.log("reducer:", action.payload);

    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            //console.log("in login reducer:", action.payload)
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            //console.log("in login reducer:", action.payload)
            return { ...state, error: 'Authentication Failed', loading: false };
        case TYPE_ADD_SUCCESS:
            //console.log("in login reducer:", action.payload)
            return { ...state, ...INITIAL_STATE, usertype: action.payload };
        case TYPE_ADD_FAIL:
            //console.log("in login reducer:", action.payload)
            return { ...state, error: 'Type Adding Failed'};
        case LOGIN_USER_LOAD:
            //console.log("in login reducer:", action.payload)
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
}   