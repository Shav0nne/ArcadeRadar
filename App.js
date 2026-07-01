import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import MapScreen from './src/screens/MapScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    const { colors } = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeList"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        backgroundColor: colors.card,
                        borderBottomWidth: 2,
                        borderBottomColor: colors.border,
                    },
                    headerTintColor: colors.primary,
                    headerTitleStyle: {
                        color: colors.primary,
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        letterSpacing: 2,
                    },
                    headerTitle: 'ARCADE RADAR'
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    headerStyle: {
                        backgroundColor: colors.card,
                        borderBottomWidth: 2,
                        borderBottomColor: colors.border,
                    },
                    headerTintColor: colors.primary,
                    headerTitleStyle: {
                        color: colors.primary,
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        letterSpacing: 2,
                    },
                    headerTitle: 'DETAILS'
                }}
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerStyle: {
                        backgroundColor: colors.card,
                        borderBottomWidth: 2,
                        borderBottomColor: colors.border,
                    },
                    headerTintColor: colors.primary,
                    headerTitleStyle: {
                        color: colors.primary,
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        letterSpacing: 2,
                    },
                    headerTitle: 'MAP'
                }}
            />
        </Stack.Navigator>
    );
}

function MainTabs() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopWidth: 2,
                    borderTopColor: colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
                tabBarLabelStyle: {
                    fontFamily: 'monospace',
                    fontSize: 10,
                    letterSpacing: 1,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'HOME',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'SETTINGS',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.card,
                        borderBottomWidth: 2,
                        borderBottomColor: colors.border,
                    },
                    headerTintColor: colors.primary,
                    headerTitleStyle: {
                        color: colors.primary,
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        letterSpacing: 2,
                    },
                    headerTitle: 'SETTINGS'
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <MainTabs />
            </NavigationContainer>
        </ThemeProvider>
    );
}