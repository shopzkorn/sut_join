import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler
} from "react-native";
import {
  Content,
  Icon,
  SwipeRow,
  Right,
  Body,
  CardItem,
  Card,
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
  componentWillUnmount() {
    this.backHandler.remove()
  }
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        user_id: user_id,
      });
      console.log("Learbibg-ID :" + user_id);
      this.GetSubject();
    });
  }
  handleBackPress = () => {
    if (this.state.visibleDialog) {
      this.setState({
        visibleDialog: false
      })
    }
    else {
      this.props.navigation.goBack(); // works best when the goBack is async
    }
    return true;
  }
  DialogAddSubject() {
    return (
      <View>
        <Dialog
          visible={this.state.visibleDialog}
          onTouchOutside={() => {
            this.setState({ visibleDialog: false });
          }}
          dialogTitle={<DialogTitle title="Enter your course" />}
          width='100%'
        >
          <DialogContent>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={[styles.row_underline, { marginBottom: 16, }]}>
                <TextInput placeholder="Course id"
                  value={this.state.subject_id}
                  onChangeText={subject_id => this.setState({ subject_id })}
                  placeholderTextColor="#ff1694"
                  underlineColorAndroid='transparent'
                  style={{ color: '#ff1694', flex: 0.7, fontSize: 16, paddingLeft: 12, textAlign: 'center' }}
                />
              </View>
              {/* <TouchableOpacity onPress={this.AddSubject}
                    style={{flex:0.2 , backgroundColor: '#ff1694', borderRadius:5, padding: 25,marginTop:200}}>
                        <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>Save</Text>
                    </TouchableOpacity> */}
              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity style={[
                  styles.buttonStyleFollow,
                  styles.centerEverything]}
                  activeOpacity={0.5}
                  onPress={this.AddSubject}
                >
                  <Text style={{
                    color: "#fe53bb",
                    fontSize: 20,
                    paddingVertical: 5,
                    fontWeight: 'bold'
                  }}>Save Course</Text>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
  AddSubject = () => {
    const { navigate } = this.props.navigation;
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/addSubject.php', {

      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id,
        subject_id: this.state.subject_id,
        grade: this.state.grade,
        term: this.state.term,

      })
    }).then((response) => response.text())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        this.setState({visibleDialog: false})
        this.GetSubject();
      }).catch((error) => {
        console.error(error);
      });
  }

  GetSubject() {
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetCourse.php', {
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

  setDeleteValue(item_id) {
    this.setState({ id_subject_del: item_id })
    { this.DeleteSubject() }
  }

  DeleteSubject() {
    const { navigate } = this.props.navigation;
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/deleteSubject.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id.split('"')[1],
        id_subject: this.state.id_subject_del,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        // alert(responseJson);
        console.log(responseJson);
        alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log('delllll' + this.state.id_subject_del)
    this.GetSubject();
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
    const { navigation } = this.props;
    var grade = ''
    if (item.grade == 0) {
      grade = 'F'
    } else if (item.grade == 1) {
      grade = 'D'
    } else if (item.grade == 1.5) {
      grade = 'D+'
    } else if (item.grade == 2) {
      grade = 'C'
    } else if (item.grade == 2.5) {
      grade = 'C+'
    } else if (item.grade == 3) {
      grade = 'B'
    } else if (item.grade == 3.5) {
      grade = 'B+'
    } else if (item.grade == 4) {
      grade = 'A'
    }
    return (


      <CardItem>
        <Body>
          <Text>{item.id_subject} {item.name_subject}</Text>
        </Body>
        <Right style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <TouchableOpacity  onPress={() => Alert.alert(
                      'Delete',
                      'Are you delete "' + item.name_subject + '"',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => this.setDeleteValue(item.id_subject)},
                      ],
                      {cancelable: false},
                    )}>
                      <Icon active name="trash" />
                    </TouchableOpacity>
              </Right>
      </CardItem>
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
          <View style={styles.container}>

            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
                onPress={() => this.setState({ visibleDialog: true })}
              >
                <Text style={{
                  color: "#fe53bb",
                  fontSize: 20,
                  paddingVertical: 5,
                  fontWeight: 'bold'
                }}>Add Course</Text>
              </TouchableOpacity>
            </View>
            {this.DialogAddSubject()}
            {/* <Button
                title="Add Course"
                onPress={() => navigate('add_subject')}
                /> */}

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