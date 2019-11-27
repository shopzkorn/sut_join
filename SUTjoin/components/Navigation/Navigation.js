  
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Activity from '../Activity/Activity';
import Menu from '../Navigation/Menu'

export default createStackNavigator(
  {
    Activity,
    Menu,
  },
  {
    initialRouteName: "Menu",
  }
);