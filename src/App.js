import React, {Component } from 'react';
import  {Provider} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { NavigationContainer } from '@react-navigation/native';
//import firebase from 'firebase';
//import LoginForm from './login/components/LoginForm';
import ReduxThunk from 'redux-thunk';
//import Router from './router';
import Main from './main.js';

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
                <PaperProvider>
                    <NavigationContainer>
                        <Main />
                    </NavigationContainer>
                </PaperProvider>
            </Provider>
        )
    }
}

export default App;