//import createStackNavigator
import { createStackNavigator, createAppContainer, createSwitchNavigator,createDrawerNavigator } from 'react-navigation';
import { AsyncStorage,StatusBar,View,Dimensions   } from "react-native";
import React, { Component } from "react";
import Article from './components/Activity/DetailActivity';
import ArticleSearch from './components/Activity/DetailActivitySearch';
import ArticleUser from './components/Activity/DetailActivityUser';
import Login from './components/Profile/Login';
import userProfile from './components/Profile/ProfileUser';
import Menu from './components/Navigation/Menu';
import Register from './components/Profile/Register';
import AddActivity from './components/Activity/AddActivity';
import Calendar from './components/Activity/Calender';
import AllHistoryActivity from './components/Activity/AllHistoryActivity';
import SearchActivity from './components/Activity/SearchActivity';
import SelectMap from './components/Map/SelectLocation';
import Maps from './components/Map/Map';
import MyInterest from './components/Profile/MyInterests';
import ScanQrcode from './components/Checkin/CheckOTP';
import CheckinActivity from './components/Checkin/CheckinActivity';
import Follow from './components/Follow/Follow';
import FollowUser from './components/Follow/Follow_user';
import DetailNews from './components/News/DetailNews';
import UserDashboard from './components/Profile/Tabscene';
import UserDashboardUserdata from './components/Profile/UserDashboardUserdata';
import FirstPage from './components/Navigation/FirstPage';
import manage_gpa from './components/Learning/manage_gpa';
import manage_subject from './components/Learning/manage_subject';
import add_subject from './components/Learning/add_subject';
import volunteer from './components/Profile/Volunteer';
import SplashScreen from './components/Navigation/FirstPage';
import Editprofile from './components/Profile/Editprofile';
import CalendarEditPro from './components/Profile/CalendarEditPro';
import SettingMode from './components/Profile/SettingMode';
import HelpCenter from './components/Profile/HelpCenter';
import AboutSutjoin from './components/Profile/AboutSutjoin';

//Route
const App = createStackNavigator(
  {
    Map,
    
    userProfile: {
      screen: userProfile,
      navigationOptions: {
        header: null,
      },
    },
    Follow: {
      screen: Follow,
      navigationOptions: {
        header: null,
      },
    },
    DetailNews,
    SearchActivity: {
      screen: SearchActivity,
      navigationOptions: {
        header: null,
      },
    },
    AllHistoryActivity: {
      screen: AllHistoryActivity,
      navigationOptions: {
        header: null,
      },
    },
    AddActivity,
    Article,
    ArticleUser,
    ArticleSearch,
    ScanQrcode,
    FollowUser: {
      screen: FollowUser,
      navigationOptions: {
        header: null,
      },
    },
    CheckinActivity,
    Editprofile: {
      screen: Editprofile,
      navigationOptions: {
        header: null,
      },
    },
    CalendarEditPro,
    SelectMap: {
      screen: SelectMap,
      navigationOptions: {
        header: null,
      },
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    MyInterest: {
      screen: MyInterest,
      navigationOptions: {
        header: null,
      }
    },
    UserDashboard: {
      screen: UserDashboard,
      navigationOptions: {
        header: null,
      }
    },
    UserDashboardUserdata: {
      screen: UserDashboardUserdata,
      navigationOptions: {
        // header: null,
      }
    },
    FirstPage: {
      screen: FirstPage,
      navigationOptions: {
        // header: null,
      }
    },
    manage_gpa: {
      screen: manage_gpa,
      navigationOptions: {
        header: null,
      }
    },
    manage_subject: {
      screen: manage_subject,
      navigationOptions: {
        header: null,
      }
    },
    add_subject: {
      screen: add_subject,
      navigationOptions: {
        header: null,
      }
    },
    volunteer: {
      screen: volunteer,
      navigationOptions: {
        header: null,
      }
    },
    SettingMode:{
      screen: SettingMode,
      navigationOptions: {
        header: null,
      },
    },
    AboutSutjoin:{
      screen: AboutSutjoin,
      navigationOptions: {
        header: null,
      },
    },
    HelpCenter:{
      screen: HelpCenter,
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
  { initialRouteName: 'Menu' }
);
const LoginScreen = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
    Calendar,
  },{ initialRouteName: 'Login' }
);
//Not show warning
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

// class RouterScreen extends Component {
//   constructor(props) {
//     super(props);
//     this._loadData();
//   }
//   render(){
//     return(
//       <View>
//         <StatusBar barStyle="default"/>
//       </View>
//     )
//   }
//   _loadData = async () => {
//     const userToken = await AsyncStorage.getItem('user_id');
//     console.log(userToken)

//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   }
// }
export default createAppContainer( createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: App,
    Auth: LoginScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

// export default createAppContainer(App);


