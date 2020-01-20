import React from 'react';
import {
  View,
} from 'native-base';
import {
  StyleSheet,
} from 'react-native';

import MapboxGL from '@mapbox/react-native-mapbox-gl'

const Deliveries = props => {
  MapboxGL.setAccessToken('pk.eyJ1IjoiZ2hhbml6YWRldiIsImEiOiJjazVqeHYyOTgwOGJ1M21wbHp3NHd6OGRlIn0.dkBkyxRxOupRyQ_wjGQkCA');
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapboxGL.MapView />
    </View>
  );
};


export default Deliveries;