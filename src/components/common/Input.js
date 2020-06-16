import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';


const Input = ({labelText, value, secureText, onChangeText, placeholderText}) => {
    const { inputStyle, labelStyle, containerStyle} = styles;

    return (
        <View style={containerStyle} >
            <Text style={labelStyle}>{labelText}:</Text>
            <TextInput 
                secureTextEntry={secureText}
                placeholder={placeholderText}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        color:'#000',
        flex:2,
        fontSize:18,
        paddingLeft:5,
        paddingRight:5,
        lineHeight:23,

    },
    labelStyle: {
        flex:1,
        paddingLeft: 20,
        fontSize:18
    },
    containerStyle: {
        height: 40,
        flex:1,
        flexDirection: 'row',
        alignItems:'center'
    }
});

export {Input};