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
  Button,
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


class UserDashboard extends React.Component {

  state = {
    user_id: '',

    getall: 0,
    allofpart: 500,
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
    percent7: 0,
    percent8: 1,

    createAll: 0,
    createpercent1: 0,
    createpercent2: 0,
    createpercent3: 0,
    createpercent4: 0,
    createpercent5: 0,
    createpercent6: 0,
    createpercent7: 0,
    createpercent8: 1,
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
      console.log("ID :" + user_id);
      this.GetUserDashboard();
    });
  }

  fetchData = async () => {
    const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAllDashboard.php');
    const users = await response.json();
    this.setState({ data: users });
  }

  GetUserDashboard() {
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAllDashboard.php', {
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
        this.setState({ getall: responseJson[0], }),
          console.log(this.state.getall);

        this.setState({ percent1: responseJson[1], }),
          console.log(this.state.percent1);

        this.setState({ percent2: responseJson[2], }),
          console.log(this.state.percent2);

        this.setState({ percent3: responseJson[3], }),
          console.log(this.state.percent3);

        this.setState({ percent4: responseJson[4], }),
          console.log(this.state.percent4);

        this.setState({ percent5: responseJson[5], }),
          console.log(this.state.percent5);

        this.setState({ percent6: responseJson[6], }),
          console.log(this.state.percent6);

        this.setState({ percent7: responseJson[7], }),
          console.log(this.state.percent7);

        this.setState({ percent8: responseJson[8], }),
          console.log(this.state.percent8);

        this.setState({ createAll: responseJson[9], }),
          console.log(this.state.getall);

        this.setState({ createpercent1: responseJson[10], }),
          console.log(this.state.percent1);

        this.setState({ createpercent2: responseJson[11], }),
          console.log(this.state.percent2);

        this.setState({ createpercent3: responseJson[12], }),
          console.log(this.state.percent3);

        this.setState({ createpercent4: responseJson[13], }),
          console.log(this.state.percent4);

        this.setState({ createpercent5: responseJson[14], }),
          console.log(this.state.percent5);

        this.setState({ createpercent6: responseJson[15], }),
          console.log(this.state.percent6);

        this.setState({ createpercent7: responseJson[16], }),
          console.log(this.state.percent7);

        this.setState({ createpercent8: responseJson[17], }),
          console.log(this.state.percent8);


      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderDashboard = item => {

    const { navigate } = this.props.navigation;

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

    const seriesCreate = [
      parseInt(this.state.createpercent1),
      parseInt(this.state.createpercent2),
      parseInt(this.state.createpercent3),
      parseInt(this.state.createpercent4),
      parseInt(this.state.createpercent5),
      parseInt(this.state.createpercent6),
      parseInt(this.state.createpercent7),
      parseInt(this.state.createpercent8),]


    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#ff71ce', '#4CAF50', '#FF9800', '#b967ff', '#7fffd4']

    return (
      <View>
        <Text style={{ fontSize: 30, marginBottom: 10, marginTop: 20, padding: 10 }}>Dashboard</Text>

        <Text style={{ fontSize: 20, marginBottom: 10, padding: 10 }}>Joined activities</Text>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
          <Text style={{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>All Of Joined</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent1}
              radius={50}
              borderWidth={8}
              color="#F44336"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent1 + '%'}</Text>
            </ProgressCircle>
            <Text>Learning</Text>
          </View>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent2}
              radius={50}
              borderWidth={8}
              color="#2196F3"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent2 + '%'}</Text>
            </ProgressCircle>
            <Text>Volunteer</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent3}
              radius={50}
              borderWidth={8}
              color="#FFEB3B"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent3 + '%'}</Text>
            </ProgressCircle>
            <Text>Recreation</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent4}
              radius={50}
              borderWidth={8}
              color="#ff71ce"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent4 + '%'}</Text>
            </ProgressCircle>
            <Text>Hangout</Text>
          </View>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent5}
              radius={50}
              borderWidth={8}
              color="#4CAF50"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent5 + '%'}</Text>
            </ProgressCircle>
            <Text>Travel</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent6}
              radius={50}
              borderWidth={8}
              color="#FF9800"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent6 + '%'}</Text>
            </ProgressCircle>
            <Text>Hobby</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent7}
              radius={50}
              borderWidth={8}
              color="#b967ff"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent7 + '%'}</Text>
            </ProgressCircle>
            <Text>Meet</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.percent8}
              radius={50}
              borderWidth={8}
              color="#7fffd4"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.percent8 + '%'}</Text>
            </ProgressCircle>
            <Text>Eat&Drink</Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10, padding: 10 }}>Created activities</Text>
        <View style={{ marginTop: 40, alignItems: 'center' }}>

          <PieChart
            chart_wh={chart_wh}
            series={seriesCreate}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
          <Text style={{ marginTop: 10, alignItems: 'center' }}>All Of Created</Text>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent1}
              radius={50}
              borderWidth={8}
              color="#F44336"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent1 + '%'}</Text>
            </ProgressCircle>
            <Text>Learning</Text>
          </View>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent2}
              radius={50}
              borderWidth={8}
              color="#2196F3"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent2 + '%'}</Text>
            </ProgressCircle>
            <Text>Volunteer</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent3}
              radius={50}
              borderWidth={8}
              color="#FFEB3B"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent3 + '%'}</Text>
            </ProgressCircle>
            <Text>Recreation</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent4}
              radius={50}
              borderWidth={8}
              color="#ff71ce"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent4 + '%'}</Text>
            </ProgressCircle>
            <Text>Hangout</Text>
          </View>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent5}
              radius={50}
              borderWidth={8}
              color="#4CAF50"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent5 + '%'}</Text>
            </ProgressCircle>
            <Text>Travel</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent6}
              radius={50}
              borderWidth={8}
              color="#FF9800"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent6 + '%'}</Text>
            </ProgressCircle>
            <Text>Hobby</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent7}
              radius={50}
              borderWidth={8}
              color="#b967ff"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent7 + '%'}</Text>
            </ProgressCircle>
            <Text>Meet</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={this.state.createpercent8}
              radius={50}
              borderWidth={8}
              color="#7fffd4"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.createpercent8 + '%'}</Text>
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
export default UserDashboard;

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
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStylenoFollow: {
    paddingHorizontal: 30,
    backgroundColor: '#fe53bb',
    justifyContent: 'flex-end',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
  buttonStyleFollow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
});
