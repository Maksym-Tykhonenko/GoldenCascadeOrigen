import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text, Image, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {BottomBar} from '../../components/BottomBar';
import {NavProps} from '../../services/GameService';

const API_KEY = '88fd3895463b4c5c914f9a9435d871a3';

var mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#f5f5f5'}]},
  {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
];

const LocationComponent = ({navigation}: NavProps) => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const {item} = route.params;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            item.place,
          )}&key=${API_KEY}`,
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const location = data.results[0].geometry;
          setCoordinates({
            latitude: parseFloat(location.lat),
            longitude: parseFloat(location.lng),
          });
          console.log(coordinates);
          setLoading(false);
        } else {
          console.log('Coordinates not found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [coordinates, item]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.flex}>
        <MapView
          customMapStyle={mapStyle}
          style={styles.flex}
          initialRegion={{
            latitude: coordinates.latitude || 0,
            longitude: coordinates.longitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {coordinates.latitude && coordinates.longitude && (
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
              title="Location"
              description={item.place}
            />
          )}
        </MapView>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.descriptionContainer}>
            <Image
              style={styles.placeIcon}
              source={require('../../Images/placeIcon.png')}
            />
            <Text style={styles.place}>{item.place}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Image
              style={styles.dateIcon}
              source={require('../../Images/dateIcon.png')}
            />
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
      </View>
      <BottomBar active="gallery" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    backgroundColor: '#1B2034',
    paddingHorizontal: 30,
    marginBottom: 50,
    height: '30%',
  },
  title: {fontSize: 20, color: '#F5F5F5', fontWeight: '700', marginTop: 42},
  place: {color: '#F5F5F5', marginLeft: 12, fontSize: 14},
  date: {color: '#F5F5F5', marginLeft: 12, fontSize: 14},
  placeIcon: {height: 24, width: 24},
  dateIcon: {height: 24, width: 24},
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
});

export default LocationComponent;
