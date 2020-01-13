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

import ProgressCircle from 'react-native-progress-circle';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class Learning extends Component {
    
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        
      }
      state = {
        gpax:0,
        credit:0,
        gpa1:0,
        gpa2:0,
        gpa3:0,
        gpa4:0,

        per_gpax:0,
        per_gpa1:0,
        per_gpa2:0,
        per_gpa3:0,
        per_gpa4:0,

        user_id:'',
      }

      componentWillMount() {
        AsyncStorage.multiGet(['user_id']).then((data) => {
          let user_id = data[0][1];
          this.setState({
            user_id: user_id,
          });
          console.log("Learbibg-ID :"+user_id);
          this.Getgpax();
      });
      }

      Getgpax() {
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetLearninggpa.php', {
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

                this.setState({gpax: responseJson[0],});
                this.setState({credis: responseJson[1],});
                this.setState({gpa1: responseJson[2],});
                this.setState({gpa2: responseJson[3],});
                this.setState({gpa3: responseJson[4],});
                this.setState({gpa4: responseJson[5],});

                this.setState({per_gpax: (responseJson[0]*100)/4,});
                this.setState({per_gpa1: (responseJson[2]*100)/4,});
                this.setState({per_gpa2: (responseJson[3]*100)/4,});
                this.setState({per_gpa3: (responseJson[4]*100)/4,});
                this.setState({per_gpa4: (responseJson[5]*100)/4,});

                this.setState({credit: responseJson[1],})
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
                
                <Text style={{ fontSize: 25 , marginBottom:30}}>Learning</Text>

                <View style={{marginRight: 20,alignItems: 'center'}}>
                    <ProgressCircle
                            percent={this.state.per_gpax}
                            radius={100}
                            borderWidth={20}
                            color="#03C04A"
                            shadowColor="#999"
                            bgColor="#fff"
                        >
                        <Text style={{ fontSize: 18 }}>{'GPAX : ' + this.state.gpax}</Text>
                    </ProgressCircle>
                            <Text style={{marginTop: 25,}}>Your GPAX is {this.state.gpax}</Text>
                            <Text style={{marginTop: 5,}}>In {this.state.credit} Credits</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{alignItems:'center' ,marginRight:30}}>
                            <AnimatedCircularProgress
                                size={100}
                                width={15}
                                fill={this.state.per_gpa1}
                                tintColor="#FF1493"
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3d5875" />
                            <Text>1st Year : {this.state.gpa1}</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <AnimatedCircularProgress
                                size={100}
                                width={15}
                                fill={this.state.per_gpa2}
                                tintColor="#FF1493"
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3d5875" />
                            <Text>2nd Year : {this.state.gpa2}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{alignItems:'center' ,marginRight:30}}>
                            <AnimatedCircularProgress
                                size={100}
                                width={15}
                                fill={this.state.per_gpa3}
                                tintColor="#FF1493"
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3d5875" />
                            <Text>3rd Year : {this.state.gpa3}</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <AnimatedCircularProgress
                                size={100}
                                width={15}
                                fill={this.state.per_gpa4}
                                tintColor="#FF1493"
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3d5875" />
                            <Text>4th Year : {this.state.gpa4}</Text>
                        </View>
                    </View>
                        {/* <Button
                        title="GPA Manage"
                        onPress={() => navigate('manage_gpa')}
                        /> */}
                    <Button
                        title="Add Course"
                        onPress={() => navigate('add_subject')}
                    />
                    {/* <View style={{marginTop:30}}>
                        <Button
                        title="Course Manage"
                        onPress={() => navigate('manage_subject')}
                        />
                    </View> */}
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
      flexDirection: 'row',
      marginTop:20,
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

  export default Learning;