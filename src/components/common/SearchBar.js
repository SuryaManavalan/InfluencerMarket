import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
//import {Feather} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

//const myIcon = <Icon name="rocket" size={30} color="#900" />;
const SearchBar = ({searchTerm, onSearchTermChange, onSearchTermSubmit}) => {
    return <View style ={styles.backgroundStyle}> 
        {/* <Feather name="search" style={styles.iconStyle}/> */}
        <TextInput  
            placeholder="Search" 
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle} 
            value = {searchTerm}
            onChangeText = {newSearchTerm => onSearchTermChange(newSearchTerm)}
            onEndEditing = {() => onSearchTermSubmit()} 
            />
            <TouchableOpacity onPress={() => onSearchTermSubmit()}>
                <Icon name="search"  size={30} color="blue" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          </View>
};

const styles = StyleSheet.create({
    backgroundStyle : {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F0FFFF',
        height : 50,
        borderRadius : 5,
        marginHorizontal : 15,
        flexDirection: 'row'
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export default SearchBar;