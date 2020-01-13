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
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    onChangeText,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

class manage_gpa extends Component {
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
      }
      state = {
        user_id:'',
        
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

    //   fetchData = async () => {
    //     const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAllDashboard.php');
    //     const users = await response.json();
    //     this.setState({ data: users });
    //   }

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
                this.setState({gpa_1_1: responseJson[0],}),
                this.setState({gpa_1_2: responseJson[1],});
                this.setState({gpa_1_3: responseJson[2],}),

                this.setState({gpa_2_1: responseJson[3],});
                this.setState({gpa_2_2: responseJson[4],}),
                this.setState({gpa_2_3: responseJson[5],});

                this.setState({gpa_3_1: responseJson[6],}),
                this.setState({gpa_3_2: responseJson[7],});
                this.setState({gpa_3_3: responseJson[8],}),

                this.setState({gpa_4_1: responseJson[9],});
                this.setState({gpa_4_2: responseJson[10],}),
                this.setState({gpa_4_3: responseJson[11],});

          })
          .catch((error) => {
            console.error(error);
          });
      }

      OnSaveGpa = () => {
        const { navigate } = this.props.navigation;
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/manage_gpa_pro.php', {
          // fetch('http://localhost:8080/Web_SUTJoin/include/Register.php', {
          method: 'post',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            gpa_1_1: this.state.gpa_1_1,
            gpa_1_2: this.state.gpa_1_2,
            gpa_1_3: this.state.gpa_1_3,

            gpa_2_1: this.state.gpa_2_1,
            gpa_2_2: this.state.gpa_2_2,
            gpa_2_3: this.state.gpa_2_3,

            gpa_3_1: this.state.gpa_3_1,
            gpa_3_2: this.state.gpa_3_2,
            gpa_3_3: this.state.gpa_3_3,

            gpa_4_1: this.state.gpa_4_1,
            gpa_4_2: this.state.gpa_4_2,
            gpa_4_3: this.state.gpa_4_3,

            user_id: this.state.user_id,
          })
        }).then((response) => response.text())
          .then((responseJson) => {
            // Showing response message coming from server after inserting records.
            alert(responseJson);
            navigate('Learning')
          }).catch((error) => {
            console.error(error);
          });
          }

    render() {
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

                <Text style={{ fontSize: theme.sizes.font * 1.4 ,marginBottom:25}}>Manage your GPA</Text>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>1st year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term1"s
                    value={this.state.gpa_1_1}
                    onChangeText={gpa_1_1 => this.setState({ gpa_1_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_1_2}
                    onChangeText={gpa_1_2 => this.setState({ gpa_1_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_1_3}
                    onChangeText={gpa_1_3 => this.setState({ gpa_1_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>2nd year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_2_1}
                    onChangeText={gpa_2_1 => this.setState({ gpa_2_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_2_2}
                    onChangeText={gpa_2_2 => this.setState({ gpa_2_2 })}
                    placeholderTextCฟolor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_2_3}
                    onChangeText={gpa_2_3 => this.setState({ gpa_2_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>3rd year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_3_1}
                    onChangeText={gpa_3_1 => this.setState({ gpa_3_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_3_2}
                    onChangeText={gpa_3_2 => this.setState({ gpa_3_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_3_3}
                    onChangeText={gpa_3_3 => this.setState({ gpa_3_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>4th year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_4_1}
                    onChangeText={gpa_4_1 => this.setState({ gpa_4_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_4_2}
                    onChangeText={gpa_4_2 => this.setState({ gpa_4_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_4_3}
                    onChangeText={gpa_4_3 => this.setState({ gpa_4_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.3, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <TouchableOpacity  onPress={this.OnSaveGpa}
                style={{flex:1 , backgroundColor: '#ff1694', borderRadius:5, padding: 25,marginTop:30}}>
                    <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>Save</Text>
                </TouchableOpacity>
                

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
    //   justifyContent: 'center',
      alignItems: 'center',
      padding:36
    },
    row_underline:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#ff1694'
    }
  });

  export default manage_gpa;