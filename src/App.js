import React, {Component } from 'react';
import  {Provider} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { NavigationContainer } from '@react-navigation/native';
//import firebase from 'firebase';
//import LoginForm from './login/components/LoginForm';
import ReduxThunk from 'redux-thunk';
import { navigationRef } from './RootNavigation';
//import Router from './router';
import Main from './main.js';

class App extends Component {

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <PaperProvider>
                    <NavigationContainer ref={navigationRef}>
                        <Main />
                    </NavigationContainer>
                </PaperProvider>
            </Provider>
        )
    }
}

export default App;