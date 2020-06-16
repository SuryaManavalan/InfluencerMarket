import React, {Component } from 'react';
import  {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
//import firebase from 'firebase';
//import LoginForm from './login/components/LoginForm';
import ReduxThunk from 'redux-thunk';
import Router from './router';

class App extends Component {
    // componentDidMount() {
    //     firebase.initializeApp({
    //         apiKey: 'AIzaSyD8d2prLQ4e7GdAcFY6_AQRsdkmcXWIgVM',
    //         authDomain: 'viralmarket-c2abe.firebaseapp.com',
    //         databaseURL: 'https://viralmarket-c2abe.firebaseio.com',
    //         projectId: 'viralmarket-c2abe',
    //         storageBucket: 'viralmarket-c2abe.appspot.com',
    //         messagingSenderId: '603367597747',
    //         appId: '1:603367597747:web:82716303ce8c8339c472c6'
    //       });
    // }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default App;