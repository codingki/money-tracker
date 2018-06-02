import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert




} from 'react-native'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

import Ionicons from '@expo/vector-icons/Ionicons'
import Icon from '@expo/vector-icons/FontAwesome'
const { width, height } = Dimensions.get("window");
const background = require("../components/bg.png")
const logo = require("../components/cir.png")

export default class Forget extends Component {
  state= {
    loading: false,
    email: "",
    password: "",
  }


  loadError = (a,b) => {
    if (a !== null) {
      this.setState({loading:false})
      Alert.alert(
      'Error',
      b,
      )
    }
  }


loading = () => {
  if (this.state.loading) {
    return(
    <ActivityIndicator animating={this.state.loading} color="white"/>
    )
  }else{
    return(
    <Text style={styles.buttonText}>
    Forget Password
    </Text>
    )
  }
}

changeEmail = (a) => {
  this.setState({email: a})

}



masuk = () => {
  this.setState({loading:true})
  firebase.auth().sendPasswordResetEmail(this.state.email).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
{this.loadError(errorCode,errorMessage)}

})
this.setState({loading:false})
Alert.alert(
'Success',
"Check your email to reset the password",
)
}

render() {

    return (
      <View style={styles.background}>


      <View style={styles.markWrap}>
          <Image source={logo} style={styles.mark} resizeMode="contain" />
        </View>
        <View style={styles.wrapper}>

          <View style={styles.inputWrap}>

          <View style={styles.iconWrap}>
            <Ionicons
            style={styles.icon}
            name="ios-mail"
            size={20}
            />
          </View>

            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.changeEmail(text)}
            />
          </View>



        <TouchableOpacity disabled={this.state.loading} onPress={() => this.masuk()}>
          <View style={styles.button}>
          {this.loading()}
          </View>
        </TouchableOpacity>






        </View>
        <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Dont have an account?</Text>
              <TouchableOpacity activeOpacity={.5}
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
              >
                <View>
                  <Text style={styles.signupLinkText}>Masuk</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      backgroundColor:'#5CA270'
    },
    wrapper: {
      paddingHorizontal:15,
    },
    markWrap: {
      flex: 1,
      alignItems:"center",
      justifyContent: "center",
      paddingVertical: 30,
      marginTop:height*0.12,
    },
    inputWrap: {
      flexDirection: "row",
      marginVertical: 10,
      height: 40,
      backgroundColor: "transparent"
    },
    mark: {
      width: 180,
      height: 180,
      flex:1,


    },
    input: {
      flex:1,
      paddingHorizontal:10,
      backgroundColor:"#FFF"
    },
    iconWrap:{
      paddingHorizontal: 7,
      alignItems:"center",
      justifyContent: "center",
      backgroundColor: "#BBDD92"
    },
    icon:{
      paddingLeft:6,
      paddingTop:2,
      width:25,
      height:25,
      color: "white"
    },
    button: {
      backgroundColor: "#BBDD92",
      paddingVertical:10,
      marginVertical:10,
      alignItems:"center",
      justifyContent:"center"
    },
    buttonText:{
      color: "#FFF",
      fontSize: 18,
    },
    forgotPasswordText:{
      color: "#fff",
      backgroundColor: "transparent",
      textAlign: "right"
    },
    signupWrap: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    accountText: {
      color: "#fff"
    },
    signupLinkText: {
      color: "#fff",
      marginLeft: 5,
      fontWeight:'bold'
    }



})
