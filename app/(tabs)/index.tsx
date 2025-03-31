import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Plus } from 'lucide-react-native';
import * as Location from 'expo-location';
import GoogleMapReact from 'google-map-react';

// Only import MapView when on native platforms
const MapView = Platform.select({
  native: () => require('react-native-maps').default,
  default: () => null,
})();

const Marker = Platform.select({
  native: () => require('react-native-maps').Marker,
  default: () => null,
})();

const Callout = Platform.select({
  native: () => require('react-native-maps').Callout,
  default: () => null,
})();

// Web marker component for Google Maps
const WebMarker = ({ text }) => (
  <div style={{
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2563eb',
    borderRadius: '50%',
    padding: 8,
    cursor: 'pointer',
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: 8,
      borderRadius: 4,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </div>
  </div>
);

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  // Render native map on mobile platforms
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}>
            <Callout>
              <Text>You are here</Text>
            </Callout>
          </Marker>
        </MapView>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </View>
    );
  }

  // Render Google Maps on web platform
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '' }}
          defaultCenter={{
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }}
          defaultZoom={13}>
          <WebMarker
            lat={location.coords.latitude}
            lng={location.coords.longitude}
            text="You are here"
          />
        </GoogleMapReact>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Plus color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2563eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});