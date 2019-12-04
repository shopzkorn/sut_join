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
  AsyncStorage
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NetworkInfo } from "react-native-network-info";
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
    fontSize: theme.sizes.font *1.5,
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
  }
});


class Articles extends Component {
  state = {
    myhost: [],
    myjoin: [],
    refreshing : false,
    id_user:''
  }
  scrollXHost = new Animated.Value(0);
  scrollXJoin = new Animated.Value(0);

  

  renderDotsHost() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollXHost, width);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.state.myhost.map((item, index) => {
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
  renderDotsJoin() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollXJoin, width);
    console.log("position join is"+dotPosition);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.state.myjoin.map((item, index) => {
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

  renderHost = () => {
    return (
      <View style={[styles.column, styles.destinations]}>
        <View
        style={[
          styles.row,
          styles.recommendedHeader
        ]}
      >
        <Text style={{ fontSize: theme.sizes.font * 1.4 }}>HOST</Text>
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
          data={this.state.myhost}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollXHost } } }])}
          renderItem={({ item }) => this.renderDestination(item)}
        />
        {this.renderDotsHost()}
      </View>
    );
  }

  renderDestination = item => {
    let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/'+item.photo;
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/'+item.profile;
    const { navigation } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{uri : photoAc}}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 0 }}>
              <Image source={{uri: photoUser}} style={styles.avatar} />
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

  renderJoin = () => {
    console.log(this.state.myjoin);
    return (
      <View style={[styles.column, styles.destinations]}>
      <View
      style={[
        styles.row,
        styles.recommendedHeader
      ]}
    >
      <Text style={{ fontSize: theme.sizes.font * 1.4 }}>JOIN</Text>
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
        data={this.state.myjoin}
        keyExtractor={(item, index) => `${item.id}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollXJoin } } }])}
        renderItem={({ item }) => this.renderDestination(item)}
      />
      {this.renderDotsJoin()}
    </View>
    );
  }

  
  
  fetchData = async () => {
    const responseHost = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyHost.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
        id_user: this.state.id_user
        })
        });
    const host = await responseHost.json();
    // console.log(host);
    this.setState({ myhost: host });
    console.log(this.state.myhost);

    const responseJoin = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyJoin.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
        id_user: this.state.id_user
        })
        });
    const join = await responseJoin.json();
    // console.log(join);
    this.setState({ myjoin: join });
    console.log(this.state.myjoin);
  }
  refresh() {
    this.setState({refreshing:true});
    return new Promise((resolve) => {
      this.fetchData().then(()=>{
        this.setState({refreshing:false})
      });
      setTimeout(()=>{resolve()}, 2000)
    });
  }
  componentWillMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
        let user_id = data[0][1];
        this.setState({
          id_user: user_id,
        });
        this.fetchData();
        console.log(this.state.id_user);
    });
  }
  render() {
    return (
      <PTRView onRefresh={this.refresh.bind(this)} >
      <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.5, 0.6]}
      colors={['white', 'pink']} >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
        >
          {this.renderJoin()}
          {this.renderHost()}
        </ScrollView>
      </LinearGradient>
      </PTRView>
    )
  }
}

export default Articles;