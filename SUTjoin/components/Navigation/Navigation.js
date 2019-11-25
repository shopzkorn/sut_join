  
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import List from '../Activity/ListActivity';
import Article from '../Activity/AddActivity';

export default createStackNavigator(
  {
    List,
    Article
  },
  {
    initialRouteName: "List",
  }
);