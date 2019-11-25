import React, { Component } from "react";
import { Button, View,Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      chosendate:''
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
    this.setState({ isDateTimePickerVisible: true ,
    chosendate: moment(datetime).format('MMMM, Do YYYY HH:mm')});

  };

  render() {
    return (
      <>
  <Text>{this.state.chosendate}</Text>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'datetime'}
          is24Hour={false}
        />
      </>
    );
  }
}