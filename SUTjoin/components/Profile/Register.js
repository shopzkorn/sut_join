import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    Picker,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MultiSlider from '@ptomasroos/react-native-multi-slider';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
        Name:'',Surname:'',Username: '', Password: '', Email: '', Phone: '', Gender: '1', Status: '1',
        sliderOneChanging: false,
        sliderOneValue: [1],
        };
      }

    register() {
        const {navigate} = this.props.navigation;
      fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Register.php', {
        // fetch('http://localhost:8080/Web_SUTJoin/include/Register.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        name : this.state.Name,
        surname : this.state.Surname,
        username : this.state.Username,
        password : this.state.Password,
        email : this.state.Email,
        phone : this.state.Phone,
        gender : this.state.Gender,
        status : this.state.Status,
        age : this.state.sliderOneValue[0],
      })
      }).then((response) => response.text())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        navigate('Login', { usernamereg: username ,passwordreg: password})
      }).catch((error) => {
        console.error(error);
      });
  
    }

    sliderOneValuesChangeStart = () => {
        this.setState({
          sliderOneChanging: true,
        });
      };
      sliderOneValuesChange = values => {
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
          sliderOneValue: newValues,
        });
      };
    
      sliderOneValuesChangeFinish = () => {
        this.setState({
          sliderOneChanging: false,
        });
      };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Register</Text>
                
                <View>
                    <TextInput 
                    style={styles.inputbox}
                    placeholder='Name'
                    placeholderTextColor='#808080'
                    value={this.state.Name}
                    onChangeText={Name => this.setState({ Name })}
                    />
                    <TextInput 
                    style={styles.inputbox}
                    placeholder='Surname'
                    placeholderTextColor='#808080'
                    value={this.state.Surname}
                    onChangeText={Surname => this.setState({ Surname })}
                    />
                    <TextInput 
                    style={styles.inputbox}
                    placeholder='Username'
                    placeholderTextColor='#808080'
                    value={this.state.Username}
                    onChangeText={Username => this.setState({ Username })}
                    />
                <TextInput 
                    style={styles.inputbox}
                    placeholder='Password'
                    placeholderTextColor='#808080'
                    secureTextEntry={true}
                    value={this.state.Password}
                    onChangeText={Password => this.setState({ Password })}
                    />
                <TextInput 
                    style={styles.inputbox}
                    placeholder='Email'
                    placeholderTextColor='#808080'
                    value={this.state.Email}
                    onChangeText={Email => this.setState({ Email })}
                    />
                <TextInput 
                    style={styles.inputbox}
                    placeholder='Phone'
                    placeholderTextColor='#808080'
                    value={this.state.Phone}
                    onChangeText={Phone => this.setState({ Phone })}
                    />
                <View style={{flexDirection: 'row',}}>  
                <Text>Gender</Text>
                <Picker
                    style={{height: 250,width: 100, alignContent:'center',}}
                    selectedValue={this.state.Gender}
                    onValueChange={(itemValue,itemIndex) => this.setState({Gender:itemValue})}
                    >
                    <Picker.Item label="Male" value="1"/>
                    <Picker.Item label="Female" value="2" />
                </Picker>
                <Text>Status</Text>
                <Picker
                    style={{height: 250,width: 140, alignContent:'center',}}
                    selectedValue={this.state.Status}
                    onValueChange={(itemValue,itemIndex) => this.setState({Status:itemValue})}
                    >
                    <Picker.Item label="Student" value="1"/>
                    <Picker.Item label="Teacher" value="2" />
                    <Picker.Item label= "Personel" value="3"/>
                    <Picker.Item label= "General Public" value="4"/>
                </Picker>
                </View>
                <View style={styles.sliderOne}>
                    <Text>Age </Text>
                    <Text
                        style={[
                        styles.text,
                        ]}
                    >
                    {this.state.sliderOneValue}
                    </Text>
                </View>
                    <MultiSlider
                        values={this.state.sliderOneValue}
                        sliderLength={300}
                        onValuesChangeStart={this.sliderOneValuesChangeStart}
                        onValuesChange={this.sliderOneValuesChange}
                        onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                        min={1}
                        max={100}
                        />

                {/* <TextInput 
                    style={styles.inputbox}
                    placeholder='Student ID'
                    placeholderTextColor='#808080'
                    />

                <TextInput 
                    style={styles.inputbox}
                    placeholder='GPAX'
                    placeholderTextColor='#808080'
                    /> */}
                </View>
                <TouchableOpacity style={styles.button} onPress={this.register.bind(this)}>
                    <Text style={styles.buttontext}> Register </Text>
                </TouchableOpacity>
                <View>
                </View>
            </View>
        );
    }
}
export default Register;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC0CB',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputbox: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 25,
        fontSize: 16,
        // paddingLeft: 50,
        paddingHorizontal: 60,
        margin: 10,
    },
    textTitle: {
        fontSize: 40,
    },
    text: {
        fontSize: 16,
    },
    buttontext: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: 'rgba(255,105,180,1.0)',
        borderRadius: 25,
        paddingVertical: 16
    },
    signuptext: {
        fontSize: 40,
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
});