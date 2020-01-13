import React, { Component } from "react";
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
  TouchableOpacity
} from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NetworkInfo } from "react-native-network-info";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import * as theme from '../../theme';
import PTRView from 'react-native-pull-to-refresh';
const { width, height } = Dimensions.get('window');


class History extends React.Component {

  state = {
    data: [],
    refreshing: false,
    searchKey: '0',
    page: 1,
    filter: 2,
    search: 0,

    buttonBG: [
      { button_id: '0', background: require('../../asset/image/All.jpg'), backgroundcolor: true, text: 'All' },
      { button_id: '1', background: require('../../asset/image/Learning.jpg'), backgroundcolor: false, text: 'Learning' },
      { button_id: '2', background: require('../../asset/image/Volunteer.jpg'), backgroundcolor: false, text: 'Volunteer' },
      { button_id: '3', background: require('../../asset/image/Recreation.jpg'), backgroundcolor: false, text: 'Recreation' },
      { button_id: '4', background: require('../../asset/image/Hangout.jpg'), backgroundcolor: false, text: 'Hangout' },
      { button_id: '5', background: require('../../asset/image/Travel.jpg'), backgroundcolor: false, text: 'Travel' },
      { button_id: '6', background: require('../../asset/image/Hobby.jpg'), backgroundcolor: false, text: 'Hobby' },
      { button_id: '7', background: require('../../asset/image/Meet.jpg'), backgroundcolor: false, text: 'Meet' },
      { button_id: '8', background: require('../../asset/image/Eat.jpg'), backgroundcolor: false, text: 'Eat&Drink' },
    ],

  }
  scrollX = new Animated.Value(0);

  refresh() {
    this.setState({ refreshing: true });
    return new Promise((resolve) => {
      this.fetchDataSearch().then(() => {
        this.setState({ refreshing: false })
      });
      setTimeout(() => { resolve() }, 2000)
    });
  }

  componentWillMount() {
    this.fetchDataSearch(); //connect backend
  }

  // fetchData = async () => {
  //   console.log(this.state.searchKey);
  //   const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetActivity.php');
  //   const users = await response.json();
  //   this.setState({ data: users ,search:1});
  // }

