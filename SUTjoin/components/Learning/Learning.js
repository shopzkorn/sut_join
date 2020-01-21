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
    TouchableOpacity,
    ScrollView,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

import ProgressCircle from 'react-native-progress-circle';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Spinner from 'react-native-loading-spinner-overlay';
class Learning extends Component {
    
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        
      }
      state = {
        gpax:0,
        credit:0,

        gpa_1_1:0,
        gpa_1_2:0,
        gpa_1_3:0,

        gpa_2_1:0,
        gpa_2_2:0,
        gpa_2_3:0,

        gpa_3_1:0,
        gpa_3_2:0,
        gpa_3_3:0,

        gpa_4_1:0,
        gpa_4_2:0,
        gpa_4_3:0,

        gpa_5_1:0,
        gpa_5_2:0,
        gpa_5_3:0,

        gpa_6_1:0,
        gpa_6_2:0,
        gpa_6_3:0,

        gpa_7_1:0,
        gpa_7_2:0,
        gpa_7_3:0,

        gpa_8_1:0,
        gpa_8_2:0,
        gpa_8_3:0,

        per_gpa_1_1:0,
        per_gpa_1_2:0,
        per_gpa_1_3:0,

        per_gpa_2_1:0,
        per_gpa_2_2:0,
        per_gpa_2_3:0,

        per_gpa_3_1:0,
        per_gpa_3_2:0,
        per_gpa_3_3:0,

        per_gpa_4_1:0,
        per_gpa_4_2:0,
        per_gpa_4_3:0,

        per_gpa_5_1:0,
        per_gpa_5_2:0,
        per_gpa_5_3:0,

        per_gpa_6_1:0,
        per_gpa_6_2:0,
        per_gpa_6_3:0,

        per_gpa_7_1:0,
        per_gpa_7_2:0,
        per_gpa_7_3:0,

        per_gpa_8_1:0,
        per_gpa_8_2:0,
        per_gpa_8_3:0,

    per_gpax: 0,
    per_gpa1: 0,
    per_gpa2: 0,
    per_gpa3: 0,
    per_gpa4: 0,

      }
      
      componentWillMount() {
        AsyncStorage.multiGet(['user_id']).then((data) => {
          let user_id = data[0][1];
          this.setState({
            user_id: user_id,
          });
          console.log("Learbibg-ID :"+user_id);

          this.Getgpa();
      });
  }



      Getgpa() {
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Getgpa.php', {
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
                this.setState({gpa_1_1: responseJson[0],});
                this.setState({gpa_1_2: responseJson[1],});
                this.setState({gpa_1_3: responseJson[2],});

                this.setState({gpa_2_1: responseJson[3],});
                this.setState({gpa_2_2: responseJson[4],});
                this.setState({gpa_2_3: responseJson[5],});

                this.setState({gpa_3_1: responseJson[6],});
                this.setState({gpa_3_2: responseJson[7],});
                this.setState({gpa_3_3: responseJson[8],});

                this.setState({gpa_4_1: responseJson[9],});
                this.setState({gpa_4_2: responseJson[10],});
                this.setState({gpa_4_3: responseJson[11],});

                this.setState({gpa_5_1: responseJson[12],});
                this.setState({gpa_5_2: responseJson[13],});
                this.setState({gpa_5_3: responseJson[14],});

                this.setState({gpa_6_1: responseJson[15],});
                this.setState({gpa_6_2: responseJson[16],});
                this.setState({gpa_6_3: responseJson[17],});

                this.setState({gpa_7_1: responseJson[18],});
                this.setState({gpa_7_2: responseJson[19],});
                this.setState({gpa_7_3: responseJson[20],});

                this.setState({gpa_8_1: responseJson[21],});
                this.setState({gpa_8_2: responseJson[22],});
                this.setState({gpa_8_3: responseJson[23],});

                this.setState({gpax: responseJson[24],});

                this.setState({per_gpax: (responseJson[24]*100)/4,});

                this.setState({per_gpa_1_1: (responseJson[0]*100)/4,});
                this.setState({per_gpa_1_2: (responseJson[1]*100)/4,});
                this.setState({per_gpa_1_3: (responseJson[2]*100)/4,});

                this.setState({per_gpa_2_1: (responseJson[3]*100)/4,});
                this.setState({per_gpa_2_2: (responseJson[4]*100)/4,});
                this.setState({per_gpa_2_3: (responseJson[5]*100)/4,});

                this.setState({per_gpa_3_1: (responseJson[6]*100)/4,});
                this.setState({per_gpa_3_2: (responseJson[7]*100)/4,});
                this.setState({per_gpa_3_3: (responseJson[8]*100)/4,});

                this.setState({per_gpa_4_1: (responseJson[9]*100)/4,});
                this.setState({per_gpa_4_2: (responseJson[10]*100)/4,});
                this.setState({per_gpa_4_3: (responseJson[11]*100)/4,});

                this.setState({per_gpa_5_1: (responseJson[12]*100)/4,});
                this.setState({per_gpa_5_2: (responseJson[13]*100)/4,});
                this.setState({per_gpa_5_3: (responseJson[14]*100)/4,});

                this.setState({per_gpa_6_1: (responseJson[15]*100)/4,});
                this.setState({per_gpa_6_2: (responseJson[16]*100)/4,});
                this.setState({per_gpa_6_3: (responseJson[17]*100)/4,});

                this.setState({per_gpa_7_1: (responseJson[18]*100)/4,});
                this.setState({per_gpa_7_2: (responseJson[19]*100)/4,});
                this.setState({per_gpa_7_3: (responseJson[20]*100)/4,});

                this.setState({per_gpa_8_1: (responseJson[21]*100)/4,});
                this.setState({per_gpa_8_2: (responseJson[22]*100)/4,});
                this.setState({per_gpa_8_3: (responseJson[23]*100)/4,});

          })
          .catch((error) => {
            console.error(error);
          });
      }

    Circle_gpax = () => {
        if(this.state.gpax != 0){
        return (
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
            </View>
        )}else{
            <View style={{marginRight: 20,alignItems: 'center'}}>
                <Text style={{marginTop: 25,}}>Go to GPA Manage And Enter your gpax</Text>
            </View>
        }
      }

      Circle_gpa_1_1 = () => {
          if(this.state.per_gpa_1_1 != 0){
          return (
            <View style={{alignItems:'center' ,marginRight:30}}>
            <AnimatedCircularProgress
                size={100}
                width={15}
                fill={this.state.per_gpa_1_1}
                tintColor="#FF1493"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875" />
            <Text>Term 1 : {this.state.gpa_1_1}</Text>
            </View>
          )
        }
      }

      Circle_gpa_1_2 = () => {
        if(this.state.per_gpa_1_2 != 0){
        return (
          <View style={{alignItems:'center' ,marginRight:30}}>
          <AnimatedCircularProgress
              size={100}
              width={15}
              fill={this.state.per_gpa_1_2}
              tintColor="#FF1493"
              // onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875" />
          <Text>Term 2 : {this.state.gpa_1_2}</Text>
          </View>
        )
      }
    }

    Circle_gpa_1_3 = () => {
        if(this.state.per_gpa_1_3 != 0){
        return (
          <View style={{alignItems:'center' ,marginRight:30}}>
          <AnimatedCircularProgress
              size={100}
              width={15}
              fill={this.state.per_gpa_1_3}
              tintColor="#FF1493"
              // onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875" />
          <Text>Term 3 : {this.state.gpa_1_3}</Text>
          </View>
        )
      }
    }

    Circle_gpa_2_1 = () => {
        if(this.state.per_gpa_2_1 != 0){
        return (
          <View style={{alignItems:'center' ,marginRight:30}}>
          <AnimatedCircularProgress
              size={100}
              width={15}
              fill={this.state.per_gpa_2_1}
              tintColor="#FF1493"
              // onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875" />
          <Text>Term 1 : {this.state.gpa_2_1}</Text>
          </View>
        )
      }
    }

    Circle_gpa_2_2 = () => {
      if(this.state.per_gpa_2_2 != 0){
      return (
        <View style={{alignItems:'center' ,marginRight:30}}>
        <AnimatedCircularProgress
            size={100}
            width={15}
            fill={this.state.per_gpa_2_2}
            tintColor="#FF1493"
            // onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875" />
        <Text>Term 2 : {this.state.gpa_2_2}</Text>
        </View>
      )
    }
  }

  Circle_gpa_2_3 = () => {
      if(this.state.per_gpa_2_3 != 0){
      return (
        <View style={{alignItems:'center' ,marginRight:30}}>
        <AnimatedCircularProgress
            size={100}
            width={15}
            fill={this.state.per_gpa_2_3}
            tintColor="#FF1493"
            // onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875" />
        <Text>Term 3 : {this.state.gpa_2_3}</Text>
        </View>
      )
    }
  }

  Circle_gpa_3_1 = () => {
    if(this.state.per_gpa_3_1 != 0){
    return (
      <View style={{alignItems:'center' ,marginRight:30}}>
      <AnimatedCircularProgress
          size={100}
          width={15}
          fill={this.state.per_gpa_3_1}
          tintColor="#FF1493"
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875" />
      <Text>Term 1 : {this.state.gpa_3_1}</Text>
      </View>
    )
  }
}

