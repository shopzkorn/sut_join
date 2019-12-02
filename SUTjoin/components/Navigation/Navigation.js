  
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Activity from '../Activity/Activity';
import Menu from '../Navigation/Menu'
import Article from '../Activity/DetailActivity';
import Login from '../Profile/Login';
import Register from '../Profile/Register';
import AddActivity from '../Activity/AddActivity';
import Explore from '../Activity/ListActivity';
import History from '../Activity/History';
export default createStackNavigator(
  {
    Activity,
    Menu,
    Article,
    Login,
    Register,
    AddActivity,
    Explore,
    History,
  },
  {
    initialRouteName: "Login",
    header: null,
  }
);