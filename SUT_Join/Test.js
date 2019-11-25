import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class App extends Component {
  state = {
    date: new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,
    chosendate:''
  }

  setDate = (event, date) => {
    date = date || this.state.date;
   
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      chosendate: moment(datetime).format('MMMM, Do YYYY HH:mm')
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
    this.timepicker();
  }

  timepicker = () => {
    this.show('time');
  }

  render() {
    const { show, date, mode } = this.state;

    return (
      <View>
        <View>
          <Button onPress={this.datepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={this.timepicker} title="Show time picker!" />
        </View>
        { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
        }
      </View>
    );
  }
}