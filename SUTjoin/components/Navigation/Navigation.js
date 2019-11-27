  
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import List from '../Activity/ListActivity';
import Article from '../Activity/DetailActivity';

export default createStackNavigator(
  {
    List,
    Article
  },
  {
    initialRouteName: "List",
  }
);