import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [mapStyle, setMapStyle] = useState('standard');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('@theme');
            const savedMapStyle = await AsyncStorage.getItem('@mapStyle');
            if (savedTheme) setTheme(savedTheme);
            if (savedMapStyle) setMapStyle(savedMapStyle);
        } catch (e) {
            console.log('Error loading settings');
        }
    };

    const saveSettings = async (newTheme, newMapStyle) => {
        try {
            await AsyncStorage.setItem('@theme', newTheme);
            await AsyncStorage.setItem('@mapStyle', newMapStyle);
            setTheme(newTheme);
            setMapStyle(newMapStyle);
        } catch (e) {
            console.log('Error saving settings');
        }
    };

    // Kleuren thema
    const colors = {
        light: {
            primary: '#FF1493',
            secondary: '#00FF00',
            background: '#f0f0f0',
            card: '#ffffff',
            text: '#000000',
            textSecondary: '#666666',
            border: '#FF1493',
            accent: '#FFD700',
            glow: 'rgba(255, 20, 147, 0.3)'
        },
        dark: {
            primary: '#FFD700',
            secondary: '#00FF00',
            background: '#0a0a0a',
            card: '#1a1a1a',
            text: '#FFD700',
            textSecondary: '#888888',
            border: '#FFD700',
            accent: '#FF1493',
            glow: 'rgba(255, 215, 0, 0.3)'
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, mapStyle, saveSettings, colors: colors[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);