import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  Dimensions,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
} from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { width, height } = Dimensions.get('window');
const options = {
  title: 'Select a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1, maxWidth: 1280, maxHeight: 1280

};
class Editprofile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: '', Surname: '', Username: '', Password: '', Email: '', Phone: '', Gender: '1', Status: '1', Birthday: '', Student_ID: '',
      user_id: '',
      sliderOneChanging: false,
      sliderOneValue: [1],
      imageSource: null,
      imageName: null,
      imagePath: null,
      loadingVisible: true,
      visibleStatus: false,
      visibleGender: false,
      radio_Gender: [
        { label: 'Male', value: 0 },
        { label: 'Female', value: 1 },
      ],
      radio_status: [
        { label: 'Student', value: 0 },
        { label: 'Teacher', value: 1 },
        { label: 'Personel', value: 2 },
        { label: 'General Public', value: 3 },
      ],
      valueStatus: 0,
      valueGender: 0,
      Textstatus: 'Student',
      Textgender: 'Male',
    };
  }

 

  FilterStatus = (value) => {
    console.log(value);
    if (value == 0) {
      this.setState({
        Textstatus: 'Student'
      })
    }
    else if (value == 1) {
      this.setState({
        Textstatus: 'Teacher'
      })
    }
    else if (value == 2) {
      this.setState({
        Textstatus: 'Personel'
      })
    }
    else if (value == 3) {
      this.setState({
        Textstatus: 'General Public'
      })
    }

    this.setState((prevState, props) => ({
      valueStatus: value,
      visibleStatus: false,
      Status: value + 1,
    }), () => {

      //this.fetchData()
    })
  }

  FilterGender = (value) => {
    console.log(value);
    if (value == 0) {
      this.setState({
        Textgender: 'Male'
      })
    }
    else if (value == 1) {
      this.setState({
        Textgender: 'Female'
      })
    }

    this.setState((prevState, props) => ({
      valueGender: value,
      visibleGender: false,
      Gender: value + 1,
    }), () => {

      //this.fetchData()
    })

  }

  DialogFilter() {
    return (
      <View>

        <Dialog
          visible={this.state.visibleStatus}
          dialogStyle={{ bottom: 0 }}
          containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
          onTouchOutside={() => {
            this.setState({ visibleStatus: false });
          }}
          dialogTitle={<DialogTitle title="Status" />}
          width='100%'
        >
          <DialogContent>
            <View>
              <RadioForm
                buttonColor={'#ffc9de'}
                radio_props={this.state.radio_status}
                initial={this.state.valueStatus}
                onPress={(value) => { this.FilterStatus(value) }}
              />
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          visible={this.state.visibleGender}
          dialogStyle={{ bottom: 0 }}
          containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
          onTouchOutside={() => {
            this.setState({ visibleGender: false });
          }}
          dialogTitle={<DialogTitle title="Gender" />}
          width='100%'
        >
          <DialogContent>
            <View>
              <RadioForm
                buttonColor={'#ffc9de'}
                radio_props={this.state.radio_Gender}
                initial={this.state.valueGender}
                onPress={(value) => { this.FilterGender(value) }}
              />
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }

  statusCheck = () => {
    if (this.state.Status == 1) {
      return (
        <View >
          <TextInput
            placeholder='Student id'
            value={this.state.Student_ID}
            onChangeText={Student_ID => this.setState({ Student_ID: Student_ID })}
            style={styles.button}
            multiline={true}
            underlineColorAndroid="transparent"

          />
        </View>
      )
    }
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source,
          imageName: response.fileName,
          imagePath: response.data
        });
      }
      console.log(response.fileName);
    });
  }

  setDate = (date) => {
    console.log(date);
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    let year = date.split('-')[0];
    let chooseDay = day + '-' + month + '-' + year
    this.setState({
      Birthday: chooseDay
    })
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.user_id_set();

  }

  user_id_set() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1].split('"')[1];
      this.setState((prevState, props) => ({
        id_user: user_id
      }), () => {
        console.log(this.state.id_user);
        this.fetchData()
      })
    });
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    if (this.state.visibleGender) {
      this.setState({
        visibleGender: false
      })
    }
    else if (this.state.visibleStatus) {
      this.setState({
        visibleStatus: false
      })
    }
    else {
      this.props.navigation.goBack(); // works best when the goBack is async
    }
    return true;
  }

  editProfileSend() {
    if (this.state.imagePath != null) {
      RNFetchBlob.fetch('POST', 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/uploadPhoto.php', {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
      }, [
        // custom content type
        { name: 'image', filename: this.state.imageName, data: this.state.imagePath },
      ]).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log(err);
      })
    }


    const { navigate } = this.props.navigation;
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/EditProfile.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.id_user,
        name: this.state.Name,
        surname: this.state.Surname,
        username: this.state.Username,
        password: this.state.Password,
        email: this.state.Email,
        phone: this.state.Phone,
        gender: this.state.Gender,
        status: this.state.Status,
        profile: this.state.imageName,
        birthday: this.state.Birthday,
        student_id: this.state.Student_ID,
      })
    }).then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)
        // Showing response message coming from server after inserting records.
        Alert.alert(
          'Sucess',
          responseJson,
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() },
          ],
          { cancelable: false },
        );
      }).catch((error) => {
        console.error(error);
      });
  }

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true,
    });
  };
  sliderOneValuesChange = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false,
    });
  };
  renderPhoto() {
    if (this.state.imageSource != null) {
      return (
        <ImageBackground style={[styles.flex, styles.destination, styles.shadow]} source={this.state.imageSource} >
          <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20, marginTop: -10 }} onPress={() => this.setState({ imageSource: null })}>
            <Ionicons name="md-close-circle" color={theme.colors.black} size={width / 15} />
          </TouchableOpacity>
        </ImageBackground>
      );
    }
    else {
      return null;
    }
  }

  fetchData = async () => {
    // console.log(this.state.myhost);
    Promise.all([
      fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          user_id: this.state.id_user,
        })
      }),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        console.log(data1),
          this.setProfile(data1),
          this.setState({
            loadingVisible: false
          })
      }
      )
  }

  setProfile = (data) => {
    data.map(user =>
      this.setState({
        imageName: user.profile,
        Name: user.name,
        Surname: user.surname,
        Username: user.username,
        Password: user.password,
        Email: user.email,
        Phone: user.phone,
        Gender: (user.user_gender),
        Status: (user.user_status),
        Birthday: user.birthday,
        Student_ID: user.student_id,
      })
    )
    { this.genderSetter() }
    { this.statusSetter() }
  }

  genderSetter() {
    if (this.state.Gender == 0) {
    } else if (this.state.Gender == 1) {
      this.setState({
        Textgender: "Male",
        valueGender: 0,
      })
    } else if (this.state.Gender == 2) {
      this.setState({
        Textgender: "Female",
        valueGender: 1,
      })
    }
  }

  statusSetter() {
    if (this.state.Status == 0) {
    } else if (this.state.Status == 1) {
      console.log(this.state.Textgender)
      this.setState({
        Textstatus: "Student",
        valuestatus: 0,
      })
    } else if (this.state.Status == 2) {
      this.setState({
        Textstatus: "Teacher",
        valuestatus: 1,
      })
    } else if (this.state.Status == 3) {
      this.setState({
        Textstatus: "Personal",
        valuestatus: 2,
      })
    } else if (this.state.Status == 4) {
      this.setState({
        Textstatus: "General Public",
        valuestatus: 3,
      })
    }
  }


  renderProfile = item => {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const user_idreg = navigation.getParam('user_id');
    // this.state.user_detail.map( (user,index) =>
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + this.state.imageName;
    console.log(photoUser)
    // );
    if (this.state.imageSource == null) {
      return (
        <TouchableOpacity onPress={this.selectPhoto.bind(this)}>
          <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={{ uri: photoUser }} style={styles.MainAvatar} />
            <Text>Change Profile Photo</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.selectPhoto.bind(this)}>
          <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={this.state.imageSource} style={styles.MainAvatar} />
            <Text>Change Profile Photo</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    if (!this.state.loadingVisible) {
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
                    <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                        Edit profile
                </Text>
                </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: theme.sizes.padding, flexGrow: 1, justifyContent: 'space-between', }}
              style={{ backgroundColor: 'rgba(0,0,0,0.1)', }}
            >
              {this.renderProfile()}

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <TextInput
                  style={styles.inputbox}
                  placeholder='Name'
                  placeholderTextColor='#808080'
                  value={this.state.Name}
                  onChangeText={Name => this.setState({ Name })}
                />
                <TextInput
                  style={styles.inputbox}
                  placeholder='Surname'
                  placeholderTextColor='#808080'
                  value={this.state.Surname}
                  onChangeText={Surname => this.setState({ Surname })}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <TextInput
                  style={styles.inputbox}
                  placeholder='Username'
                  placeholderTextColor='#808080'
                  value={this.state.Username}
                  onChangeText={Username => this.setState({ Username })}
                />
                <TextInput
                  style={styles.inputbox}
                  placeholder='Password'
                  placeholderTextColor='#808080'
                  secureTextEntry={true}
                  value={this.state.Password}
                  onChangeText={Password => this.setState({ Password })}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <TextInput
                  style={styles.inputbox}
                  placeholder='Email'
                  placeholderTextColor='#808080'
                  value={this.state.Email}
                  onChangeText={Email => this.setState({ Email })}
                />
                <TextInput
                  style={styles.inputbox}
                  placeholder='Phone'
                  placeholderTextColor='#808080'
                  value={this.state.Phone}
                  keyboardType={'number-pad'}
                  onChangeText={Phone => this.setState({ Phone })}
                />
              </View>

              <View style={{ borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 3, marginVertical: 20 }} />

              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.setState({ visibleGender: true })}>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <Foundation name="male-female" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                  <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Gender</Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}> {this.state.Textgender} </Text>
                <View style={{ marginRight: 20 }}>
                  <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.setState({ visibleStatus: true })}>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <Feather name="user" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                  <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Status</Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}> {this.state.Textstatus} </Text>
                <View style={{ marginRight: 20 }}>
                  <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                </View>
              </TouchableOpacity>
              {this.statusCheck()}
              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.props.navigation.navigate('CalendarEditPro', { onNavigateBack: this.setDate })}>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <FontAwesome name="birthday-cake" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                  <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Birthday</Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}> {this.state.Birthday} </Text>
                <View style={{ marginRight: 20 }}>
                  <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.selectPhoto.bind(this)}>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <MaterialCommunityIcons name="image" color={theme.colors.black} size={theme.sizes.font * 1.5} />
              <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Add photo</Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
            </View>
          </TouchableOpacity> */}
              {/* {this.renderPhoto()} */}
              <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
                <TouchableOpacity activeOpacity={0.7} style={{
                  borderWidth: 6,
                  borderColor: '#fe53bb',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width / 2.5,
                  height: width / 2.5,
                  backgroundColor: 'transparent',
                  borderRadius: width / 2.5 / 2,
                  marginBottom: -100,

                }} onPress={this.editProfileSend.bind(this)}>
                  <View style={{
                    borderWidth: 2,
                    borderColor: '#fe53bb',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width / 2.8,
                    height: width / 2.8,
                    backgroundColor: 'transparent',
                    borderRadius: width / 2.8 / 2,
                  }}>
                    <Text style={{ color: '#fe53bb', fontSize: width / 15, marginBottom: 40 }}> Save </Text>
                  </View>

                </TouchableOpacity>
                {this.DialogFilter()}
              </View>

            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
      );
    } else {
      return (
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}>
          <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
          </LinearGradient>
      )
    }
  }
}
export default Editprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputbox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    width: width / 2,
    paddingLeft: 10,
    height: height / 15
  },
  textTitle: {
    fontSize: 40,
  },
  text: {
    fontSize: 16,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: width,
    height: height / 16,
  },
  signuptext: {
    fontSize: 40,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  destination: {
    width: width,
    height: width * 0.6,
    paddingVertical: theme.sizes.padding * 0.66,
    marginTop: 10,
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
  flex: {
    flex: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
  MainAvatar: {
    // position: 'absolute',
    // top: -theme.sizes.margin,
    borderWidth: 2.5,
    borderColor: '#fff',
    width: theme.sizes.padding * 4,
    height: theme.sizes.padding * 4,
    borderRadius: theme.sizes.padding,
  },
});