Circle_gpa_3_2 = () => {
  if(this.state.per_gpa_3_2 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_3_2}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 2 : {this.state.gpa_3_2}</Text>
    </View>
  )
}
}

Circle_gpa_3_3 = () => {
  if(this.state.per_gpa_3_3 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_3_3}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 3 : {this.state.gpa_3_3}</Text>
    </View>
  )
}
}

Circle_gpa_4_1 = () => {
    if(this.state.per_gpa_4_1 != 0){
    return (
      <View style={{alignItems:'center' ,marginRight:30}}>
      <AnimatedCircularProgress
          size={100}
          width={15}
          fill={this.state.per_gpa_4_1}
          tintColor="#FF1493"
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875" />
      <Text>Term 1 : {this.state.gpa_4_1}</Text>
      </View>
    )
  }
}

Circle_gpa_4_2 = () => {
  if(this.state.per_gpa_4_2 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_4_2}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 2 : {this.state.gpa_4_2}</Text>
    </View>
  )
}
}

Circle_gpa_4_3 = () => {
  if(this.state.per_gpa_4_3 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_4_3}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 3 : {this.state.gpa_4_3}</Text>
    </View>
  )
}
}

Circle_gpa_5_1 = () => {
    if(this.state.per_gpa_5_1 != 0){
    return (
      <View style={{alignItems:'center' ,marginRight:30}}>
      <AnimatedCircularProgress
          size={100}
          width={15}
          fill={this.state.per_gpa_5_1}
          tintColor="#FF1493"
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875" />
      <Text>Term 1 : {this.state.gpa_5_1}</Text>
      </View>
    )
  }
}

