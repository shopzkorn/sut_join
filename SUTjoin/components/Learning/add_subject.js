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
    Picker,
    AsyncStorage,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

class add_subject extends Component {
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
      }
      state = {
        user_id:'',

        subject_id:'',

      }

      componentWillMount() {
        AsyncStorage.multiGet(['user_id']).then((data) => {
          let user_id = data[0][1];
          this.setState({
            user_id: user_id,
          });
          console.log("L-ID :"+user_id);
      });
      }

      AddSubject = () => {
        const { navigate } = this.props.navigation;
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/addSubject.php', {
          
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
            navigate('manage_subject')
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

                <Text style={{ fontSize: theme.sizes.font * 1.4 ,marginBottom:25,fontWeight: 'bold'}}>Add Course</Text>

                <Text style={{ fontSize: 16,marginTop:20,marginBottom:50,marginLeft:20}}>Enter your course</Text>
                <View style={[ styles.row_underline, { marginBottom:16,}]}>
                    <TextInput placeholder="Course code"
                    value={this.state.subject_id}
                    onChangeText={subject_id => this.setState({ subject_id })}
                    placeholderTextColor="#fff"
                    underlineColorAndroid='transparent'
                    style={{ color: '#ff1694', flex:0.7, fontSize:16, paddingLeft:12,textAlign:'center'}}
                />
                </View>
                    {/* <TouchableOpacity onPress={this.AddSubject}
                    style={{flex:0.2 , backgroundColor: '#ff1694', borderRadius:5, padding: 25,marginTop:200}}>
                        <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>Save</Text>
                    </TouchableOpacity> */}
                <View style={{marginTop:50,marginBottom:20}}>
                    <TouchableOpacity style={[
                      styles.buttonStyleFollow,
                      styles.centerEverything]}
                      activeOpacity={0.5}
                      onPress={this.AddSubject}
                    >
                      <Text style={{
                        color:"#fe53bb",
                        fontSize: 20,
                        paddingVertical:5,
                        fontWeight: 'bold'
                      }}>Save Course</Text>
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
      justifyContent: 'center',
      alignItems: 'center',
      padding:30
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

  export default add_subject;