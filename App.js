import * as React from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';

const carImage = require('./assets/coche.png');

export default function App() {

  const [origin, setOrigin] = React.useState({
    latitude: 32.437856,
    longitude: -114.716281,
  });

  const [destination, setDestination] = React.useState({
    latitude: 32.454584,
    longitude: -114.724105,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, [])
  
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !=='granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.09
        }}  
      >
        <Marker 
          draggable={true}
          coordinate={origin}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable={true}
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor='cyan'
          strokeWidth={8}
        />
        {/* <Polyline
          coordinates={[ origin, destination ]}
          strokeColor='cyan'
          strokeWidth={8}
        /> */}
      </MapView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