Circle_gpa_5_2 = () => {
  if(this.state.per_gpa_5_2 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_5_2}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 2 : {this.state.gpa_5_2}</Text>
    </View>
  )
}
}

Circle_gpa_5_3 = () => {
  if(this.state.per_gpa_5_3 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_5_3}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 3 : {this.state.gpa_5_3}</Text>
    </View>
  )
}
}

Circle_gpa_6_1 = () => {
  if(this.state.per_gpa_6_1 != 0){
  return (
    <View style={{alignItems:'center' ,marginRight:30}}>
    <AnimatedCircularProgress
        size={100}
        width={15}
        fill={this.state.per_gpa_6_1}
        tintColor="#FF1493"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />
    <Text>Term 1 : {this.state.gpa_6_1}</Text>
    </View>
  )
}
}

Circle_gpa_6_2 = () => {
if(this.state.per_gpa_6_2 != 0){
return (
  <View style={{alignItems:'center' ,marginRight:30}}>
  <AnimatedCircularProgress
      size={100}
      width={15}
      fill={this.state.per_gpa_6_2}
      tintColor="#FF1493"
      // onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#3d5875" />
  <Text>Term 2 : {this.state.gpa_6_2}</Text>
  </View>
)
}
}

Circle_gpa_6_3 = () => {
if(this.state.per_gpa_6_3 != 0){
return (
  <View style={{alignItems:'center' ,marginRight:30}}>
  <AnimatedCircularProgress
      size={100}
      width={15}
      fill={this.state.per_gpa_6_3}
      tintColor="#FF1493"
      // onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#3d5875" />
  <Text>Term 3 : {this.state.gpa_6_3}</Text>
  </View>
)
}
}

Circle_gpa_7_1 = () => {
if(this.state.per_gpa_7_1 != 0){
return (
<View style={{alignItems:'center' ,marginRight:30}}>
<AnimatedCircularProgress
    size={100}
    width={15}
    fill={this.state.per_gpa_7_1}
    tintColor="#FF1493"
    // onAnimationComplete={() => console.log('onAnimationComplete')}
    backgroundColor="#3d5875" />
<Text>Term 1 : {this.state.gpa_7_1}</Text>
</View>
)
}
}

Circle_gpa_7_2 = () => {
if(this.state.per_gpa_7_2 != 0){
return (
<View style={{alignItems:'center' ,marginRight:30}}>
<AnimatedCircularProgress
  size={100}
  width={15}
  fill={this.state.per_gpa_7_2}
  tintColor="#FF1493"
  // onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
<Text>Term 2 : {this.state.gpa_7_2}</Text>
</View>
)
}
}

