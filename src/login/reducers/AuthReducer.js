import { act } from "react-test-renderer";
import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
    LOGIN_USER_LOAD, SIGNUP_USER_FAIL, TYPE_ADD_FAIL, TYPE_ADD_SUCCESS, TYPE_UPDATE, RESET_ERROR
} from '../types';

const INITIAL_STATE = {
    email: '', password: '',
    user: null, usertype: "influencer", error: '', loading: false
};

const SIGNUP_INITIAL_STATE = {
    email: '', password: '',
    usertype: "influencer", error: '', loading: false
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
            return { ...state, ...SIGNUP_INITIAL_STATE, usertype: action.payload };
        case SIGNUP_USER_FAIL:
            //console.log("in login reducer:", action.payload)
            return { ...state, error: 'Invalid Email or Password', loading: false };
        case TYPE_ADD_FAIL:
            //console.log("in login reducer:", action.payload)
            return { ...state, error: 'Type Adding Failed' };
        case TYPE_UPDATE:
            return { ...state, usertype: action.payload };
        case LOGIN_USER_LOAD:
            //console.log("in login reducer:", action.payload)
            return { ...state, loading: true, error: '' };
        case RESET_ERROR:
            return { ...state, error: '' };
        default:
            return state;
    }
}   