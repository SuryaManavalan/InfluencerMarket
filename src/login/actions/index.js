import auth from '@react-native-firebase/auth';
import {Actions } from 'react-native-router-flux'
import {EMAIL_CHANGED, PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, 
    LOGIN_USER_LOAD} from '../types'

export const emailChanged= (text) => {
    //console.log("action:", text)
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged= (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser= ({email, password}) => {
    //console.log("index login:", email);
    return (dispatch) => {
        dispatch({type: LOGIN_USER_LOAD});
        auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch,user)  })
            .catch((error) =>{ 
                console.log("login error", error)
                auth().createUserWithEmailAndPassword(email, password)
                .then (user => {loginUserSuccess(dispatch,user)})
                .catch((error) =>{ 
                    //console.log("login create error", error);
                    loginUserFail(dispatch);
                })
    
            });
    }
};

const loginUserFail= (dispatch)=>{
    dispatch({
        type: LOGIN_USER_FAIL
    });
}
const loginUserSuccess= (dispatch, user) => {
    console.log("login success");
    dispatch({type: LOGIN_USER_SUCCESS,
        payload: user});
    
    Actions.campaign();

}