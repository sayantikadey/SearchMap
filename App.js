
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React, {useState, useEffect} from 'react';
import { Button } from "react-native-paper";
import * as Location from 'expo-location';


const { height, width } = Dimensions.get("window");

export default function App() {
  const [mapRegion, setMapRegion] = useState({});
  const [lat, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.000918,
      longitudeDelta: 0.000418,
    });
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  }
  
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 30,
          longitudeDelta: 30,}}
          > 
          {lat && (<Marker coordinate={mapRegion} title='Hi, there'/>)}
      </MapView>
      <Button style={{margin:10, top:50}} onPress={userLocation} icon="map-marker-radius-outline" buttonColor="red" textColor="white" >
       Get Current Location
      </Button>
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
  map:{
    width: 400,
    height: 500
  },
  
  ButtonText: {
    color: "white",
  },
});

