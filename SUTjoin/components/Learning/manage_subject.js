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
    Button,
    AsyncStorage,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');


class manage_subject extends Component {
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
      }
      state = {
        user_id:'',


      }

      componentWillMount() {
        AsyncStorage.multiGet(['user_id']).then((data) => {
          let user_id = data[0][1];
          this.setState({
            user_id: user_id,
          });
          console.log("Learbibg-ID :"+user_id);
          this.GetSubject();
      });
      }
      
      GetSubject() {
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetCourse.php', {
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

            
          })
          .catch((error) => {
            console.error(error);
          });

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
                <View style={styles.container}>
                
                <Text style={{ fontSize: 25 , marginBottom:30}}>Course</Text>
                <Button
                title="Add Course"
                onPress={() => navigate('add_subject')}
                />
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
      justifyContent: 'center',
      alignItems: 'center'
    },
  });

  export default manage_subject;