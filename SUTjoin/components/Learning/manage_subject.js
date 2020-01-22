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
    AsyncStorage,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import {
  Content,
  Icon,
  SwipeRow,
  Button,


} from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');


class manage_subject extends Component {
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
      }
      state = {
        user_id:'',

        user_detail: [],

        id_subject_del: '',

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
        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetCourse.php', {
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
              user_detail: responseJson,
              loadingVisible: false
          })
          })
          .catch((error) => {
            console.error(error);
          });

      }

      setDeleteValue(item_id){
        this.setState({ id_subject_del: item_id})
        {this.DeleteSubject()}
      }

      DeleteSubject() {
        const { navigate } = this.props.navigation;
        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/deleteSubject.php', {
          method: 'post',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            user_id: this.state.user_id.split('"')[1],
            id_subject: this.state.id_subject_del,
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            // Showing response message coming from server after inserting records.
            // alert(responseJson);
            console.log(responseJson);
            alert(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
        console.log('delllll'+ this.state.id_subject_del)
        navigate('manage_subject')
      }

      renderFollow = () => {
        if (!this.state.loadingVisible) {
            return (
                <FlatList
                    Vertical
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={[styles.shadow, { overflow: 'visible' }]}
                    data={this.state.user_detail}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({ item, index }) => this.renderDestination(item, index)}
                />
            );
        }
    }

      renderDestination = item => {
        const { navigation } = this.props;
        var grade = ''
        if(item.grade == 0){
          grade = 'F'
        }else if(item.grade == 1){
          grade = 'D'
        }else if(item.grade == 1.5){
          grade = 'D+'
        }else if(item.grade == 2){
          grade = 'C'
        }else if(item.grade == 2.5){
          grade = 'C+'
        }else if(item.grade == 3){
          grade = 'B'
        }else if(item.grade == 3.5){
          grade = 'B+'
        }else if(item.grade == 4){
          grade = 'A'
        }
        return (
            <View style={{justifyContent: 'flex-start'}}>

                    {/* <View style={[styles.row]}>
                        <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                            <Text style={{ color: theme.colors.white, fontWeight: 'bold', fontSize: theme.sizes.padding * 0.4 }}>{item.id_subject} {item.name_subject} [Grade] {item.grade}</Text>
                        </View>
                    </View> */}

                  <SwipeRow
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  
                  left={
                    <Button success onPress={() => Alert.alert(
                      item.id_subject ,
                      item.name_subject+'\n'+
                      "Grade : " + grade+'\n'+
                      "Credit : " + item.credit ,
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      {cancelable: false},
                    )}>
                      <Icon active name="paper" />
                    </Button>
                  }

                  right={
                    <Button danger onPress={() => Alert.alert(
                      'Delete',
                      'Are you delete "' + item.name_subject + '"',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => this.setDeleteValue(item.id_subject)},
                      ],
                      {cancelable: false},
                    )}>
                      <Icon active name="trash" />
                    </Button>
                  }
                  body={
                    <View style={{ paddingLeft: 20 }}>
                      <Text>{item.name_subject}</Text>
                    </View>
                  }
                  />

                <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginRight: 10 }}>
                </View>

            </View>
        )
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
                  <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
              <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
                <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                Course
                </Text>
            </View>
          </View>
                <View style={styles.container1}>
                {this.renderFollow()}
                </View>  
                <View style={styles.container}>
                {/* <TouchableOpacity onPress={() => navigate('add_subject')}
                        style={{ backgroundColor: '#ff1694', borderRadius:5, padding: 30,paddingVertical:20, marginTop: 10, marginBottom:20}}>
                            <Text style={{ alignSelf:"center" , fontSize : 16 , color : '#fff' }}>Add Course</Text>
                </TouchableOpacity> */}

                <View style={{marginTop:10,marginBottom:20}}>
                          <TouchableOpacity style={[
                            styles.buttonStyleFollow,
                            styles.centerEverything]}
                            activeOpacity={0.5}
                            onPress={() => navigate('add_subject')}
                          >
                            <Text style={{
                              color:"#fe53bb",
                              fontSize: 20,
                              paddingVertical:5,
                              fontWeight: 'bold'
                            }}>Add Course</Text>
                          </TouchableOpacity>
                  </View>
                
                {/* <Button
                title="Add Course"
                onPress={() => navigate('add_subject')}
                /> */}
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
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    container1: {
      flex: 1,
      justifyContent: 'flex-start',
      // alignItems: 'center'
    },
    contain:{
      flex: 1,
      justifyContent: 'flex-start',
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
    back: {
      width: theme.sizes.base * 3,
      height: theme.sizes.base * 3,
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: 15
    },
  });

  export default manage_subject;