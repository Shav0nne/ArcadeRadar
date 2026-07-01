import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import sanitizeArcade from '../services/sanitizeArcade';

const arcadesData = require('../../assets/arcades.json');

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme();
    const [arcades, setArcades] = useState([]);

    useEffect(() => {
        setArcades(arcadesData.map(item => sanitizeArcade(item)));
    }, []);

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }
            ]}
            onPress={() => navigation.navigate('Detail', { arcade: item })}
            activeOpacity={0.7}
        >
            <Text style={[styles.name, { color: colors.primary }]}>{item.name}</Text>
            <Text style={[styles.address, { color: colors.textSecondary }]}>{item.address}</Text>
            <Text style={[styles.desc, { color: colors.textSecondary }]}>{item.description}</Text>
            <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                <Text style={[styles.action, { color: colors.secondary }]}>PLAY</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={arcades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCard}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 16,
    },
    card: {
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 2,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        letterSpacing: 1,
    },
    address: {
        fontSize: 13,
        marginTop: 6,
        fontFamily: 'monospace',
    },
    desc: {
        fontSize: 12,
        marginTop: 6,
        fontFamily: 'monospace',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12,
        borderTopWidth: 1,
        paddingTop: 12,
    },
    action: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontFamily: 'monospace',
    },
});