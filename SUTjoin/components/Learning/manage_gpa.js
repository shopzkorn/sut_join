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
    Button,
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
        gpax:0,

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

        moreClass:0,

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
                this.setState({
                  gpa_1_1: responseJson[0],
                  gpa_1_2: responseJson[1],
                  gpa_1_3: responseJson[2],
                  gpa_2_1: responseJson[3],
                  gpa_2_2: responseJson[4],
                  gpa_2_3: responseJson[5],
                  gpa_3_1: responseJson[6],
                  gpa_3_2: responseJson[7],
                  gpa_3_3: responseJson[8],
                  gpa_4_1: responseJson[9],
                  gpa_4_2: responseJson[10],
                  gpa_4_3: responseJson[11],
                })

                this.setState({gpa_5_1: responseJson[12],}),
                this.setState({gpa_5_2: responseJson[13],});
                this.setState({gpa_5_3: responseJson[14],}),

                this.setState({gpa_6_1: responseJson[15],});
                this.setState({gpa_6_2: responseJson[16],}),
                this.setState({gpa_6_3: responseJson[17],});

                this.setState({gpa_7_1: responseJson[18],}),
                this.setState({gpa_7_2: responseJson[19],});
                this.setState({gpa_7_3: responseJson[20],}),

                this.setState({gpa_8_1: responseJson[21],});
                this.setState({gpa_8_2: responseJson[22],}),
                this.setState({gpa_8_3: responseJson[23],});

                this.setState({gpax: responseJson[24],});

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

            gpa_5_1: this.state.gpa_5_1,
            gpa_5_2: this.state.gpa_5_2,
            gpa_5_3: this.state.gpa_5_3,

            gpa_6_1: this.state.gpa_6_1,
            gpa_6_2: this.state.gpa_6_2,
            gpa_6_3: this.state.gpa_6_3,

            gpa_7_1: this.state.gpa_7_1,
            gpa_7_2: this.state.gpa_7_2,
            gpa_7_3: this.state.gpa_7_3,

            gpa_8_1: this.state.gpa_8_1,
            gpa_8_2: this.state.gpa_8_2,
            gpa_8_3: this.state.gpa_8_3,

            gpax: this.state.gpax,

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

          onSetMoreClass = () => {
            if(this.state.moreClass == 0){
              this.setState({ moreClass: 1 })
            } else if (this.state.moreClass != 0){
              this.setState({ moreClass: 0 })
            }
          };

          MoreClassBtn = () => {
            if(this.state.moreClass == 0){
              return (
              // <TouchableOpacity  onPress={this.onSetMoreClass}
              //   style={{flex:1 , backgroundColor: '#fff', borderRadius:5, padding: 25,marginTop:30}}>
              //       <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#ff1694' }}>More Term</Text>
              // </TouchableOpacity>
              <View style={{marginTop:10}}>
                    <TouchableOpacity style={[
                      styles.buttonStyleFollow,
                      styles.centerEverything]}
                      activeOpacity={0.5}
                      onPress={this.onSetMoreClass}
                    >
                      <Text style={{
                        color:"#fe53bb",
                        fontSize: 20,
                        paddingVertical:5,
                        fontWeight: 'bold'
                      }}> More Term </Text>
                    </TouchableOpacity>
              </View>
              )
            }else{
              return (
                // <TouchableOpacity  onPress={this.onSetMoreClass}
                //   style={{flex:1 , backgroundColor: '#fff', borderRadius:5, padding: 25,marginTop:30}}>
                //       <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#ff1694' }}>4 Term Study</Text>
                // </TouchableOpacity>
                <View style={{marginTop:10}}>
                    <TouchableOpacity style={[
                      styles.buttonStyleFollow,
                      styles.centerEverything]}
                      activeOpacity={0.5}
                      onPress={this.onSetMoreClass}
                    >
                      <Text style={{
                        color:"#fe53bb",
                        fontSize: 20,
                        paddingVertical:5,
                        fontWeight: 'bold'
                      }}>Less than 4 terms</Text>
                    </TouchableOpacity>
              </View>
              )
            }
            
          }

          MoreClass = () => {
            if(this.state.moreClass == 1){
              return (
                <View style={styles.container}>
                  <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>5st year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_5_1}
                    onChangeText={gpa_5_1 => this.setState({ gpa_5_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_5_2}
                    onChangeText={gpa_5_2 => this.setState({ gpa_5_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_5_3}
                    onChangeText={gpa_5_3 => this.setState({ gpa_5_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>6st year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_6_1}
                    onChangeText={gpa_6_1 => this.setState({ gpa_6_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_6_2}
                    onChangeText={gpa_6_2 => this.setState({ gpa_6_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_6_3}
                    onChangeText={gpa_6_3 => this.setState({ gpa_6_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>7st year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"s
                    value={this.state.gpa_7_1}
                    onChangeText={gpa_7_1 => this.setState({ gpa_7_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_7_2}
                    onChangeText={gpa_7_2 => this.setState({ gpa_7_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_7_3}
                    onChangeText={gpa_7_3 => this.setState({ gpa_7_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>8st year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_8_1}
                    onChangeText={gpa_8_1 => this.setState({ gpa_8_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_8_2}
                    onChangeText={gpa_8_2 => this.setState({ gpa_8_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_8_3}
                    onChangeText={gpa_8_3 => this.setState({ gpa_8_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                </View>
              )
            }
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

                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                  <Text>GPAX: </Text>
                    <TextInput placeholder="GPAX"
                    value={this.state.gpax}
                    onChangeText={gpax => this.setState({ gpax })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>1st year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                  <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_1_1}
                    onChangeText={gpa_1_1 => this.setState({ gpa_1_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder=" gpa term2"
                    value={this.state.gpa_1_2}
                    onChangeText={gpa_1_2 => this.setState({ gpa_1_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_1_3}
                    onChangeText={gpa_1_3 => this.setState({ gpa_1_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>2nd year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_2_1}
                    onChangeText={gpa_2_1 => this.setState({ gpa_2_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_2_2}
                    onChangeText={gpa_2_2 => this.setState({ gpa_2_2 })}
                    placeholderTextCฟolor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_2_3}
                    onChangeText={gpa_2_3 => this.setState({ gpa_2_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>3rd year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_3_1}
                    onChangeText={gpa_3_1 => this.setState({ gpa_3_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_3_2}
                    onChangeText={gpa_3_2 => this.setState({ gpa_3_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_3_3}
                    onChangeText={gpa_3_3 => this.setState({ gpa_3_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:25,marginLeft:20}}>4th year student</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term1: </Text>
                    <TextInput placeholder="gpa term1"
                    value={this.state.gpa_4_1}
                    onChangeText={gpa_4_1 => this.setState({ gpa_4_1 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term2: </Text>
                    <TextInput placeholder="gpa term2"
                    value={this.state.gpa_4_2}
                    onChangeText={gpa_4_2 => this.setState({ gpa_4_2 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                <Text>term3: </Text>
                    <TextInput placeholder="gpa term3"
                    value={this.state.gpa_4_3}
                    onChangeText={gpa_4_3 => this.setState({ gpa_4_3 })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.5, fontSize:16, paddingLeft:12,}}
                    />
                </View>
                {this.MoreClass()}
                {/* <Button
                        title="More Term"
                        onPress={this.onSetMoreClass}
                    /> */}
                {this.MoreClassBtn()}

                {/* <TouchableOpacity  onPress={this.OnSaveGpa}
                style={{flex:1 , backgroundColor: '#ff1694', borderRadius:5, padding: 25,marginTop:30}}>
                    <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>Save</Text>
                </TouchableOpacity> */}
                
                <View style={{marginTop:20}}>
                          <TouchableOpacity style={[
                            styles.buttonStyleFollow,
                            styles.centerEverything]}
                            activeOpacity={0.5}
                            onPress={this.OnSaveGpa}
                          >
                            <Text style={{
                              color:"#fe53bb",
                              fontSize: 20,
                              paddingVertical:5,
                              fontWeight: 'bold'
                            }}> Save </Text>
                          </TouchableOpacity>
                  </View>

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

  export default manage_gpa;