
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Animated } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Triangle } from 'react-native-shapes'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    button: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc9de', //#B7BBBB//#DADFDF//#A0C8CB//#83CCD0//#279591
        borderRadius: 10,
        width: '70%',
        margin: -2,
        padding:10,
        paddingLeft: 10, 
        paddingRight: 10,

    },
    triangleDown: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ffc9de',
        transform: [
            { rotate: '180deg' }
        ]
    }
});


class selectLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 14.881701,
                longitude: 102.020687,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0021,
            },
            showLocation: '',
            SetLocation: '',
            search: false,
            address:''
        };
    }

    CancelSearch(){
        this.googlePlacesAutocomplete._handleChangeText('')
    }

    Selected(){
        this.props.navigation.state.params.returnData(this.state.SetLocation,this.state.region.latitude,this.state.region.longitude,this.state.address)
        this.props.navigation.goBack()
    }

    onRegionChange(region) {
        console.log(region);
        this.setState({ region });
        var api = "AIzaSyB_ferFmDFnStm9gqKB1GivwXD6kgZvog4";
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.region.latitude + ',' + this.state.region.longitude + '&key=' + api)
            .then((response) => response.json())
            .then((responseJson) => {
               
                // console.log(JSON.stringify(responseJson));
                var location = responseJson.results[0].formatted_address
                console.log('ADDRESS GEOCODE is BACK!! => ' + location);
                if (this.state.search == false) {
                    var Amphoe = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_2'|| t == 'sublocality_level_1').length > 0)[0].short_name;
                    this.setState({
                        showLocation: location,
                        SetLocation : Amphoe ,
                        address : location
                    });
                } else {
                    this.setState({
                        search: false,
                        address : location
                    });
                }
                console.log(this.state.address);
            })
        // this.googlePlacesAutocomplete._handleChangeText('')
    }

    render() {
        const { navigation } = this.props;
        return (

            <View style={styles.container}>

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChange.bind(this)}
                >
                    {/* <MapView.Marker
                        coordinate={{
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude,
                        }}
                        title="SUT"
                        description="SUT"
                    />
                     */}
                </MapView>

                <GooglePlacesAutocomplete
                    ref={c => this.googlePlacesAutocomplete = c}
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    //   returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    //   keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='true'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data.structured_formatting.main_text);
                        this.setState({
                            region: {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.0021,
                            },
                            search: true,
                            showLocation: data.structured_formatting.main_text,
                            SetLocation : data.structured_formatting.main_text
                        });
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyB_ferFmDFnStm9gqKB1GivwXD6kgZvog4',
                        language: 'th', // language of the results
                        types: 'establishment' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%',
                            backgroundColor: '#ffc9de',
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        },
                        listView: {
                            elevation: 1,
                            backgroundColor: '#ffffff'
                        }
                    }}


                    //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_1']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    predefinedPlacesAlwaysVisible={true}
                    renderLeftButton={() => 
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View>
                            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                                <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>}
                    renderRightButton={() => 
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View>
                            <Text style={{ color: '#ffffff', fontSize: 16 }} onPress={this.CancelSearch.bind(this)}> Cancel </Text>
                        </View>
                    </TouchableOpacity>}
                >
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.Selected.bind(this)} > 
                            <View>
                                <Text style={{ color: '#ffffff', fontSize: 14 }}> {this.state.showLocation} </Text>
                            </View>
                        </TouchableOpacity>
                        <Triangle style={styles.triangleDown} />
                        <Image
                            source={{ uri: 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/mapIcon.png' }}
                            style={{

                                width: 40,
                                height: 40,
                            }}
                        />
                    </View>
                </GooglePlacesAutocomplete>
            </View>
        )
    }
}
export default selectLocation;