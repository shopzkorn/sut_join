
import React, { Component } from 'react'
import { Text,  View ,StyleSheet} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 var markers = [
  {
    latitude: 14.881701,
    longitude: 102.020687,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
];
 
 
 export default () => (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 14.881701,
          longitude: 102.020687,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
         <MapView.Marker
          coordinate={{
            latitude: 14.881701,
            longitude: 102.020687,
          }}
          title="SUT"
          description="SUT"
          >
                   
          <MapView.Callout>
            <Text>hiii</Text>
          </MapView.Callout>
                      </MapView.Marker>
      </MapView>
    </View>
 );