import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import {Header} from './components/common';
import CategoryList from './components/CategoryList'

const CategoryViewApp = () =>{
    return (
        <Provider store={createStore(reducers)}>
            <View style={{flex:1}}>
                <Header headerText='Categories' />
                <CategoryList />
            </View>
        </Provider>
    );
};

export default CategoryViewApp;