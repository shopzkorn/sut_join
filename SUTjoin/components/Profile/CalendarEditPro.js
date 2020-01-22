import { Calendar, Arrow } from 'react-native-calendars';
import { View, Text ,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from 'react-native-search-bar';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');
export default class Example extends React.Component {
    state = {
        date: '',
        dataSource:'',
        chooseday:''
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: (

                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
                        <Text style={{ fontSize: width / 20, fontWeight: 'bold', color: '#ffffff', alignSelf: 'center' }}>
                            Calendar
            </Text>
                    </View>
                </View>
            ),
            headerTransparent: true,
        }
    }
    returnDate = () => {
        this.props.navigation.state.params.onNavigateBack(this.state.chooseday);
        this.props.navigation.goBack();
    }
    _renderArrow = (direction) => {
        if (direction === 'left') {
            return <Ionicons name="ios-arrow-back" color={theme.colors.black} size={theme.sizes.font * 1.5} />
        } else {
            return <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
        }
    }
    onChangeText(e) {
        this.setState({
            dataSource: e
        });
        console.log(this.state.dataSource);
    }


    onCancelButtonPress() {
        this.setState({
            dataSource: 3,
        });
    }

    onSearchButtonPress() {
        let day = this.state.dataSource.split('-')[0];
        let month = this.state.dataSource.split('-')[1];
        let year = this.state.dataSource.split('-')[2];
        let chooseDay = year+'-'+month+'-'+day
        console.log(chooseDay);
        this.setState({
            date: chooseDay,
            chooseday: chooseDay,
        });
        

    }
    componentDidMount() {
        let date = Date();
        this.setState({
            date : date
        })
    }
    render() {
        let dates = this.state.chooseday
        console.log(Date())
        return (
            <LinearGradient
        colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={{ flex: 1 }}>
             <SearchBar
                        ref="search1"
                        barStyle="black"
                        placeholder='day-month-year'
                        onChangeText={this.onChangeText.bind(this)}
                        onCancelButtonPress={this.onCancelButtonPress.bind(this)}
                        onSearchButtonPress={this.onSearchButtonPress.bind(this)}
                    />
            <View style={{   backgroundColor: 'rgba(0,0,0,0.1)', }}>
                
                <Calendar
                    // Initially visible month. Default = Date()
                    current={this.state.date}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'1972-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={Date()}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { 
                        this.setState({
                        date: day.dateString,
                        chooseday: day.dateString,
                    }); }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected longday', day) }}
                    // Month format in calendar title. Formatting values: https://arshaw.com/xdate/#Formatting
                    monthFormat={'MMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={this._renderArrow}
                    // Do not show days of other months in month page. Default = false
                    //   hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    //   disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={0}
                    // Hide day names. Default = false
                    //   hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    //   showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}

                    markedDates={{
                        [dates] : {selected: true, selectedColor: '#fe53bb'},
                      }}
                      theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#fe53bb',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: '#fe53bb',
                        indicatorColor: 'blue',
                        // textDayFontFamily: 'monospace',
                        // textMonthFontFamily: 'monospace',
                        // textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                      }}
                />
            </View>
            <View style={{justifyContent:'flex-end',alignItems: 'center',marginTop:20}}>
            <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]}
                activeOpacity={0.5}
                onPress={this.returnDate.bind(this)}
              >
                <Text style={{
                  color:"#fe53bb",
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Done</Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    
    centerEverything: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonStyleFollow: {
      paddingHorizontal: 30,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 2.5,
      borderColor: '#fe53bb',
      height:height/15,
      width:width/3
    },
    highlight: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10
    },
     back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
  });