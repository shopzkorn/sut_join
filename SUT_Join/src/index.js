import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, StatusBar, ScrollView, Button } from 'react-native';
import firebase from 'firebase';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import DropDown from 'react-native-dropdown';
import {
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// const {
//     Select,
//     Option,
//     OptionList,
//     updatePosition
//   } = DropDown;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {Title: '', disctiption: '', Tag: '', Location: '', start: '', End: '', Gender: '', Amount: '', agemin: '', agemax: '', sliderOneChanging: false,
            sliderOneValue: [1],
            multiSliderValue: [0, 60],
            nonCollidingMultiSliderValue: [0, 100],
            isDateTimePickerVisible: false,
            chosendate: ''
        };
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (datetime) => {
        console.log("A date has been picked: ", datetime);
        this.setState({
            isDateTimePickerVisible: true,
            chosendate: moment(datetime).format('MMMM, Do YYYY HH:mm')
        });

    };

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

    multiSliderValuesChange = values => {
        this.setState({
            multiSliderValue: values,
        });
    };

    nonCollidingMultiSliderValuesChange = values => {
        this.setState({
            nonCollidingMultiSliderValue: values,
        });
    };

    componentDidMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBrabdxmLofbkHd_udyXIpgiIoZrFnjBhs",
            authDomain: "sut-join.firebaseapp.com",
            databaseURL: "https://sut-join.firebaseio.com",
            projectId: "sut-join",
            storageBucket: "sut-join.appspot.com",
            messagingSenderId: "535754743778"
        };
        // Initialize Firebase
        //firebase.initializeApp(firebaseConfig);
        !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
        //firebase.analytics();
        // console.log(firebase);

    }
    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }
    register(){
        var RandomNumber = Math.floor(Math.random() * 1000) + 1 ;
        const {Title,description,Tag,Location,chosendate,sliderOneValue,multiSliderValue} = this.state;
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${RandomNumber}`).set(
            {
                title: Title,
                description: description,
                Tag: Tag,
                Location: Location,
                chosendate: chosendate,
                Amount: sliderOneValue[0],
                agemin: multiSliderValue[0],
                agemax: multiSliderValue[1],
            }
        ).then(() => {
            console.log('SUC');
            alert('Create event');
        }).catch((error) => {
            console.log(error);
            alert('Fail');
        });
       
    }

    _gender(sex) {

        this.setState({
            ...this.state,
            Gender: sex
        });
    }
    render() {
      
        return (
            <LinearGradient  
            start={{x: 0.0, y: 0.25}} 
            end={{x: 0.5, y: 1.0}}
            locations={[0,0.5,0.6]} 
            colors={['white','pink']} >
            <ScrollView style={styles.scrollView}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    {/* <ImageBackground
                        source={require('../assets/images/background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    > */}
                    <StatusBar
                        barStyle="dark-content"
                        // dark-content, light-content and default
                        hidden={false}
                        //To hide statusBar
                        backgroundColor="#00BCD4"
                        //Background color of statusBar
                        translucent={false}
                        //allowing light, but not detailed shapes
                        networkActivityIndicatorVisible={true}
                    />

                    <Text style={styles.highlight}>
                        Create new event
                </Text>
                    <Text style={styles.highlight}>

                    </Text>
                    <Text style={styles.text}>Title event</Text>
                    <TextInput
                        placeholder='Title'
                        value={this.state.Title}
                        onChangeText={Title => this.setState({ Title })}
                        style={styles.textbox}
                        underlineColorAndroid="transparent"
                        keyboardType={'email-address'}
                    />
                    <Text style={styles.text}>Description event</Text>
                    <TextInput
                        placeholder='Description'
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                        style={styles.input}
                        multiline={true}
                        numberOfLines={5}
                        underlineColorAndroid="transparent"
                        keyboardType={'email-address'}
                    />
                    <Text style={styles.text}>Tag event</Text>
                    <TextInput
                        placeholder='Tag'
                        value={this.state.Tag}
                        onChangeText={Tag => this.setState({ Tag })}
                        style={styles.textbox}
                        underlineColorAndroid="transparent"
                        keyboardType={'email-address'}
                    />
                     <Text style={styles.text}>Location event</Text>
                    <TextInput
                        placeholder='Location'
                        value={this.state.Location}
                        onChangeText={Location => this.setState({ Location })}
                        style={styles.textbox}
                        underlineColorAndroid="transparent"
                        keyboardType={'email-address'}
                    />
                    <Text  style={styles.text}>Date: {this.state.chosendate}</Text>
                    <TouchableOpacity style={styles.button} title="Choose date" onPress={this.showDateTimePicker} >
                    <View>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}> Choose date </Text>
                        </View>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        mode={'datetime'}
                        is24Hour={false}
                    />
                    </TouchableOpacity>
                    <View style={styles.sliderOne}>
                        <Text style={styles.text}>Number of people: </Text>
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
                        sliderLength={280}
                        onValuesChangeStart={this.sliderOneValuesChangeStart}
                        onValuesChange={this.sliderOneValuesChange}
                        onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                        min={1}
                        max={30}
                    />
                    <View style={styles.sliderOne}>
                        <Text style={styles.text}>Age range: </Text>
                        <Text style={styles.text}>{this.state.multiSliderValue[0]} </Text>
                        <Text style={styles.text}> - </Text>
                        <Text style={styles.text}>{this.state.multiSliderValue[1]}</Text>
                    </View>
                    <MultiSlider
                        values={[
                            this.state.multiSliderValue[0],
                            this.state.multiSliderValue[1],
                        ]}
                        sliderLength={280}
                        onValuesChange={this.multiSliderValuesChange}
                        min={0}
                        max={60}
                        step={1}
                        allowOverlap
                        snapped
                    />


                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.register.bind(this)}>
                        <View>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}> Create </Text>
                        </View>
                    </TouchableOpacity>
                    {/* </ImageBackground> */}
                </View>
            </ScrollView>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    scrollView: {
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.black,

    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontSize: 36,
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    input: {
        fontFamily: 'SukhumvitSet-Text',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        fontSize: 18,
        color: '#444444',
        width: '70%',
        paddingLeft: 20,
        // marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        paddingLeft: 50,
    },
    textbox: {
        fontFamily: 'SukhumvitSet-Text',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        fontSize: 18,
        color: '#444444',
        width: '70%',
        height: 50,
        paddingLeft: 20,
        // marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        paddingLeft: 50,
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd13b',
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01d7bf', //#B7BBBB//#DADFDF//#A0C8CB//#83CCD0//#279591
        borderRadius: 10,
        width: '45%',
        height: 50,
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    bgImage: {
        width: '100%',
        height: 1000,
        flex: 1,
        marginHorizontal: -20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        textAlign: 'left',
        alignSelf: 'center',
        paddingVertical: 20,
    },
    dropdown: {
        width: 700,
        height: 50,
        margin: 15,
    },
});