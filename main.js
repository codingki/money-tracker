import Expo from 'expo';
import React, {Component} from 'react'
import Home from './app/index'

export default class App extends Component {
  render() {
    return (
      <Home/>
      
    );
  }
}



Expo.registerRootComponent(App);