import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { fetchArcades } from '../services/api';

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme();
    const [arcades, setArcades] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchArcades();
            setArcades(data);
        } catch (error) {
            Alert.alert('Error', 'Kon de arcades niet laden.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('Detail', { arcade: item })}
        >
            <Text style={[styles.name, { color: colors.primary }]}>{item.name}</Text>
            <Text style={[styles.address, { color: colors.textSecondary }]}>{item.address}</Text>
            <Text style={[styles.meta, { color: colors.textSecondary }]}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <Text style={[styles.headerText, { color: colors.primary }]}>ARCADE RADAR</Text>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={arcades}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={[styles.empty, { color: colors.textSecondary }]}>Geen arcades gevonden.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 2,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        letterSpacing: 2,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    list: {
        padding: 16,
    },
    card: {
        borderWidth: 2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        fontFamily: 'monospace',
    },
    address: {
        fontSize: 12,
        marginBottom: 8,
        fontFamily: 'monospace',
    },
    meta: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'monospace',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        fontFamily: 'monospace',
    },
});