import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  RefreshControl,StatusBar
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Button, Title, List, ListItem,Icon, Input, Item,Content,Picker } from 'native-base';
import moment from 'moment'
import * as firebase from 'firebase'
import numeral from 'numeral'
import Expo from 'expo';

export default class Home extends Component {
  componentWillMount(){
    console.log(this.props.navigation.state.params.uid)
  }
  state= {
    currency: this.props.navigation.state.params.currency,


  }
  logout = () => {

		firebase.auth().signOut().then(
    Expo.Util.reload()
    )
  }
  clearAll = () => {

		firebase.database().ref('/users/' + this.props.navigation.state.params.uid).child('items').remove()

  }
  updateUser = (key, value) => {

      firebase.database().ref('/users/' + this.props.navigation.state.params.uid).child('settings').update({[key]:value})
    }
  render() {

    return (
      <Container>
      <StatusBar hidden={true} />
        <Header style={{backgroundColor:'#5CA270'}}>
        <Left>
        <Button transparent onPress={() => {
          this.props.navigation.goBack()
        }}>
        <Icon name="arrow-back" style={{color:'white',fontSize:24}}  />
        </Button>
        </Left>
          <Body >
            <Title style={{color:'white'}}>Settings</Title>
          </Body>
          <Right/>
        </Header>
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <Content>

                  <List>

                    <ListItem>

                      <Left>
                        <Text style={{fontSize:20}}>Currency</Text>
                      </Left>
                      <Content>
                      <Picker

              mode="dropdown"
              renderHeader={backAction =>
                <Header style={{ backgroundColor: "#5CA270" }}>
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon name="arrow-back" style={{color:'white',fontSize:24}}  />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff" }}>Currency</Title>
                  </Body>
                  <Right />
                </Header>}
              selectedValue={this.state.currency}

              onValueChange={val => {
              this.setState({currency:val})
              this.updateUser('currency', val)
              }}
              >
              <Item label="US Dollar (USD)" value="usd" />
              <Item label="EURO (EUR)" value="eur" />
              <Item label="Japanese Yen (JPY)" value="eur" />
              <Item label="Poundsterling (GBP)" value="eur" />
              <Item label="Indonesia Rupiah (IDR)" value="idr" />

              </Picker>
              </Content>
                    </ListItem>
                    <ListItem onPress={() => {this.clearAll()}}>

                    <Left>
                    <Text style={{fontSize:20, color:'red'}}>Clear All</Text>
                    </Left>
                    </ListItem>
                    <ListItem onPress={() => {this.logout()}}>

                    <Left>
                    <Text style={{fontSize:20, color:'red'}}>Logout</Text>
                    </Left>
                    </ListItem>
                  </List>
                </Content>






        </View>
      </Container>
    );
  }
}
