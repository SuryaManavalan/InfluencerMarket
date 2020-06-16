// import firebase from 'firebase';

// import React, {Component} from 'react';
// import {View, Button,Alert} from 'react-native';
// import {Header,  Spinner} from './components/common'
// import LoginForm from './components/LoginForm1'

// class App1 extends Component {
//     state = { loggedIn: null};

//     componentWillMount() {
//         firebase.initializeApp({
//             apiKey: 'AIzaSyD8d2prLQ4e7GdAcFY6_AQRsdkmcXWIgVM',
//             authDomain: 'viralmarket-c2abe.firebaseapp.com',
//             databaseURL: 'https://viralmarket-c2abe.firebaseio.com',
//             projectId: 'viralmarket-c2abe',
//             storageBucket: 'viralmarket-c2abe.appspot.com',
//             messagingSenderId: '603367597747',
//             appId: '1:603367597747:web:82716303ce8c8339c472c6'
//           });

//           firebase.auth().onAuthStateChanged((user)=>{
//             if(user){
//                 this.setState({loggedIn:true});
//             } else {
//                 this.setState({loggedIn: false});
//             }
//             console.log('in statechange');
//             console.log(this.state.loggedIn);
//           });

//     }

//     onLogOut(){
//         console.log('in logout pressed');
//         // firebase.auth().signOut()
//         // .then(()=>
//         //     {this.setState({loggedIn:false}); 
//         //     console.log('on logout');})
//         // .catch(()=> {console.log('error')});
//     }

//     renderContent2(){
//         return ( 
//         <Button title='logout' onPress={()=>firebase.auth().signOut()}/>

//         );
//     }

//     renderContent() {
//         console.log('in render:' + this.state.loggedIn);
//         switch(this.state.loggedIn) {
//             case true:
//                 return (
//                     <Button title='logout' onPress={()=>firebase.auth().signOut()}/>
//                 );
//             case false:
//                 return <LoginForm />;
//             default:
//                 return <Spinner size='large' />;
//         }
//     }

//     render(){
//         return (
//             <View>
//                 <Header headerText="Authentication" />
//                 {this.renderContent() }
//             </View>
//         );
    
//     }
    
// }


// export default App1;