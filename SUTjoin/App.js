//import createStackNavigator
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Article from './components/Activity/DetailActivity';
import Login from './components/Profile/Login';
import Menu from './components/Navigation/Menu';
import Register from './components/Profile/Register';
import AddActivity from './components/Activity/AddActivity';
//Route
const App = createStackNavigator(
  {
    Register,
    AddActivity,
    Article,
    Menu:{
      screen: Menu,
      navigationOptions: {
      header: null,
    },
  },
    Login:{
      screen: Login,
      navigationOptions: {
      header: null,
    },
  },
    
  },
  //You can hide the header from all the screens in once using defaultNavigationOptions
  // {
  //   defaultNavigationOptions: {
  //     header: null
  //   },
  // },
  { initialRouteName: 'Login' }
);
//Not show warning
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;


export default createAppContainer(App);


