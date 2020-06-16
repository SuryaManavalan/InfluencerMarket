import React, {Component} from 'react';
import { Text, StyleSheet} from 'react-native';
import {Button, Card, CardSection,Spinner, Input} from './common';
import firebase from 'firebase';

class LoginForm1 extends Component {
  state = { email: '', pswd:'', error:'', loading: false};

  onButtonPress() {
    const {email, pswd} = this.state;
    this.setState({error:'', loading:true});
    firebase.auth().signInWithEmailAndPassword(email, pswd)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email,pswd)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this));
        });
  }

  onLoginFail(){
    this.setState({error:'Authentication Failed',loading:false});

  }

  onLoginSuccess(){
    this.setState({email:'',pswd:'',error:'',loading:false});
  }

  renderButton(){
      if(this.state.loading) {
          return <Spinner size='small'/>
      }
      return  (
        <Button
         onPress={this.onButtonPress.bind(this)}> Login</Button>
      );
  }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input 
                    secureText={false}
                        placeholderText='user@mail.com'
                        labelText='Email'
                        value={this.state.email}
                        onChangeText={email=>this.setState({email})}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureText={true}
                        placeholderText='password'
                        labelText='Password'
                        value={this.state.pswd}
                        onChangeText={pswd=>this.setState({pswd})}
                    />
                </CardSection>
                <Text style={styles.errorStyle} >{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>

        )
    }
}

const styles = StyleSheet.create({
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color:'red'
    }
})

export default LoginForm1;