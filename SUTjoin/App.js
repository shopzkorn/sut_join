//import createStackNavigator
import { createStackNavigator, createAppContainer, createSwitchNavigator,createDrawerNavigator } from 'react-navigation';
import { AsyncStorage,StatusBar,View,Dimensions   } from "react-native";
import React, { Component } from "react";
import Article from './components/Activity/DetailActivity';
import DetailCoop from './components/Activity/DetailCoop';
import ArticleSearch from './components/Activity/DetailActivitySearch';
import ArticleUser from './components/Activity/DetailActivityUser';
import Login from './components/Profile/Login';
import userProfile from './components/Profile/ProfileUser';
import coachProfile from './components/Profile/ProfileCoach';
import Menu from './components/Navigation/Menu';
import Register from './components/Profile/Register';
import AddActivity from './components/Activity/AddActivity';
import AddCoopActivity from './components/Activity/AddCoopActivity';
import Calendar from './components/Activity/Calender';
import CalendarCoop from './components/Activity/CalendarCoop';
import AllHistoryActivity from './components/Activity/AllHistoryActivity';
import SearchActivity from './components/Activity/TabsceneSearch';
import SeemoreTag from './components/Activity/SeemoreTag';
import ScanSearchPeople from './components/Activity/ScanQrcodeSearchPeople';
import SelectMap from './components/Map/SelectLocation';
import CheckTime from './components/Learning/TimeSignin';
import MyInterest from './components/Profile/MyInterests';
import Interest from './components/Profile/Interest';
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
import Notification from './components/Profile/Notification';
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
    SeemoreTag: {
      screen: SeemoreTag,
      navigationOptions: {
        header: null,
      },
    },
    Notification: {
      screen: Notification,
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
    CheckTime: {
      screen: CheckTime,
      navigationOptions: {
        header: null,
      },
    },
    coachProfile: {
      screen: coachProfile,
    },
    AddActivity,
    Article,
    DetailCoop,
    ArticleUser,
    ArticleSearch,
    ScanQrcode,
    FollowUser: {
      screen: FollowUser,
      navigationOptions: {
        header: null,
      },
    },
    ScanSearchPeople: {
      screen: ScanSearchPeople,
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

const App1 = createStackNavigator(
  {
    Map,
    coachProfile: {
      screen: coachProfile,
    },
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
    SeemoreTag: {
      screen: SeemoreTag,
      navigationOptions: {
        header: null,
      },
    },
    Notification: {
      screen: Notification,
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
    CheckTime: {
      screen: CheckTime,
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
    ScanSearchPeople: {
      screen: ScanSearchPeople,
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
const Coach = createStackNavigator(
  {
    Map,
    
    coachProfile: {
      screen: coachProfile,
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
    SeemoreTag: {
      screen: SeemoreTag,
      navigationOptions: {
        header: null,
      },
    },
    Notification: {
      screen: Notification,
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
    CheckTime: {
      screen: CheckTime,
      navigationOptions: {
        header: null,
      },
    },
    AddCoopActivity,
    DetailCoop,
    ArticleUser,
    ArticleSearch,
    ScanQrcode,
    FollowUser: {
      screen: FollowUser,
      navigationOptions: {
        header: null,
      },
    },
    ScanSearchPeople: {
      screen: ScanSearchPeople,
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
    CalendarCoop,
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
  { initialRouteName: 'coachProfile' }
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
    Menu: {
      screen: Menu,
      navigationOptions: {
        header: null,
      },
    },
    coachProfile: {
      screen: coachProfile,
    },
    Interest: {
      screen: Interest,
      navigationOptions: {
        header: null,
      },
    },
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
    App1: App1,
    Coach: Coach,
    Auth: LoginScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

// export default createAppContainer(App);


