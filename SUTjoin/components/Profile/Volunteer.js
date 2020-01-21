import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import {
  Content,
  Icon,
  SwipeRow,
  Button,
} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');


class volunteer extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  state = {
    user_id: '',
    id_user: '',

    user_detail: [],

    id_subject_del: '',
    user_volunteer: '',

  }

  componentWillMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        user_id: user_id,
      });
      this.GetUser();
      this.GetVolunteer();
    });
  }

  GetUser() {
    const { navigate } = this.props.navigation;
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id.split('"')[1],
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        // alert(responseJson);
        console.log(responseJson);

        responseJson.map(user =>
          this.setState({
            user_volunteer: user.volunteer,
            loadingVisible: false
          })
        );
        console.log(this.state.user_volunteer);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  GetVolunteer() {
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetVolunteer.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id.split('"')[1],
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        // alert(responseJson);
        console.log(responseJson);
        this.setState({
          user_detail: responseJson,
          loadingVisible: false
        })
      })
      .catch((error) => {
        console.error(error);
      });

  }

  renderFollow = () => {
    if (!this.state.loadingVisible) {
      return (
        <FlatList
          Vertical
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={[styles.shadow, { overflow: 'visible' }]}
          data={this.state.user_detail}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item, index }) => this.renderDestination(item, index)}
        />
      );
    }
  }

  renderDestination = item => {
    const { navigation } = this.props;

    return (
      <View style={{ justifyContent: 'flex-start', marginTop: 10 }}>
        <View style={[styles.row], { alignItems: 'center' }}>
          <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
            <Text style={{ color: '#fe53bb', fontWeight: 'bold', fontSize: theme.sizes.padding * 0.6 }}>Activities : {item.title}</Text>
            <Text style={{ color: theme.colors.white, fontWeight: 'bold', fontSize: theme.sizes.padding * 0.4, marginTop: 10 }}>
              Volunteer Point : {item.volunteer_hour}   Date :  {item.date_checked}
            </Text>
            <View style={{ borderBottomColor: '#fff', borderBottomWidth: 3, marginTop: 5, marginBottom: 10 }} />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginRight: 10 }}>
        </View>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
              <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
              <Text style={{ fontSize: width / 20, fontWeight: 'bold', color: '#ffffff', alignSelf: 'center' }}>
                Volunteer
            </Text>
            </View>
          </View>
          <View style={styles.container1}>
            <View>
              <Text style={[styles.row], { fontSize: 20, padding: 10, alignSelf: 'center', fontWeight: 'bold', }}>Your Volunteer Point : {this.state.user_volunteer}</Text>
              <View style={{ borderBottomColor: '#000', borderBottomWidth: 3, marginTop: 5, marginBottom: 10 }} />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: theme.sizes.padding }}>
              {this.renderFollow()}
            </ScrollView>
          </View>

        </LinearGradient>
      </SafeAreaView>
    );
  }
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
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center'
  },
  contain: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonStyleFollow: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
});

export default volunteer;