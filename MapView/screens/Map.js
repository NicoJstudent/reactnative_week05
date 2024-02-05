import { StyleSheet, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function Map(props) {

    const [marker, setMarker] = useState(null)

    const [location, setLocation] = useState({
        latitude: 65.01256, // Oulun keskusta
        longitude: 25.47497,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const getUserPostion = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            setLocation({ ...location, "latitude": position.coords.latitude, "longitude": position.coords.longitude })
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    useEffect(() => {
        (async () => {
            getUserPostion()
        })()
    }, [])

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarker(coords)
    }

    return (
        <MapView
            style={styles.map}
            region={location}
            mapType='satellite'
            onLongPress={showMarker}
        >
            {marker &&
                <Marker
                    title="My marker"
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                />
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});