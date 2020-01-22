import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl,
  SafeAreaView,

  ActivityIndicator
} from "react-native";

import {
  Container,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
} from "native-base";

import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment'

const { width, height } = Dimensions.get('window');

import Login from '../Profile/Login';

class Profile extends React.Component {

  state = {
    user_id: '',
    user_detail: [],
    user_name: '',
    user_surname: '',
    user_profile: '',
    user_volunteer: '',
    myhost: [],
    refreshing: false,
    id_user: '',
    loadingVisible: true,
    follower: 0,
    following: 0,
    page: 1,
    age_user: 0,
    gender_user : 0,
    loading: false,
    lastItem: true,
  }
  scrollXHost = new Animated.Value(0);
  scrollXJoin = new Animated.Value(0);

  
  setFollow = (data) => {
    console.log(data)
    this.setState({
      following: data[0],
      follower: data[1]
    })
  }
  setHost = (data) => {
    this.setState({
      myhost: data,
      loading: false,
      lastItem: false
    })
  }
  setProfile = (data) => {
    data.map(user =>
      this.setState({
        user_name: user.name,
        user_surname: user.surname,
        user_profile: user.profile,
        user_volunteer: user.volunteer
      })
    )
  }
  fetchData = async () => {
    // console.log(this.state.myhost);
    Promise.all([
      fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyHost.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id_user: this.state.id_user,
          page: 1,
        })
      }),
      fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          user_id: this.state.id_user,
        })
      }),
      fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/follow.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          status: '5',
          id_user: this.state.id_user,
        })
      })
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => {
        console.log(data3),
          this.setHost(data1),
          this.setProfile(data2),
          this.setFollow(data3),
          this.setState({
            loadingVisible: false
          }),
          this.getage()
      }
      )
  }
  getage = async () => {
    const response = await fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAgeUser.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.id_user
      })
    });
    const user = await response.json();
    console.log(user[0])
    this.setState({
      age_user: user[0],
      gender_user : user[1]
    })
    // console.log(this.state.new_img);
  }

  renderHost = () => {
    if (!this.state.loadingVisible) {
      return (
        <View style={[styles.flex, styles.column, styles.recommended],{backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            <Text style={{ fontSize: theme.sizes.font * 1.4, marginVertical: 10 ,fontWeight:'bold'}}>{this.state.user_name}'timeline</Text>
          </View>
          <View style={[styles.column, styles.recommendedList]}>
            <FlatList
              Vertical
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={[styles.shadow, { overflow: 'visible' }]}
              data={this.state.myhost}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item, index }) => this.renderDestination(item, index)}
            />
          </View>
        </View>
      );
    }
  }
  refresh() {
    this.setState({ refreshing: true ,loadingVisible:true});
    return new Promise((resolve) => {
      this.fetchData().then(() => {
        this.setState({ refreshing: false })
      });
      setTimeout(() => { resolve() }, 2000)
    });
  }
  componentDidMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1].split('"')[1];
      this.setState((prevState, props) => ({
        id_user: user_id
      }), () => {
        console.log(this.state.id_user);
        this.fetchData()
      })
    });
  }

  renderDestination = item => {
    let photoAc = 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
    let photoUser = 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
    const { navigation } = this.props;
    const dates = moment(item.date_start).format('MMM, Do YYYY');
    let surname = item.surname
    if(item.surname.split('').length){
      surname = item.surname.split('').slice(0, 7)
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item.id , age_user : this.state.age_user , gender_user : this.state.gender_user })}>
        <View style={{ padding: 15 }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: photoUser }} />
                <Body>
                  <Text>{item.name} {surname}</Text>
                  <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={theme.sizes.font * 1}
                  color={theme.colors.black}
                />
                  <Text> {item.location_name}</Text>
                  </View>
                </Body>
              </Left>
              <Right style={{justifyContent:'flex-end'}}>
              <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons
                  name="account-plus"
                  size={theme.sizes.font * 1.5}
                  color={theme.colors.white}
                  color={theme.colors.black}
                />
              <Text> {item.inviter}/{item.number_people}</Text>  
              </View> 
              <Text>{dates}</Text>
              </Right>
            </CardItem>

            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 200,
                  flex: 1
                }}
                source={{ uri: photoAc }}
              />
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
              <Left style={{justifyContent:'flex-start'}}>  
              <View style={[styles.row]}>     
              <MaterialIcons
              name="title"
              size={theme.sizes.font * 1.5}
              color={theme.colors.black}
            />
              <Text style={{fontWeight:'bold'}}>| {item.title}</Text>
              </View> 
              </Left>
              <Right style={{justifyContent:'flex-end'}}>
              <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Article', { article: item.id , age_user : this.state.age_user , gender_user : this.state.gender_user })}
              >
                <Text style={{
                  color:"#fe53bb",
                  fontWeight: 'bold'
                }}>View</Text>
              </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        </View>

      </TouchableOpacity>
    )

  }

  renderProfile = item => {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const user_idreg = navigation.getParam('user_id');
    // this.state.user_detail.map( (user,index) =>
    let photoUser = 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + this.state.user_profile;
    console.log(photoUser)
    // );
    if (!this.state.loadingVisible) {
      return (
        <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)' }}>

          <View style={styles.shadow}>
            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', }}>
              <Image source={{ uri: photoUser }} style={styles.MainAvatar} />
              <Text style={{ color: theme.colors.black, fontSize: 24, fontWeight: 'bold', marginTop: -20 }}>{this.state.user_name} {this.state.user_surname}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
                onPress={() => navigate('volunteer')}
              >
                <Text style={{
                  color:"#fe53bb",
                  fontSize: 16,
                  paddingVertical:5,
                  fontWeight: 'bold'
                }}>Volunteer Point: {this.state.user_volunteer}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 ,marginBottom:10}}>
             
              <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
                onPress={() => navigate('MyInterest')}
              >
                <Text style={{
                  color:"#fe53bb",
                  paddingVertical:5,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>My interests</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
                onPress={() => navigate('UserDashboard')}
              >
                <Text style={{
                  color:"#fe53bb",
                  fontSize: 16,
                  paddingVertical:5,
                  fontWeight: 'bold'
                }}> Dashboard</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Follow', { Status: 4, id: this.state.id_user })}>
                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold' }}>Followings</Text>
                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold', alignItems: 'center' }}>{this.state.following}</Text>

              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => navigation.navigate('Follow', { Status: 3, id: this.state.id_user })}>
                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold' }}>Followers</Text>
                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold' }}>{this.state.follower}</Text>

              </TouchableOpacity>
              <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
              onPress={() => navigate('Editprofile')}
              >
                <Text style={{
                  color:"#fe53bb",
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Edit profile</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      );
    }
  }
  fetchDataLoadmore = () =>{
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyHost.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id_user: this.state.id_user,
          page: this.state.page,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        // console.log('res ' + responseJson.length);
        if (responseJson.length > 0) {
            this.setState({ 
              myhost: this.state.myhost.concat(responseJson), 
              loading: false,
              lastItem: false });
        } else {
            this.setState({
              lastItem: true,
              loading: false
            });
          }
      }).catch((error) => {
        console.error(error);
      });
  }
  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={{ flex: 1 }} >

        <View style={{ flexDirection: 'row',justifyContent:'space-between',backgroundColor: 'rgba(0,0,0,0.1)',}}>
            <View style={{ justifyContent:'flex-start'}}>
                <View style={{marginLeft: 50, paddingVertical: height /200 ,flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                            Profile
                        </Text>
                </View>
            </View>
            <View style={{ justifyContent:'flex-end'}}>
                <View style={{ alignSelf:'flex-end',alignItems:'flex-end',marginRight: 20, paddingVertical: height /200 ,flexDirection:'row',justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={() => navigate('SettingMode')}>
                        <MaterialIcons name="settings" size={theme.sizes.font * 2} color={theme.colors.black} style={{alignSelf:'flex-end'}}/>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh.bind(this)}
            />
          }
          onScroll={(e) => {
            var windowHeight = Dimensions.get('window').height,
              height = e.nativeEvent.contentSize.height,
              offset = e.nativeEvent.contentOffset.y;
            // console.log(windowHeight+' '+height+' '+offset)
            if (windowHeight + offset >= height && this.state.lastItem == false) {
              console.log('End Scroll')
              this.setState((prevState, props) => ({
                page: this.state.page + 1,
                loading: true,
                lastItem: true
              }), () => {
                this.fetchDataLoadmore()
              })
            }
          }}
        >
          {this.renderProfile()}
          {this.renderHost()}
          {this.renderFooter()}
        </ScrollView>
        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
        </View>
      </LinearGradient >
    </SafeAreaView>
    )

  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  MainAvatar: {
    // position: 'absolute',
    top: -theme.sizes.margin,
    borderWidth: 2.5,
    borderColor: '#fff',
    width: theme.sizes.padding * 4,
    height: theme.sizes.padding * 4,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,

    // borderRadius: 4,
    // borderWidth:2,
    // borderColor: '#ffc9de',
    // marginTop:5,
    // width:300,
    // height:300,
    // backgroundColor:'white',
    // alignItems: 'center'
  },

  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinations: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: 20,
    left: (width - (theme.sizes.padding * 4)) / (Platform.OS === 'ios' ? 3.2 : 3),
    backgroundColor: theme.colors.white,
    width: width - (theme.sizes.padding * 4),
  },
  recommended: {
  },
  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.sizes.padding,
  },
  recommendedList: {
  },
  recommendation: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.sizes.padding / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2,
  },
  rating: {
    fontSize: theme.sizes.font * 1.5,
    color: theme.colors.white,
    fontWeight: 'bold'
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active,
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStylenoFollow: {
    paddingHorizontal: 30,
    backgroundColor: '#ffa8c0',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#ffa8c0',
  },
  buttonStyleFollow: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
});