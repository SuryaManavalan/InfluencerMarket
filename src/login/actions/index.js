import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Actions } from 'react-native-router-flux'
import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
    LOGIN_USER_LOAD, SIGNUP_USER_FAIL, TYPE_ADD_FAIL, TYPE_ADD_SUCCESS, TYPE_UPDATE, RESET_ERROR
} from '../types'

export const emailChanged = (text) => {
    //console.log("action:", text)
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const typeUpdate = (text) =>{
    return {
        type: TYPE_UPDATE,
        payload: text
    };
};

export const loginUser = ({ email, password, navigation }) => {
    //console.log("index login:", email);
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_LOAD });
        auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user, navigation)
            })
            .catch((error) => {
                console.log("login error", error)
                loginUserFail(dispatch);
            });
    }
};

export const signupUser = ({ email, password, usertype }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_LOAD });
        auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user)
                if (usertype == "influencer") {
                    firestore().collection('influencers')
                        .add({
                            UID: auth().currentUser.uid,
                            email: email,
                        }).then(data => {
                            typeAddSuccess(dispatch, data)
                        })
                        .catch((error) => {
                            typeAddFail(dispatch);
                        });
                } else if (usertype == "company") {
                    firestore().collection('companies')
                        .add({
                            UID: auth().currentUser.uid,
                            email: email,
                        }).then(data => {
                            typeAddSuccess(dispatch, data)
                        })
                        .catch((error) => {
                            typeAddFail(dispatch);
                        });
                }
            }).catch((error) => {
                console.log("signup error", error)
                signupUserFail(dispatch);
            });
    }
};

export const resetError = () => {
    return{
        type: RESET_ERROR
    };
}

export const typeAddFail = (dispatch) => {
    dispatch({
        type: TYPE_ADD_FAIL
    });
}

export const typeAddSuccess = (dispatch, data) => {
    dispatch({
        type: TYPE_ADD_SUCCESS,
        payload: data
    });
}

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
}

const signupUserFail = (dispatch) => {
    dispatch({
        type: SIGNUP_USER_FAIL
    });
}

const loginUserSuccess = (dispatch, user, navigation) => {
    console.log("login success");
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
}