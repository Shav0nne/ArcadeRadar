import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { theme, mapStyle, saveSettings, colors } = useTheme();
    const isDark = theme === 'dark';
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
    const [isLargeMap, setIsLargeMap] = useState(mapStyle === 'large');

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        saveSettings(newTheme, mapStyle);
    };

    const toggleMapStyle = () => {
        const newStyle = isLargeMap ? 'standard' : 'large';
        setIsLargeMap(!isLargeMap);
        saveSettings(theme, newStyle);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, {
                backgroundColor: colors.card,
                borderBottomColor: colors.border,
            }]}>
                <Text style={[styles.headerTitle, { color: colors.primary }]}>SETTINGS</Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>CONFIGURE YOUR ARCADE</Text>
            </View>

            <View style={[styles.section, {
                backgroundColor: colors.card,
                borderColor: colors.border,
            }]}>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>APPEARANCE</Text>

                <View style={[styles.settingItem, { borderTopColor: colors.border }]}>
                    <View>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                        <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>Gaming style theme</Text>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#ddd', true: colors.primary }}
                        thumbColor={isDarkMode ? colors.secondary : colors.primary}
                    />
                </View>
            </View>

            <View style={[styles.section, {
                backgroundColor: colors.card,
                borderColor: colors.border,
            }]}>
                <Text style={[styles.sectionTitle, { color: colors.secondary }]}>MAP SETTINGS</Text>

                <View style={[styles.settingItem, { borderTopColor: colors.border }]}>
                    <View>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>Large Map View</Text>
                        <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>Fullscreen display</Text>
                    </View>
                    <Switch
                        value={isLargeMap}
                        onValueChange={toggleMapStyle}
                        trackColor={{ false: '#ddd', true: colors.secondary }}
                        thumbColor={isLargeMap ? colors.secondary : colors.primary}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>POWERED BY RETRO VIBES</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 2,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 3,
        fontFamily: 'monospace',
    },
    headerSubtitle: {
        fontSize: 10,
        letterSpacing: 2,
        marginTop: 4,
        fontFamily: 'monospace',
    },
    section: {
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 16,
        borderWidth: 2,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontFamily: 'monospace',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopWidth: 1,
        marginTop: 12,
    },
    settingDesc: {
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'monospace',
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        letterSpacing: 3,
        fontFamily: 'monospace',
    },
});