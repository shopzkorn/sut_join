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
  BackHandler,
  ScrollView
} from "react-native";
import {
  Icon,
  Body,
  CardItem,
  Card,
  Right,
  Button

} from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');


class manage_subject extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  state = {
    user_id: '',
    subject_id: '',
    user_detail: [],
    id_subject_del: '',
    visibleDialog: false,
    loadingVisible: true
  }
 
  componentWillMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        user_id: user_id,
      });
      console.log("Learbibg-ID :" + user_id);
      this.GetSignin();
    });
  }
  GetSignin() {
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetCheckSignin.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id.split('"')[1],
        status: 1
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

 

  renderListSubject = () => {
    if (!this.state.loadingVisible) {
      return (
        <Card >
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
        </Card>
      );
    }
  }

  renderDestination = item => {
    return (
      <View style={{ justifyContent: 'flex-start' }}>
          <CardItem>
            <Body>
              <Text>{item.id_subject} {item.name_subject}</Text>
            </Body>
            <Right>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('CheckTime',{id : item.id_subject,name:item.name_subject})}>
                      <Icon active name="arrow-forward" />
                    </TouchableOpacity>
              </Right>
          </CardItem>
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
 <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <View style={styles.container1}>
            {this.renderListSubject()}
          </View>
          </ScrollView>
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
  row_underline: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#ff1694'
  },
});

export default manage_subject;