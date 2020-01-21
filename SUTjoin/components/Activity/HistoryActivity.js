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
  AsyncStorage,
  RefreshControl,
  SafeAreaView,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NetworkInfo } from "react-native-network-info";
import Spinner from 'react-native-loading-spinner-overlay';
import * as theme from '../../theme';
import PTRView from 'react-native-pull-to-refresh';
const { width, height } = Dimensions.get('window');

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
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
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
    marginBottom:10
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
   back: {
        width: theme.sizes.base * 3,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15
    },
});


class Articles extends Component {
  state = {
    myparticipated: [],
    myUpcoming: [],
    refreshing: false,
    id_user: '',
    loadingVisible: true,
    age_user: 0,
    gender_user : 0,
  }
  scrollXparticipated = new Animated.Value(0);
  scrollXUpcoming = new Animated.Value(0);



  renderDotsparticipated() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollXparticipated, width);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.state.myparticipated.map((item, index) => {
          const borderWidth1 = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDot, { borderWidth: borderWidth1 }]}
            />
          )
        })}
      </View>
    )
  }
  renderDotsUpcoming() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollXUpcoming, width);
    console.log("position Upcoming is" + dotPosition);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.state.myUpcoming.map((item, index) => {
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


  renderparticipated = () => {
    if (this.state.myparticipated.length > 0) {
      return (
        <View style={[styles.column, styles.destinations]}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            <Text style={{ fontSize: theme.sizes.font * 1.4 }}>PARTICIPATED</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.navigation.navigate('AllHistoryActivity',{Status : 'end', age_user : this.state.age_user , gender_user : this.state.gender_user })}}>
            <Text style={{
          color: "#fe53bb",
          fontSize: 16,
          fontWeight: 'bold'
        }}>More</Text>
          </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={{ overflow: 'visible', height: 280  }}
            data={this.state.myparticipated.slice(0, 5)}
            keyExtractor={(item, index) => `${item.id}`}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollXparticipated } } }])}
            renderItem={({ item }) => this.renderDestination(item)}
          />
          {this.renderDotsparticipated()}
        </View>
      );
    }
    else {
      return (
        <View style={[styles.column, styles.destinations]}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            <Text style={{ fontSize: theme.sizes.font * 1.4 }}>PARTICIPATED</Text>
            
          </View>
          <View style={[styles.flex]}>
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', textAlign: "center", marginTop: 120, marginBottom: 120, fontSize: 20 }}>NO PARTICIPATED</Text>
          </View>
        </View>
      )
    }
  }

  renderDestination = (item) => {
    let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
    const { navigation } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item.id , age_user : this.state.age_user , gender_user : this.state.gender_user })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: photoAc }}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 0 }}>
              <Image source={{ uri: photoUser }} style={styles.avatar} />
            </View>
            <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.name} {item.surname}...</Text>
              <Text style={{ color: theme.colors.white }}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text> {item.location_name}...</Text>
              </Text>
            </View>
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end', }}>
              <Text>
                <MaterialCommunityIcons
                  name="account-plus"
                  size={theme.sizes.font * 1.5}
                  color={theme.colors.white}
                />
                <Text style={styles.rating}> {item.inviter}/{item.number_people}</Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
            {item.title}
          </Text>
          <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
            <Text style={{ color: theme.colors.caption }}>
              {item.description}...
              </Text>
            <FontAwesome
              name="chevron-right"
              size={theme.sizes.font * 0.75}
              color={theme.colors.caption}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderUpcoming = () => {
    console.log(this.state.myUpcoming.length);
    if (this.state.myUpcoming.length > 0) {
      return (
        <View style={[styles.column, styles.destinations]}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            <Text style={{ fontSize: theme.sizes.font * 1.4 }}>UPCOMING</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.navigation.navigate('AllHistoryActivity',{Status : 'soon', age_user : this.state.age_user , gender_user : this.state.gender_user })}}>
            <Text style={{
          color: "#fe53bb",
          fontSize: 16,
          fontWeight: 'bold'
        }}>More</Text>
          </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={{ overflow: 'visible', height: 280 }}
            data={this.state.myUpcoming.slice(0, 5)}
            keyExtractor={(item, index) => `${item.id}`}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollXUpcoming } } }])}
            renderItem={({ item }) => this.renderDestination(item)}
          />
          {this.renderDotsUpcoming()}
        </View>
      );
    }
    else {
      return (
        <View style={[styles.column, styles.destinations]}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            <Text style={{ fontSize: theme.sizes.font * 1.4 }}>UPCOMING</Text>
          </View>
          <View style={[styles.flex]}>
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', textAlign: "center", marginTop: 120, marginBottom: 120, fontSize: 20 }}>NO UPCOMING</Text>
          </View>
        </View>
      )
    }
  }



  fetchData = async () => {

    Promise.all([
      fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyJoin.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          text: 0,
          page: 1,
          id_user: this.state.id_user,
          status: 'soon'
        })
      }),
      fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyJoin.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          text: 0,
          page: 1,
          id_user: this.state.id_user,
          status: 'end'
        })
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        myUpcoming: data1,
        myparticipated: data2,
        loadingVisible: false
      }),
      this.getage()
      );
  }
  refresh() {
    this.setState({ refreshing: true });
    return new Promise((resolve) => {
      this.fetchData().then(() => {
        this.setState({ refreshing: false })
      });
      setTimeout(() => { resolve() }, 2000)
    });
  }
  componentDidMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        id_user: user_id,
      });
      this.fetchData();
      console.log(this.state.id_user);
    });
  }
  getage = async () => {
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAgeUser.php', {
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
  render() {
    if(!this.state.loadingVisible){
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}
        >
          <View style={{ flexDirection: 'row',justifyContent:'center',backgroundColor: 'rgba(0,0,0,0.1)',}}>
            <View style={{ justifyContent:'flex-start'}}>
                <View style={{paddingVertical: height /200 ,flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                            My events
                        </Text>
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
          >
            {this.renderUpcoming()}
            {this.renderparticipated()}
          </ScrollView>
          
        </LinearGradient>
        </SafeAreaView>
    )
  }else{
    return(
      <SafeAreaView style={{ flex: 1 }}>
    <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}
        >
            <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
            </LinearGradient>
            </SafeAreaView>
    )
  }
}
}

export default Articles;