import React, { Component } from 'react'
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage,
  PixelRatio
} from 'react-native'
import {
  Container,
  Title,
  Content,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right
} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NetworkInfo } from "react-native-network-info";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import * as theme from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  responsiveFontSize
} from "react-native-responsive-dimensions";
const { width, height } = Dimensions.get('window');
var FONT_BACK_LABEL = 24;
if (PixelRatio.get() <= 3) { //responsive font
  FONT_BACK_LABEL = 19;
}
const styles = StyleSheet.create({
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
    // backgroundColor: '#ffc9de',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 0.2,
    paddingBottom: theme.sizes.padding * 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articles: {
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
  circleButtun: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    opacity: 0.5,
    borderRadius: 50,
    // marginRight : 10
  },
  marginRight: {
    marginRight: 10
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyleFollow: {
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
});


class Articles extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  state = {
    data: [],
    refreshing: false,
    page: 1,
    loadingVisible: true,
    loading: false,
    lastItem: true,
    user_id: '',
    new_img: [],
    age_user:0,
    gender_user:0
  }
  scrollX = new Animated.Value(0);

  renderDots() {
    const { destinations } = this.props;
    // console.log(this.state.data);
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.state.new_img.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDot, { borderWidth: borderWidth }]}
            />
          )
        })}
      </View>
    )
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
  renderNews = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          style={{ overflow: 'visible' }}
          data={this.state.new_img}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
          renderItem={({ item }) => this.renderNewsItem(item)}
        />
        {this.renderDots()}
      </View>
    );
  }

  renderNewsItem = (item, index) => {
    let photoNews = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.url;
    const { navigation } = this.props;
    if (item.news_status == 2) {
      return (
        <ImageBackground
          resizeMode='contain'
          style={{
            height: height / 7,
            width: width,
          }}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: photoNews }}
        >
          <View style={{ paddingLeft: theme.sizes.padding * 3.2, marginTop: 20 }}>
            <Text style={{ color: theme.colors.white, fontSize: width / 27 -2 }}>{item.text1}</Text>
          </View>
          <View style={{ paddingLeft: theme.sizes.padding * 3.2, marginTop: 5 }}>
            <Text style={{ color: theme.colors.white, fontWeight: 'bold', fontSize: responsiveFontSize(2.5) }}>{item.text2}</Text>
          </View>
        </ImageBackground>
      )
    } else {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailNews', { article: item })}>
          <ImageBackground
            resizeMode='contain'
            style={{
              height: height / 7,
              width: width,
            }}
            imageStyle={{ borderRadius: theme.sizes.radius }}
            source={{ uri: photoNews }}
          >
            <View style={{ paddingLeft: theme.sizes.padding * 3.2, marginTop: 20 }}>
              <Text style={{ color: theme.colors.white, fontSize: 15 }}>{item.text1}</Text>
            </View>
            <View style={{ paddingLeft: theme.sizes.padding * 3.2, marginTop: 5 }}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold', fontSize: 24 }}>{item.text2}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )
    }
  }

  renderListActivity = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended]}>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            Vertical
            // pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            // scrollEventThrottle={16}
            // ListFooterComponent={() =>this.renderFooter}
            snapToAlignment="center"
            style={[styles.shadow, { overflow: 'visible' }]}
            data={this.state.data}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </View>
      </View>
    );
  }
  
  renderItem = (item, index) => {
    let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
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
  getnews = async () => {
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetNews.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id
      })
    });
    const news = await response.json();
    // console.log(news)
    this.setState({
      new_img: news
    })
    // console.log(this.state.new_img);
  }

  getage = async () => {
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAgeUser.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id
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

  fetchData = async (status) => {
    
    var page = 0;
    if (status == 1) {
      page = 1;
      this.setState({ page: 1 })
    }
    else {
      page = this.state.page;
    }
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        page: page,
        user_id: this.state.user_id
      })
    });
    const users = await response.json();
    //  console.log(users);
    this.getnews();
    this.getage();
    users.map(user =>
      this.setState({
        user_surname: user.surname,
      })
    );
    if (users.length > 0) {
      this.setState({ lastItem: false })
    } else {
      this.setState({ lastItem: true })
    }
    if (status == 2) {
      this.setState({ data: this.state.data.concat(users), loadingVisible: false, loading: false });
    }
    else {
      this.setState({ data: users, loadingVisible: false });
    }
  }
  refresh() {
    this.setState({ refreshing: true });
    return new Promise((resolve) => {
      this.fetchData(1).then(() => {
        this.setState({ refreshing: false })
      });
      setTimeout(() => { resolve() }, 2000)
    });
  }

  componentDidMount() {
    console.log(PixelRatio.get())
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1].split('"')[1];
      this.setState((prevState, props) => ({
        user_id: user_id
      }), () => {
        // console.log(this.state.user_id);
        this.fetchData(1)
      })
    });
    //connect backend
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refresh.bind(this)}
              />
            }
            contentContainerStyle={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
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
                  this.fetchData(2)
                })
              }
            }}
          >
            {this.renderNews()}
            {this.renderListActivity()}
            {this.renderFooter()}
          </ScrollView>
          <View >
            <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
          </View>
        </LinearGradient>
      </SafeAreaView>

    )
  }
}

export default Articles;