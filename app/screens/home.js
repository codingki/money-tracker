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
import { Container, Header, Left, Body, Right, Button, Title, List, ListItem,Icon, Input, Item, } from 'native-base';
import moment from 'moment'
import * as firebase from 'firebase'
import numeral from 'numeral'


export default class Home extends Component {
  state= {
    loading: false,
    bars:[],
    refreshing: false,
    currency:""
  }
  componentWillMount(){
      this.watchBar()

  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.watchBar()

    this.setState({refreshing: false});
  }

  sum = () => {
        var total=0
        for (i = 0; i < this.state.bars.length; i++) {  //loop through the array
        total += this.state.bars[i].price;  //Do the math!
        }
        return total

  }

  totalMoney = () => {
    if (this.state.currency == "idr") {
        return "Rp."+numeral(this.sum()).format('0,0.00')
    }else if (this.state.currency == "usd") {
        return numeral(this.sum()).format('$ 0,0.00')
    }else if (this.state.currency == "gbp") {
        return numeral(this.sum()).format('£ 0,0.0')
    }else if (this.state.currency == "eur") {
        return numeral(this.sum()).format('€ 0,0.0')
    }else if (this.state.currency == "jpy") {
        return numeral(this.sum()).format('¥ 0,0.0')
    }
  }

  watchBar = () => {
     firebase.database().ref('/users/' + this.props.navigation.state.params.user.uid).child('items').on('value', snap => {
      let bars = []
      snap.forEach(bar => {
        bars.push(bar.val())
      })
      bars.reverse()


      this.setState({bars})

    })
    firebase.database().ref('/users/' + this.props.navigation.state.params.user.uid).child('settings').once('value', (snap) => {
      const settings = snap.val()

      this.setState({currency: settings.currency})

      })
  }



  item = (a) => {
    this.setState({item: a})

  }

  price = (a) => {
    this.setState({price: a})

  }

  tambah = () => {
     if (this.state.item == null || this.state.price == null || this.state.item == "" || this.state.price == ""  ) {

     }else{
       var mantap = firebase.database().ref('/users/' + this.props.navigation.state.params.user.uid).child('items')
       .push({
         item:this.state.item,
         price:parseFloat(this.state.price.replace(",", ".")),
         time: new Date().getTime(),

       })
       firebase.database().ref('/users/' + this.props.navigation.state.params.user.uid).child('items/' + mantap.key).update({id:mantap.key})

       this.setState({item:null,price:null})
     }
  }
  deleteItem = (a) => {
    Alert.alert(
    'Confirm Delete',
    'Are you sure want to delete ?',
    [
      {text: 'No', onPress: () => console.log('No Pressed')},
      {text: 'Yes', onPress: () => firebase.database().ref('/users/' + this.props.navigation.state.params.user.uid).child('items/' + a).remove()},

    ],)
  }

  render() {

    return (
      <Container>
      <StatusBar hidden={true} />
        <Header style={{backgroundColor:'#5CA270'}}>
        <Left>
        <Button transparent onPress={() => {
          this.props.navigation.navigate('Settings', {uid: this.props.navigation.state.params.user.uid,currency:this.state.currency})
        }}>
        <Icon name="ios-settings" style={{color:'white',fontSize:24}}  />
        </Button>
        </Left>
          <Body >
            <Title style={{color:'white'}}>Money Tracker</Title>
          </Body>
          <Right/>
        </Header>
        <View style={{flex:1, flexDirection:'column'}}>

          <View style={{height:80, backgroundColor:'#E6E6E6',justifyContent:'center', flexDirection:'row', alignItems:'center', padding:20 }}>
            <Item regular style={{backgroundColor:'white', flex:2, height:40}}>
              <Input placeholder='Item' onChangeText={(text) => this.item(text)} value={this.state.item}/>
            </Item>
            <Item regular style={{backgroundColor:'white', flex:1, height:40}}>
              <Input placeholder='Price' keyboardType='numeric' onChangeText={(text) => this.price(text)} value={this.state.price}/>
            </Item>
            <Button onPress={() => {this.tambah()}} style={{width:40,height:40,backgroundColor:'#5CA270', alignItems:'center', justifyContent:'center'}}><FontAwesome name='plus' color='white'  /></Button>
          </View>

          <ScrollView style={{flex:1, backgroundColor:'white'}}   refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>

          <List dataArray={this.state.bars}

                      renderRow={(item) =>
                        <ListItem onLongPress={() => {this.deleteItem(item.id)}}>
                          <Left>
                          <View>
                            <Text style={{fontWeight:'bold', color:'#696969', fontSize:16}}>{item.item}</Text>
                            <Text style={{color:'#696969', fontSize:11}}>{moment(item.time).calendar()}</Text>
                          </View>
                          </Left>

                          <Right>
                          <View>
                            <Text style={{fontWeight:'bold', color:'#5CA270', fontSize:15}} >{numeral(item.price).format('0,0')}</Text>
                            </View>
                          </Right>
                        </ListItem>
                      }>
                    </List>




          </ScrollView>

          <View style={{height:30, backgroundColor:'#696969', justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', color:'white', textAlign:'center'}} >You Spent</Text>
          </View>

          <View style={{height:80, backgroundColor:'#5CA270', justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', color:'white', fontSize:25, textAlign:'center'}} >{this.totalMoney()}</Text>
          </View>

        </View>
      </Container>
    );
  }
}
