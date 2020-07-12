import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions } from 'react-native-router-flux'
import {Card, CardSection, Input, Spinner, Button} from '../../components/common';
import {emailChanged, passwordChanged, loginUser, resetError} from '../actions';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, TextInput} from 'react-native';

class LoginForm extends Component {
    onEmailChange(text){
        this.props.emailChanged(text);
        // console.log("email change1:", text);
        // console.log("email change:", this.props.email);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
        // console.log("pswd  press1:", text);
        // console.log("pswd  press:", this.props.password);
    } 

    onButtonPress(){
        if (this.props.email != '' && this.props.password != ''){
            const {email, password} = this.props;
            console.log("button press:", email);
            this.props.loginUser({email, password});
        }
    }

    renderButton() {
        if(this.props.loading){
            return <Spinner size="large" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        )
    }

    toSignup(){
        this.props.resetError();
        Actions.signup();
    }

    renderError(){
        if(this.props.error){
            return (
                    <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                        {this.props.error}
                    </Text>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo}
                            source={require('../logo.png')}>
                        </Image>
                        <Text style={styles.title}>Sign In</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        {this.renderError()}
                        <TextInput style={styles.input}
                            placeholder="Email"
                            placeholderTextColor='rgba(225,225,225,0.8)'
                            keyboardType='email-address'
                            autoCorrect={false}
                            returnKeyType='next'
                            onSubmitEditing={() => this.refs.txtPassword.focus()}
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <TextInput style={styles.input}
                            placeholder="Password"
                            placeholderTextColor='rgba(225,225,225,0.8)'
                            autoCorrect={false}
                            returnKeyType='go'
                            secureTextEntry={true}
                            ref={"txtPassword"}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                        <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomText}>Don't Have an account? <Text onPress={()=> this.toSignup()} style = {{ fontWeight: 'bold' }}>Sign Up.</Text></Text>
                    </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(208, 174, 150)',
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 1
    },
    logo: {
        width: 111,
        height: 111,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, 
        height: 285,
        padding: 20,
        // backgroundColor: 'red'
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: 33,
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        marginBottom: 50
    },
    input: {
        color: 'white',
        height: 60,
        backgroundColor: 'rgb(193, 119, 103)',
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 25
    },
    buttonContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        borderRadius: 25
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(109, 152, 186)',
        fontWeight: 'bold',
        fontSize: 18
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    bottomText: {
        fontFamily: 'sans-serif',
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
        marginTop: 5,
    }
})

const mapStateToProps = state => {
    return{
        email: state.auth.email,
        password: state.auth.password,
        user: state.auth.user,
        error: state.auth.error,
        loading: state.auth.loading
    }
} 

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser, resetError})(LoginForm);