  fetchDataSearch = async () => {
    console.log('fecth');
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Explore.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        text: this.state.searchKey,
        page: this.state.page,
        filter: this.state.filter,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log('res ' + responseJson.length);
        if (responseJson.length > 0) {
          this.setState({
            search: 1,
            data: responseJson,
            loadingVisible: false,
          });
        } else {
          this.setState({
            search: 2,
            loadingVisible: false,
          });
        }
      }).catch((error) => {
        console.error(error);
      });
  }


      // fetchData = async () => {
      //   console.log(this.state.searchKey);
      //   const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetActivity.php');
      //   const users = await response.json();
      //   this.setState({ data: users ,search:1});
      // }

      fetchDataSearch = async () => {
        console.log('fecth');
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Expolre.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                text: this.state.searchKey,
                page: this.state.page,
                filter: this.state.filter,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson.length);
                if (responseJson.length > 0) {
                    this.setState({
                        search: 1,
                        data: responseJson,
                        loadingVisible: false,
                    });
                } else {
                    this.setState({
                        search: 2,
                        loadingVisible: false,
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    

      renderListActivity = () => {
        if (this.state.search == 1){
        return (
          <View style={[styles.flex, styles.column, styles.recommended], { marginTop: 20 }}>
            <View
              style={[
                styles.row,
                styles.recommendedHeader
              ]}
            >
              <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Activities</Text>
            </View>
            <View style={[styles.column, styles.recommendedList]}>
              <FlatList
                Vertical
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                numColumns={2}
                snapToAlignment="center"
                style={[styles.shadow, { overflow: 'visible', marginTop: 20 }]}
                data={this.state.data}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item, index }) => this.renderItem(item, index)}
              />
            </View>
          </View>
      );
    } else if (this.state.search == 2) {
      return (
        <View style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>No result</Text>


        </View>
      )
    }
  }

  renderItem = (item, index) => {
    let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
    const { navigation } = this.props;
    const dates = moment(item.date_start).format('MMM, Do YYYY HH:mm');
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
        <ImageBackground
                    style={[styles.flex, styles.destination, styles.shadow]}
                    imageStyle={{ borderRadius: theme.sizes.radius }}
                    source={{ uri: photoAc }}
                >
                    <Image source={{ uri: photoUser }} style={styles.avatar} />

                </ImageBackground>

                <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
                    <Text style={{ fontSize: theme.sizes.font, fontWeight: '500', fontWeight: 'bold' }}>
                        HOST
                    </Text>
                    <Text style={{ fontSize: theme.sizes.font, fontWeight: '500', }}>
                        {item.name}  {item.surname.split('').slice(0, 5)}...
                    </Text>
                </View>

                <View >
                    <Text style={{
                        fontSize: theme.sizes.font * 1.1,
                        fontWeight: '500',
                        left: (width - (theme.sizes.padding * 9)) / (Platform.OS === 'ios' ? 3.2 : 3),
                        color: '#ea5e76',
                        fontWeight: 'bold'
                    }}>
                        {item.title}
                    </Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    left: (width - (theme.sizes.padding * 9)) / (Platform.OS === 'ios' ? 3.2 : 3),
                }}>
                    <Text style={{
                        fontSize: theme.sizes.font,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {dates}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    left: (width - (theme.sizes.padding * 9)) / (Platform.OS === 'ios' ? 3.2 : 3),
                }}>
                    <Text>
                        <MaterialCommunityIcons
                            name="account-plus"
                            size={theme.sizes.font}
                            color={theme.colors.white}
                        />
                        <Text style={{
                            fontSize: theme.sizes.font,
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            {item.inviter}/{item.number_people}</Text>
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: theme.sizes.font * .5, fontWeight: '500', paddingBottom: 8, }} />
                </View>
            </TouchableOpacity>
    )

  }

  InterestBtn() {
    <View style={[
      styles.row,
      styles.recommendedHeader
    ]}>
      <TouchableOpacity style={styles.buttonInterest} onPress={this.OnSave}>
        <Text style={styles.buttontextInterest} onPress={this.OnSave}> Done </Text>
      </TouchableOpacity>
    </View>
  }

  renderTypeFilterScoll(){
    return(
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {this.state.buttonBG.map((item, key) => (
    <View style={[
      styles.flex, styles.row, styles.recommendation, styles.shadow
    ]}>
      <View style={[styles.flex, styles.recommendationHeader]}>
        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: item.backgroundcolor ? "#cccccc" : "#eeeeee", }}
          onPress={() => this.changBG(item)}>
          <Image style={[styles.recommendationImage]} source={item.background} />
          <View style={{ width: 100, height: 100, position: 'absolute', backgroundColor: item.backgroundcolor ? "white" : "black", opacity: 0.5 }} />
          <View style={[styles.flex, styles.row, styles.recommendationOptions]}>
            <Text style={{ fontSize: theme.sizes.font * 0.62, color: item.backgroundcolor ? "black" : "white", fontWeight: 'bold', }}>
              {item.text}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    ))}
    </ScrollView>
    )
  }

  changBG = item => {
    let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));

    for (let x = 0; x < this.state.buttonBG.length; x++) {
      if (this.state.buttonBG[x].button_id == item.button_id) {
        buttonBG[x].backgroundcolor = true;

        this.setState({
          buttonBG: buttonBG,
        });
      } else {
        buttonBG[x].backgroundcolor = false;

        this.setState({
          buttonBG: buttonBG,
        });
      }
    }
    this.setState((prevState, props) => ({
      searchKey: item.button_id
    }), () => {
      this.fetchDataSearch();
    })
  }

  render() {

    return (
     
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}
        >
           <PTRView onRefresh={this.refresh.bind(this)} >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: theme.sizes.padding }}>

            {this.renderTypeFilterScoll()}
            {this.InterestBtn()}
            {this.renderListActivity()}


          </ScrollView>
          </PTRView>
        </LinearGradient>
      
    )
  }

}
export default History;

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
    width: width - (theme.sizes.padding * 6),
        height: width * 0.4,
        marginHorizontal: theme.sizes.margin * .3,
        paddingHorizontal: theme.sizes.padding / 2,
        paddingVertical: theme.sizes.padding * 0.66,
        borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: 'relative',
        borderBottomLeftRadius: theme.sizes.radius,
        borderBottomRightRadius: theme.sizes.radius,
        paddingHorizontal: theme.sizes.padding / 2,
        // paddingVertical: theme.sizes.padding / 2,
        bottom: 10,
        left: (width - (theme.sizes.padding * 10)) / (Platform.OS === 'ios' ? 3.2 : 3),
        backgroundColor: theme.colors.white,
        width: width - (theme.sizes.padding * 6),
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
    width: (width - (theme.sizes.padding * 2)) / 4,
    height: (height - (theme.sizes.padding * 2)) / 9,
    marginHorizontal: 8,
    // backgroundColor: theme.colors.white,
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
    fontSize: theme.sizes.font * 0.62,
    // color: theme.colors.white,
    fontWeight: 'bold',

  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 4,
    height: (width - (theme.sizes.padding * 2)) / 3,
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
    backgroundColor: "#c0c0ff",
    borderRadius: 50,
    // marginRight : 10
  },
  marginRight: {
    marginRight: 10
  },
  buttontextInterest: {
    fontSize: 25,
    fontWeight: '500',
    color: '#ffc9de',
    textAlign: 'center',
  },
  buttonInterest: {
    // width: 110,
    backgroundColor: '#FFFFFF',
    borderColor: '#ffc9de',
    borderWidth: 5,
    borderRadius: 25,
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100,
  },
});
