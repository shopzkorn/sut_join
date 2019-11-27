  
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Activity from '../Activity/Activity';
import Menu from '../Navigation/Menu'
import Article from '../Activity/DetailActivity';

export default createStackNavigator(
  {
    Activity,
    Menu,
    Article
  },
  {
    initialRouteName: "Menu",
    header: null,
  }
);