import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Share } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { loadLocalData } from '../storage/asyncStorage';
import sanitizeArcade from '../services/sanitizeArcade';

export default function DetailScreen({ route, navigation }) {
    const { arcade: rawArcade } = route.params || {};
    const arcade = sanitizeArcade(rawArcade);
    const { colors } = useTheme();

    const [isFavorite, setIsFavorite] = useState(false);
    const [note, setNote] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await loadLocalData();
        setIsFavorite(data.favorites?.includes(arcade.id) || false);
        const notes = data.notes || {};
        setNote(notes[arcade.id] || '');
    };

    const handleFavorite = async () => {
        const data = await loadLocalData();
        const favorites = data.favorites || [];
        const newFav = favorites.includes(arcade.id)
            ? favorites.filter(id => id !== arcade.id)
            : [...favorites, arcade.id];
        data.favorites = newFav;
        await saveData(data);
        setIsFavorite(!isFavorite);
    };

    const handleSaveNote = async () => {
        const data = await loadLocalData();
        if (!data.notes) data.notes = {};
        data.notes[arcade.id] = note;
        await saveData(data);
        setEditMode(false);
    };

    const saveData = async (data) => {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem('@arcadeRadar', JSON.stringify(data));
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${arcade.name}\n${arcade.address}\n${arcade.description}`,
                title: arcade.name,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: arcade.image }} style={styles.image} />
                <View style={[styles.imageOverlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                <View style={[styles.imageBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.imageBadgeText}>GAME SPOT</Text>
                </View>
            </View>
            <View style={[styles.content, { backgroundColor: colors.card }]}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.name, { color: colors.primary }]}>{arcade.name}</Text>
                        <Text style={[styles.address, { color: colors.textSecondary }]}>{arcade.address}</Text>
                    </View>
                    <TouchableOpacity onPress={handleFavorite} style={styles.favBtn}>
                        <Text style={[styles.favIcon, { color: colors.primary }]}>
                            {isFavorite ? '★' : '☆'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.description, { color: colors.textSecondary }]}>{arcade.description}</Text>

                <View style={[styles.section, {
                    backgroundColor: colors.background,
                    borderLeftColor: colors.primary,
                }]}>
                    <View style={styles.sectionHead}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>NOTES</Text>
                        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                            <Text style={[styles.editBtn, { color: colors.secondary }]}>
                                {editMode ? 'DONE' : 'EDIT'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {editMode ? (
                        <View>
                            <TextInput
                                style={[styles.noteInput, {
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                    color: colors.text,
                                }]}
                                placeholder="Add notes here..."
                                placeholderTextColor={colors.textSecondary}
                                value={note}
                                onChangeText={setNote}
                                multiline
                                numberOfLines={4}
                            />
                            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSaveNote}>
                                <Text style={styles.saveBtnText}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={[styles.noteText, { color: colors.textSecondary }]}>
                            {note || 'No notes yet...'}
                        </Text>
                    )}
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('Map', { arcade })}
                    >
                        <Text style={styles.buttonText}>VIEW MAP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.secondary }]}
                        onPress={handleShare}
                    >
                        <Text style={[styles.buttonText, { color: '#000' }]}>SHARE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 250,
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imageBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    imageBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
    content: {
        padding: 20,
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        letterSpacing: 1,
    },
    address: {
        fontSize: 14,
        marginTop: 4,
        fontFamily: 'monospace',
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
        fontFamily: 'monospace',
    },
    favBtn: {
        padding: 8,
    },
    favIcon: {
        fontSize: 34,
    },
    section: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
    },
    sectionHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
    editBtn: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
    noteInput: {
        borderWidth: 2,
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        fontSize: 13,
        fontFamily: 'monospace',
        minHeight: 80,
    },
    noteText: {
        fontSize: 13,
        fontStyle: 'italic',
        fontFamily: 'monospace',
    },
    saveBtn: {
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    saveBtnText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 13,
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 13,
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
});