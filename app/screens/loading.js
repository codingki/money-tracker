import Expo,{ Font } from 'expo'

import { NavigationActions } from 'react-navigation'
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,Animated } from 'native-base';
import {View, StyleSheet, ActivityIndicator,Text,Image,Dimensions,StatusBar,TouchableOpacity, NetInfo
} from 'react-native'
import * as firebase from 'firebase'
const {width, height} = Dimensions.get('window')

export default class Loading extends Component {


  componentDidMount() {
    Font.loadAsync({
       Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    console.ignoredYellowBox = [
         'Setting a timer'
     ];

    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {


        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', snap => {
          const user = snap.val()
          if (user != null) {

            this.goHome(auth)

          }else{
            firebase.database().ref('/users/' + auth.uid).child('settings').set({'currency':'usd'})
          }
        })





      }else {
        this.props.navigation.navigate('Register')
      }
    })
  }

  goHome(user) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home', params:{user}}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }




render() {
  return (

<View style={styles.container}>
<StatusBar hidden={true} />
    <Image style={styles.logo} source={require('../components/cir.png')}/>
    <Text style={styles.status}>Loading...</Text>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#5CA270',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    resizeMode: 'contain',
    width: width/2
  },
  status:{
    color:'#fff', fontSize:16,
  }

})
