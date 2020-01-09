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
  SafeAreaView
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NetworkInfo } from "react-native-network-info";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import * as theme from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
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
  }
});


class Articles extends Component {
  state = {
    data: [],
    refreshing: false,
    page: 1,
    loadingVisible: true
  }
  scrollX = new Animated.Value(0);


  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     header: (
  //       <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
  //         start={{ x: 0, y: 1 }}
  //         end={{ x: 1, y: 0 }}>
  //         <View style={[styles.flex, styles.row, styles.header,]}>
  //           <View style={{ alignItems: 'flex-start' }}>
  //             <Text style={{ fontSize: theme.sizes.font * 2, fontWeight: 'bold' }}>SUT JOIN</Text>
  //           </View>
  //           <View style={[styles.flex, styles.row]}>
  //             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AddActivity')} style={[styles.circleButtun, styles.marginRight]}>
  //               <FontAwesome name="search" size={20} />
  //             </TouchableOpacity>
  //             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AddActivity')} style={[styles.circleButtun]}>
  //               <Icon name="ios-add-circle" size={20} />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </LinearGradient>
  //     ),
  //     tabBarOnPress: (scene, jumpToIndex) => { console.log('Tab is pressed!') },
  //   }
  // }
  renderDots() {
    const { destinations } = this.props;
    // console.log(this.state.data);
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.state.data.map((item, index) => {
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

  renderRatings(rating) {
    const stars = new Array(5).fill(0);
    return (
      stars.map((_, index) => {
        const activeStar = Math.floor(rating) >= (index + 1);
        return (
          <FontAwesome
            name="star"
            key={`star-${index}`}
            size={theme.sizes.font}
            color={theme.colors[activeStar ? 'active' : 'gray']}
          />
        )
      })
    )
  }

  renderListRecommended = () => {
    return (
      <View style={[styles.column, styles.destinations], { marginTop: 20 }}>
        <View
          style={[
            styles.row,
            styles.recommendedHeader
          ]}
        >
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recommended</Text>
        </View>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow: 'visible', height: 280, marginTop: 20 }}
          data={this.state.data}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
          renderItem={({ item }) => this.renderItem(item)}
        />
        {this.renderDots()}
      </View>
    );
  }

  renderListActivity = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended], { marginTop: 20 }}>
        <View
          style={[
            styles.row,
            styles.recommendedHeader
          ]}
        >
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Activity</Text>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            Vertical
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[styles.shadow, { overflow: 'visible', marginTop: 20 }]}
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
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
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
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.name} {item.surname.split('').slice(0, 5)}...</Text>
              <Text style={{ color: theme.colors.white }}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text> {item.location_name.split('').slice(0, 5)}...</Text>
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
          <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Text style={{
              fontSize: theme.sizes.font,
              color: 'white',
              fontWeight: 'bold',
              // backgroundColor : 'rgba(52, 52, 52, 0.8)',
              // opacity: 0.5,
            }}>
              {dates}
            </Text>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
            {item.title}
          </Text>
          <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
            <Text style={{ color: theme.colors.caption }}>
              {item.description.split('').slice(0, 50)}...
              </Text>
            <FontAwesome
              name="chevron-right"
              size={theme.sizes.font * 0.75}
              color={theme.colors.caption}
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>

          </Text>
        </View>

      </TouchableOpacity>
    )

  }

  fetchData = async () => {
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetActivity.php');
    const users = await response.json();
    this.setState({ data: users, loadingVisible: false });
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
  
  componentWillMount() {
    this.fetchData(); //connect backend
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <PTRView onRefresh={this.refresh.bind(this)} >
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: theme.sizes.padding }}>
            {this.renderListRecommended()}
            {this.renderListActivity()}
          </ScrollView>
        </LinearGradient>
      </PTRView>
      </SafeAreaView>
    )
  }
}

export default Articles;