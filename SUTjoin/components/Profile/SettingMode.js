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

    };
  }

  async removeItemValue() {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('user_status');
      this.props.navigation.navigate('Login')
     
    }
    catch(exception) {
      return false;
    }
  }


  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
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
                    Setting
                </Text>
            </View>
          </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.sizes.padding ,flexGrow: 1, justifyContent: 'flex-start',}}
          style={{ backgroundColor: 'rgba(0,0,0,0.1)', }}
        >
            <TouchableOpacity onPress={() => navigate('AboutSutjoin')}>
                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)',alignItems:'center',padding:20,}}>
                    <Text style={{ fontSize: 16,color: '#000' ,alignSelf:'center'}}>
                        About SUT JOIN
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigate('HelpCenter')}>
                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)',alignItems:'center',padding:20,}}>
                    <Text style={{ fontSize: 16,color: '#000' ,alignSelf:'center'}}>
                        Help Center
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{padding:100}}>
                <TouchableOpacity style={[
                    styles.buttonStyleFollow,
                    styles.centerEverything]}
                    activeOpacity={0.5}
                onPress={() => this.removeItemValue()}
                >
                <Text style={{
                    color:"#fe53bb",
                    fontSize: 22,
                    fontWeight: 'bold',
                    alignSelf:'center'
                    }}>Log Out</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
      </LinearGradient>
      </SafeAreaView>
    );
  }
}
export default Editprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
  buttonStylenoFollow: {
    paddingHorizontal: 30,
    backgroundColor: '#ffa8c0',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#ffa8c0',
  },
  buttonStyleFollow: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
  
});