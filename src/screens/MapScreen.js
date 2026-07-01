import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../context/ThemeContext';

export default function MapScreen({ route }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    const arcadeParam = route?.params?.arcade;
    const arcade = arcadeParam && typeof arcadeParam === 'object' ? (() => {
        const latNum = Number(arcadeParam.lat);
        const lngNum = Number(arcadeParam.lng);
        return {
            id: Number(arcadeParam.id) || 0,
            name: String(arcadeParam.name || 'Unknown'),
            address: String(arcadeParam.address || ''),
            lat: !isNaN(latNum) ? latNum : 51.9225,
            lng: !isNaN(lngNum) ? lngNum : 4.47917,
            image: String(arcadeParam.image || ''),
            description: String(arcadeParam.description || '')
        };
    })() : null;

    // Ai used
    const darkMapStyle = [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },

        { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }],},
        { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
        { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
        { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location access required');
                return;
            }
            try {
                let loc = await Location.getCurrentPositionAsync({});
                setLocation(loc);
            } catch (error) {
                console.log('Location error:', error);
            }
        })();
    }, []);

    useEffect(() => {
        if (arcade && mapRef.current) {
            const lat = Number(arcade.lat);
            const lng = Number(arcade.lng);
            if (!isNaN(lat) && !isNaN(lng)) {
                mapRef.current.animateToRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        }
    }, [arcade]);

    const initialRegion = location ? {
        latitude: Number(location.coords.latitude) || 51.9225,
        longitude: Number(location.coords.longitude) || 4.47917,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    } : {
        latitude: 51.9225,
        longitude: 4.47917,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    const checkIsNumber = v => typeof v === 'number' && !isNaN(v);
    const initialValid = checkIsNumber(initialRegion.latitude) && checkIsNumber(initialRegion.longitude);
    const arcadeValid = !arcade || (checkIsNumber(arcade.lat) && checkIsNumber(arcade.lng));

    if (!initialValid || !arcadeValid) {
        console.warn('MapScreen: invalid coordinates', { initialRegion, arcade });
        return (
            <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={{ color: isDark ? '#FFD700' : '#FF1493' }}>Invalid map data</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                customMapStyle={isDark ? darkMapStyle : []}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Your Location"
                        pinColor="#FFD700"
                    />
                )}

                {arcade && (
                    <Marker
                        coordinate={{
                            latitude: Number(arcade.lat),
                            longitude: Number(arcade.lng),
                        }}
                        title={arcade.name}
                        description={arcade.address}
                        pinColor="#FF1493"
                    />
                )}
            </MapView>

            {arcade && (
                <View style={[styles.infoBox, isDark && styles.infoBoxDark]}>
                    <Text style={[styles.infoTitle, isDark && styles.infoTitleDark]}>{arcade.name}</Text>
                    <Text style={[styles.infoAddress, isDark && styles.infoAddressDark]}>{arcade.address}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    infoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF1493',
    },
    infoBoxDark: {
        backgroundColor: '#1a1a1a',
        borderLeftColor: '#FFD700'
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    infoTitleDark: {
        color: '#FFD700'
    },
    infoAddress: {
        fontSize: 14,
        color: '#666',
        marginTop: 4
    },
    infoAddressDark: {
        color: '#ccc'
    },
});

