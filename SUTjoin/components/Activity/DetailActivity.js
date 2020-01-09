import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Platform, Linking} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';
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
    shadowOpacity: 2,
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
  recommendedList: {
  },
  recommendation: {
    width: (width - (theme.sizes.padding * 2)) / 4,
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
  avatar2: {
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding / 2,
  },
});

class Article extends Component {
  state = {
    join: false,
    joiner: [],
    id_user: '',
    qrcode:'',
    visibleDialog:false
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
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        id_user: user_id,
        qrcode : "IdActivity_" + article.id
      });
      this.setState({ joiner: [] })
      this.fetchData();
      console.log(this.state.qrcode);
    });

  }

  openGps = (lat,lng) => {
    var location = lat+','+lng;
    console.log(location);
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + location;
    this.openExternalApp(url,location)
  }

  openExternalApp = (url,location) => {
    var urlMap = "https://www.google.com/maps/dir/?api=1&destination=" + location;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(urlMap);
      } else {
        Alert.alert(
          'ERROR',
          'Unable to open: ' + url,
          [
            {text: 'OK'},
          ]
        );
      }
    });
  }
  genQrcode(){
    this.setState({
      visibleDialog : true
    });
  }
  DialogGenQrCode() {
    return (
      <View>
        <Dialog
          visible={this.state.visibleDialog}
          dialogStyle={{ bottom: 0 }}
          containerStyle={{  justifyContent: 'center' }}
          onTouchOutside={() => {
            this.setState({ visibleDialog: false });
          }}
          dialogTitle={<DialogTitle title="Check in" />}
          width='100%'
        >
          <DialogContent style={{justifyContent : 'center' , alignItems: 'center',marginTop:20}}>
              <QRCode
                value={this.state.qrcode}
                size={200}
                 />            
          </DialogContent>
        </Dialog>
      </View>


    )
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
        id: article.id,
        id_user: this.state.id_user
      })
    }).then((response) => response.text())
      .then((responseJson) => {
        if (responseJson > 0) {
          console.log("res is" + responseJson);
          this.setState({ join: true });
          console.log("it is " + this.state.join);

        }
      }).catch((error) => {
        console.error(error);
      });
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetUserJoinActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: article.id
      })
    });
    const users = await response.json();
    this.setState({ joiner: users });
    console.log(this.state.joiner.length);


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
        status: "cancel",
        id: article.id,
        inviter: article.inviter,
        id_user: this.state.id_user
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

    console.log(this.state.id_user);
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    if (article.age >= article.min_age && article.age <= article.max_age) {
      fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/JoinActivity.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          status: "add",
          id: article.id,
          inviter: article.inviter,
          id_user: this.state.id_user
        })
      }).then((response) => response.text())
        .then((responseJson) => {

          // Showing response message coming from server after inserting records.
          alert(responseJson);

        }).catch((error) => {
          console.error(error);
        });
    } else {
      alert("อายุไม่ตรงตามที่ผู้จัดกิจกรรมต้องการ");
    }
  }

  updateStatusJoin() {
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
        status: "update",
        id: article.id,
        inviter: article.inviter,
        id_user: this.state.id_user
      })
    }).then((response) => response.text())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });
  }

  renderJoinButton = (id_host, number_people, inviter,id) => {
    console.log("user is " + this.state.id_user.split('"')[1]);
    
    console.log("id host is " + id_host);
    if (id_host == this.state.id_user.split('"')[1]) {
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
        onPress={this.genQrcode.bind(this)}
      >
        <FontAwesome5
          name="check-circle"
          size={theme.sizes.font * 2}
          color={theme.colors.black}
        />
      </TouchableOpacity>
    } else if (this.state.join) {
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
    } else {
      if ((number_people == inviter)) {
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
          disabled={true}
        >
          <FontAwesome5
            name="user-plus"
            size={theme.sizes.font * 2}
            color={theme.colors.black}
          />
        </TouchableOpacity>
      }
      else {
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
          disabled={false}
        >
          <FontAwesome5
            name="user-plus"
            size={theme.sizes.font * 2}
            color={theme.colors.black}
          />
        </TouchableOpacity>
      }
    }
  }

  renderJoiner = () => {
    if (this.state.joiner.length > 0) {
      return (
        <View style={[styles.flex, styles.column, styles.recommended]}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            {/* <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: theme.colors.caption }}>More</Text>
          </TouchableOpacity> */}
          </View>
          <View style={[styles.column, styles.recommendedList]}>
            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={[styles.shadow, { overflow: 'visible' }]}
              data={this.state.joiner}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item, index }) => this.renderJoinerinActivity(item, index)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View >
          <View style={[styles.flex, styles.recommendationHeader]}>
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', textAlign: "center", marginTop: 10, marginBottom: 10, fontSize: 20 }}>No joiner</Text>
          </View>

        </View>
      )
    }
  }

  renderJoinerinActivity = (item, index) => {
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
    console.log("p " + photoUser);
    const isLastItem = index === item.length - 1;

    return (
      <View style={[
        styles.flex, styles.column, styles.recommendation, styles.shadow,
        index === 0 ? { marginLeft: theme.sizes.margin / 2 } : null,
        isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
      ]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image style={[styles.avatar2]} source={{ uri: photoUser }} />
          <Text style={{ color: theme.colors.black, fontWeight: 'bold' }}>{item.name} </Text>
          <Text style={{ color: theme.colors.black, fontWeight: 'bold' }}>{item.surname.split('').slice(0, 5)}...</Text>
        </View>

      </View>
    )

  }

  renderTpye = (type) => {
    console.log(type);
    if (type == 1) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="book"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Learning</Text>
          </Text>
        </View>
      )
    } else if (type == 2) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="heart"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Volunteer</Text>
          </Text>
        </View>
      )
    } else if (type == 3) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="play"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Recreation</Text>
          </Text>
        </View>
      )
    } else if (type == 4) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="play"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Hangout</Text>
          </Text>
        </View>
      )
    } else if (type == 5) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="rocket"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Travel</Text>
          </Text>
        </View>
      )
    } else if (type == 6) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="play"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Hobby</Text>
          </Text>
        </View>
      )
    } else if (type == 7) {
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="group"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Meet</Text>
          </Text>
        </View>
      )
    } else if (type == 8) {
      console.log("this");
      return (
        <View style={[styles.row]}>
          <Text >
            <FontAwesome
              name="glass"
              size={theme.sizes.font * 2}
              color={theme.colors.black}
            />
            <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.1 }}>    Eat & Drink</Text>
          </Text>
        </View>
      )
    } else {
      return (null);
    }
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
              <Text style={{ color: theme.colors.black, fontWeight: 'bold', marginBottom: 10 }}> {article.location_address}</Text>
              <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.openGps(article.location_lat,article.location_long)}>
                <View>
                  <Text style={{ color: 'blue', fontSize: 16, justifyContent: 'center', fontWeight: 'bold' }}> Show map </Text>
                </View>
              </TouchableOpacity>
              <View style={{ borderBottomColor: '#ffc9de', borderBottomWidth: 3, }} />
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
              {this.renderJoiner()}
              <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }} />
              <View style={{ borderBottomColor: '#ffc9de', borderBottomWidth: 3, }} />
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
              {this.renderTpye(article.type)}
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
            {this.renderJoinButton(article.id_host, article.number_people, article.inviter,article.id)}

          </View>

        </View>
        {this.DialogGenQrCode()}
      </ScrollView>

    )
  }
}

export default Article;