import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ArcadeCard = ({ arcade, onPress, onFavorite, isFavorite }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }
            ]}
            activeOpacity={0.7}
        >
            <Image source={{ uri: arcade.image }} style={styles.image} />
            <View style={[styles.content, { backgroundColor: colors.card }]}>
                <Text style={[styles.name, { color: colors.primary }]}>{arcade.name}</Text>
                <Text style={[styles.address, { color: colors.textSecondary }]}>{arcade.address}</Text>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => onFavorite(arcade.id)}>
                        <Text style={[styles.favIcon, { color: colors.primary }]}>
                            {isFavorite ? '★' : '☆'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.actionText, { color: colors.secondary }]}>▶ PLAY</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        borderWidth: 2,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 14,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        letterSpacing: 1,
    },
    address: {
        fontSize: 13,
        marginTop: 4,
        fontFamily: 'monospace',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 10,
    },
    favIcon: {
        fontSize: 24,
    },
    actionText: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontFamily: 'monospace',
    },
});

export default ArcadeCard;