Circle_gpa_7_3 = () => {
if(this.state.per_gpa_7_3 != 0){
return (
<View style={{alignItems:'center' ,marginRight:30}}>
<AnimatedCircularProgress
  size={100}
  width={15}
  fill={this.state.per_gpa_7_3}
  tintColor="#FF1493"
  // onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
<Text>Term 3 : {this.state.gpa_7_3}</Text>
</View>
)
}
}

Circle_gpa_8_1 = () => {
if(this.state.per_gpa_8_1 != 0){
return (
<View style={{alignItems:'center' ,marginRight:30}}>
<AnimatedCircularProgress
    size={100}
    width={15}
    fill={this.state.per_gpa_8_1}
    tintColor="#FF1493"
    // onAnimationComplete={() => console.log('onAnimationComplete')}
    backgroundColor="#3d5875" />
<Text>Term 1 : {this.state.gpa_8_1}</Text>
</View>
)
}
}

Circle_gpa_8_2 = () => {
if(this.state.per_gpa_8_2 != 0){
return (
<View style={{alignItems:'center' ,marginRight:30}}>
<AnimatedCircularProgress
  size={100}
  width={15}
  fill={this.state.per_gpa_8_2}
  tintColor="#FF1493"
  // onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
<Text>Term 2 : {this.state.gpa_8_2}</Text>
</View>
)
}
}

Circle_gpa_8_3 = () => {
if(this.state.per_gpa_8_3 != 0){
return (
<View style={{alignItems:'center' ,marginRight:30}}>
<AnimatedCircularProgress
  size={100}
  width={15}
  fill={this.state.per_gpa_8_3}
  tintColor="#FF1493"
  // onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
<Text>Term 3 : {this.state.gpa_8_3}</Text>
</View>
)
}
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
                contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
                >
                <View style={styles.container}>

                
                
                <Text style={{ fontSize: 25 , marginBottom:30}}>Learning</Text>

                {this.Circle_gpax()}
                
                    <View style={styles.row}>
                        {this.Circle_gpa_1_1()}
                        {this.Circle_gpa_1_2()}
                        {this.Circle_gpa_1_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_2_1()}
                        {this.Circle_gpa_2_2()}
                        {this.Circle_gpa_2_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_3_1()}
                        {this.Circle_gpa_3_2()}
                        {this.Circle_gpa_3_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_4_1()}
                        {this.Circle_gpa_4_2()}
                        {this.Circle_gpa_4_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_5_1()}
                        {this.Circle_gpa_5_2()}
                        {this.Circle_gpa_5_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_6_1()}
                        {this.Circle_gpa_6_2()}
                        {this.Circle_gpa_6_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_7_1()}
                        {this.Circle_gpa_7_2()}
                        {this.Circle_gpa_7_3()}
                    </View>
                    <View style={styles.row}>
                        {this.Circle_gpa_8_1()}
                        {this.Circle_gpa_8_2()}
                        {this.Circle_gpa_8_3()}
                    </View>

                        {/* <TouchableOpacity onPress={() => navigate('manage_gpa')}
                        style={{flex:1 , backgroundColor: '#ff1694', borderRadius:5, padding: 30}}>
                            <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>GPAX Manage</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('manage_subject')}
                        style={{flex:1 , backgroundColor: '#ff1694', borderRadius:5, padding: 30, marginTop: 10}}>
                            <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>Subject Manage</Text>
                        </TouchableOpacity> */}
                        
                        <View style={{marginTop:10}}>
                          <TouchableOpacity style={[
                            styles.buttonStyleFollow,
                            styles.centerEverything]}
                            activeOpacity={0.5}
                            onPress={() => navigate('manage_gpa')}
                          >
                            <Text style={{
                              color:"#fe53bb",
                              fontSize: 16,
                              paddingVertical:5,
                              fontWeight: 'bold'
                            }}> GPAX Manage</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{marginTop:10}}>
                          <TouchableOpacity style={[
                            styles.buttonStyleFollow,
                            styles.centerEverything]}
                            activeOpacity={0.5}
                            onPress={() => navigate('manage_subject')}
                          >
                            <Text style={{
                              color:"#fe53bb",
                              fontSize: 16,
                              paddingVertical:5,
                              fontWeight: 'bold'
                            }}>Subject Manage</Text>
                          </TouchableOpacity>
                        </View>
                        {/* <Button
                        title="GPA Manage"
                        onPress={() => navigate('manage_gpa')}
                        />
                        <Button
                            title="Add Course"
                            onPress={() => navigate('add_subject')}
                        /> */}
                    {/* <View style={{marginTop:30}}>
                        <Button
                        title="Course Manage"
                        onPress={() => navigate('manage_subject')}
                        />
                    </View> */}
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
      flexDirection: 'row',
      marginTop:10,
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
  });

export default Learning;