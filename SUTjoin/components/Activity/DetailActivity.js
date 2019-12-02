import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as theme from '../../theme';

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
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: 'transparent',
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 1.5,
    fontWeight: 'bold'
  },
  btnFooter: {
    position: 'absolute',
    left: 0,
    bottom: 10,
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.black
  },
});

class Article extends Component {
  state = {
    join : false
  }

  scrollX = new Animated.Value(0);

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.flex, styles.row, styles.header]}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <MaterialIcons name="more-horiz" color={theme.colors.white} size={theme.sizes.font * 1.5} />
          </TouchableOpacity> */}
        </View>
      ),
      headerTransparent: true,
    }
  }

  componentWillMount() {
    console.log(1);
    this.fetchData();
  }

  fetchData = async () => {
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/CheckJoinActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
      id : article.id,
      id_user: 1
      })
      }).then((response) => response.text())
      .then((responseJson) => {
        if(responseJson > 0){
         
        this.setState({join:true})
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  canceljoin() {
    console.log(0);
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/JoinActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
      status : "cancel",
      id : article.id,
      inviter : article.inviter,
      id_user: 1
      })
      }).then((response) => response.text())
      .then((responseJson) => {
  
        // Showing response message coming from server after inserting records.
        alert(responseJson);
  
      }).catch((error) => {
        console.error(error);
      });
  }

  join() {
    console.log(1);
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/JoinActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
      status : "add",
      id : article.id,
      inviter : article.inviter,
      id_user: 1
      })
      }).then((response) => response.text())
      .then((responseJson) => {
  
        // Showing response message coming from server after inserting records.
        alert(responseJson);
  
      }).catch((error) => {
        console.error(error);
      });
  }
  renderJoinButton = (id_host) => {
    console.log("id host is " + id_host);
    if (id_host == 1) {
      return <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: 'green',
          borderRadius: 100,
        }}
        onPress={this.join.bind(this)}
      >
        <FontAwesome5
          name="check-circle"
          size={theme.sizes.font * 2}
          color={theme.colors.black}
        />
      </TouchableOpacity>
    } else if (this.state.join){
      return <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: 'red',
          borderRadius: 100,
        }}
        onPress={this.canceljoin.bind(this)}
      >
        <FontAwesome5
          name="user-times"
          size={theme.sizes.font * 2}
          color={theme.colors.black}
        />
      </TouchableOpacity>
    } else
      return <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: '#ffc9de',
        borderRadius: 100,
      }}
      onPress={this.join.bind(this)}
    >
      <FontAwesome5
        name="user-plus"
        size={theme.sizes.font * 2}
        color={theme.colors.black}
      />
    </TouchableOpacity>
  }

  renderGender = (gender) => {
    if (gender == 1)
      return <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Male</Text>
    else if (gender == 2)
      return <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Female</Text>
    else
      return <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Male & Female</Text>
  }

  renderRatings = (rating) => {
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
            style={{ marginRight: 4 }}
          />
        )
      })
    )
  }

  render() {
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + article.photo;
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + article.profile;
    console.log(article);
    const dates = moment(article.date_start).format('MMMM, Do YYYY HH:mm');
    return (

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
      >
        <View style={styles.flex}>
          <View style={[styles.flex]}>
            <Image
              source={{ uri: photoAc }}
              resizeMode='cover'
              style={{ width, height: width * 0.7 }}
            />
            {/* {this.renderDots()} */}

          </View>
          <View style={[styles.flex, styles.content]}>
            <View style={[styles.flex, styles.contentHeader]}>
              <Image style={[styles.avatar, styles.shadow]} source={{ uri: photoUser }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{article.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', textAlign: 'right' }}>{article.name} {article.surname}</Text>
                </View>
              </View>
              <View style={[
                styles.row,
                { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
              ]}>
                <Text >
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={theme.sizes.font}
                    color={theme.colors.black}
                  />
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold' }}> {article.location_name}</Text>
                </Text>
              </View>
              <View style={{ borderBottomColor: '#ffc9de', borderBottomWidth: 3, }}/>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }} />
              <View style={[
                styles.row
              ]}>
                <Text >
                  <FontAwesome5
                    name="users"
                    size={theme.sizes.font * 2}
                    color={theme.colors.black}
                  />
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.5 }}> Joiners {article.inviter}/{article.number_people}</Text>
                </Text>
              </View>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }} />
              <View style={{ borderBottomColor: '#ffc9de', borderBottomWidth: 3, }}/>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.5 }}>Event details</Text>
              </View>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.black, fontSize: theme.sizes.font * 1.1 }}>
                  {article.description}
                </Text>
              </View>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
              </Text>
              <View style={[
                styles.row
              ]}>
                <Text >
                  <Foundation
                    name="calendar"
                    size={theme.sizes.font * 2}
                    color={theme.colors.black}
                  />
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    {dates}</Text>
                </Text>
              </View>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
              </Text>
              <View style={[
                styles.row
              ]}>
                <Text >
                  <FontAwesome
                    name="play"
                    size={theme.sizes.font * 2}
                    color={theme.colors.black}
                  />
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    {article.type}</Text>
                </Text>
              </View>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
              </Text>
              <View style={[
                styles.row
              ]}>
                <Text >
                  <FontAwesome
                    name="user"
                    size={theme.sizes.font * 2}
                    color={theme.colors.black}
                  />
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    {article.min_age} - {article.max_age} years old</Text>
                </Text>
              </View>
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
              </Text>
              <View style={[
                styles.row
              ]}>
                <Text >
                  <Foundation
                    name="male-female"
                    size={theme.sizes.font * 2}
                    color={theme.colors.black}
                  />
                  {this.renderGender(article.gender)}

                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {this.renderJoinButton(article.id_host)}

          </View>

        </View>
      </ScrollView>

    )
  }
}

export default Article;