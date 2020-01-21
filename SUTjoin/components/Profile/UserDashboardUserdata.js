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
    TouchableOpacity,
    AsyncStorage,
} from "react-native";

import ProgressCircle from 'react-native-progress-circle';
import PieChart from 'react-native-pie-chart';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons'
import * as theme from '../../theme';
import PTRView from 'react-native-pull-to-refresh';
const { width, height } = Dimensions.get('window');


class UserDashboard_user__data extends React.Component {

    state = {
      user_id:'',

      getall:0,
      allofpart:500,
      percent1:0,
      percent2:0,
      percent3:0,
      percent4:0,
      percent5:0,
      percent6:0,
      percent7:0,
      percent8:1,
      }


    refresh() {
        this.setState({ refreshing: true });
        return new Promise((resolve) => {
          this.fetchData().then(() => {
            this.setState({ refreshing: false })
          });
          setTimeout(() => { resolve() }, 2000)
        });
      }

      componentWillMount() {
        AsyncStorage.multiGet(['user_id']).then((data) => {
          let user_id = data[0][1];
          this.setState({
            user_id: user_id,
          });
          console.log("ID :"+user_id);
          this.GetUserDashboard();
      });
      }

      fetchData = async () => {
        const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetUserDashboard.php');
        const users = await response.json();
        this.setState({ data: users });
      }

      GetUserDashboard() {
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetUserDashboard.php', {
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
                this.setState({getall: responseJson[0],}),
                console.log(this.state.getall);

                this.setState({percent1: responseJson[1],}),
                console.log(this.state.percent1);

                this.setState({percent2: responseJson[2],}),
                console.log(this.state.percent2);

                this.setState({percent3: responseJson[3],}),
                console.log(this.state.percent3);

                this.setState({percent4: responseJson[4],}),
                console.log(this.state.percent4);

                this.setState({percent5: responseJson[5],}),
                console.log(this.state.percent5);

                this.setState({percent6: responseJson[6],}),
                console.log(this.state.percent6);

                this.setState({percent7: responseJson[7],}),
                console.log(this.state.percent7);

                this.setState({percent8: responseJson[8],}),
                console.log(this.state.percent8);


          })
          .catch((error) => {
            console.error(error);
          });
      }

      renderDashboard = item => {

        const chart_wh = 200
        const series = [
          parseInt(this.state.percent1),
          parseInt(this.state.percent2), 
          parseInt(this.state.percent3), 
          parseInt(this.state.percent4), 
          parseInt(this.state.percent5),
          parseInt(this.state.percent6),
          parseInt(this.state.percent7),
          parseInt(this.state.percent8),]

            
        const sliceColor = ['#F44336','#2196F3','#FFEB3B','#ff71ce', '#4CAF50', '#FF9800','#b967ff','#7fffd4']
    
        return (
          <View>
            <Text style={{fontSize:30,marginBottom:20,marginTop:20,padding:10,fontWeight: 'bold'}}>My Activities Joined</Text>
            <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 20}}>
              
              <View style={{marginRight: 20,alignItems: 'center'}}>
              <ProgressCircle
                    percent={this.state.percent1}
                    radius={50}
                    borderWidth={8}
                    color="#F44336"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{this.state.percent1+'%'}</Text>
              </ProgressCircle>
                    <Text>Learning</Text>
              </View>
              <View style={{marginRight: 20,alignItems: 'center'}}>
              <ProgressCircle
                    percent={this.state.percent2}
                    radius={50}
                    borderWidth={8}
                    color="#2196F3"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{this.state.percent2+'%'}</Text>
              </ProgressCircle>
                    <Text>Volunteer</Text>
              </View>
              <View style={{alignItems: 'center'}}>
              <ProgressCircle
                  percent={this.state.percent3}
                  radius={50}
                  borderWidth={8}
                  color="#FFEB3B"
                  shadowColor="#999"
                  bgColor="#fff"
              >
                  <Text style={{ fontSize: 18 }}>{this.state.percent3+'%'}</Text>
              </ProgressCircle>
                  <Text>Recreation</Text>
              </View>
              </View>

              <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 20}}>
              <View style={{marginRight: 20,alignItems: 'center'}}>
              <ProgressCircle
                    percent={this.state.percent4}
                    radius={50}
                    borderWidth={8}
                    color="#ff71ce"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{this.state.percent4+'%'}</Text>
              </ProgressCircle>
                    <Text>Hangout</Text>
              </View>
              <View style={{marginRight: 20,alignItems: 'center'}}>
              <ProgressCircle
                    percent={this.state.percent5}
                    radius={50}
                    borderWidth={8}
                    color="#4CAF50"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{this.state.percent5+'%'}</Text>
              </ProgressCircle>
                    <Text>Travel</Text>
              </View>
              <View style={{alignItems: 'center'}}>
              <ProgressCircle
                  percent={this.state.percent6}
                  radius={50}
                  borderWidth={8}
                  color="#FF9800"
                  shadowColor="#999"
                  bgColor="#fff"
              >
                  <Text style={{ fontSize: 18 }}>{this.state.percent6+'%'}</Text>
              </ProgressCircle>
                  <Text>Hobby</Text>
              </View>
              </View>

              <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 20}}>
              <View style={{marginRight: 20,alignItems: 'center'}}>
              <ProgressCircle
                    percent={this.state.percent7}
                    radius={50}
                    borderWidth={8}
                    color="#b967ff"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{this.state.percent7+'%'}</Text>
              </ProgressCircle>
                    <Text>Meet</Text>
              </View>
              
              <View style={{alignItems: 'center'}}>
              <ProgressCircle
                  percent={this.state.percent8}
                  radius={50}
                  borderWidth={8}
                  color="#7fffd4"
                  shadowColor="#999"
                  bgColor="#fff"
              >
                  <Text style={{ fontSize: 18 }}>{this.state.percent8+'%'}</Text>
              </ProgressCircle>
                  <Text>Eat&Drink</Text>
              </View>
              </View>
              

              
            </View>
        );
      }
    render() {
        
            return (
                <LinearGradient
                  colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                  start={{ x: 0.0, y: 0.5 }}
                  end={{ x: 1.0, y: 0.5 }}
                  style={{ flex: 1 }}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: theme.sizes.padding }}>
                    

                    {this.renderDashboard()}
                    
                    

                  </ScrollView>
                </LinearGradient>
            )
          }
    
}
export default UserDashboard_user__data;

const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    column: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row'
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
  });
