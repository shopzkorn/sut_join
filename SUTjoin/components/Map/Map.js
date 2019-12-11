
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
    },
    flex: {
      flex: 0,
    },
    row: {
      flexDirection: 'row'
    },
    header: {
      backgroundColor: '#ffffff',
      paddingHorizontal: theme.sizes.padding,
      paddingTop: theme.sizes.padding * .25,
      // justifyContent: 'space-around',
      alignItems: 'center',
      // position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    back: {
      width: theme.sizes.base * 3,
      height: theme.sizes.base * 3,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    highlight: {
      fontSize: 20,
      fontWeight: '700',
    },
});


class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0021,
            },
            title: '',
            location_name: '',
            address:''
        };
    }

    static navigationOptions = ({ navigation }) => {
      var title = navigation.getParam('title');
      return { 
        header: (
          <View style={[styles.flex, styles.row, styles.header]}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
            </TouchableOpacity>
            <Text style={styles.highlight}>
            {title}
          </Text>
          </View>
        ),
        // headerTransparent: true,
      }
    }
    componentWillMount() {
      const { navigation } = this.props;
      var itemlat = parseFloat(navigation.getParam('lat'));
      var itemlng = parseFloat(navigation.getParam('lng'));
      var title = navigation.getParam('title');
      var location_name = navigation.getParam('location_name');
      var address = navigation.getParam('address');

      console.log(itemlat + ' ' + itemlng);
      this.setState({
        region: {
          latitude: itemlat,
          longitude: itemlng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0021,
      },
        title:title,
        location_name:location_name,
        address:address
      })
      console.log(this.state.region)
       
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.region}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude,
                        }}
                        title={this.state.location_name}
                        description={this.state.address} 
                    />
                    
                </MapView>                
            </View>
        )
    }
}
export default Map;