import React from 'react';
import {
  View,
} from 'native-base';
import {
  StyleSheet,
} from 'react-native';

import * as MapboxGL from '@mapbox/react-native-mapbox-gl'

const Deliveries = props => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapboxGL.MapView />
    </View>
  );
};


export default Deliveries;