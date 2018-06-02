import {StackNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import Home from './screens/home'
import Login from './screens/login'
import Register from './screens/register'
import Forget from './screens/forget'
import Loading from './screens/loading'
import Settings from './screens/settings'

const firebaseConfig = {
  apiKey: "AIzaSyCqAXPzxoWnJFE672ZOkYc8RtmeC8RMubw",
  databaseURL: "https://money-tracker-2d257.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)


const RouteConfigs = {
  Loading:{screen:Loading},
  Register: {screen:Register},
  Login: {screen:Login},
  Home: {screen:Home},
  Settings: {screen:Settings},
  Forget: {screen:Forget},


}

const StackNavigatorConfig = {
  headerMode:'none',
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)
