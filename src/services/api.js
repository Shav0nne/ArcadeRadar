import AsyncStorage from '@react-native-async-storage/async-storage';
import sanitizeArcade from './sanitizeArcade';

const CACHE_KEY = '@arcadeCache';
const CACHE_TIME_KEY = '@arcadeCacheTime';
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const JSON_URL = 'https://gist.githubusercontent.com/Shav0nne/37cc16d2357613db0d7d0e6b540c6824/raw/08c771fd9a37e57a080543b41786f6bf54b97a37/gistfile1.txt';

const readCachedArcades = async () => {
    try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    } catch (error) {
        return [];
    }
};

export const fetchArcades = async () => {
    try {
        const cachedTime = await AsyncStorage.getItem(CACHE_TIME_KEY);
        const cacheAge = cachedTime ? Number(cachedTime) : 0;

        if (cacheAge && Date.now() - cacheAge < CACHE_DURATION) {
            const cached = await readCachedArcades();
            if (cached.length > 0) return cached;
        }

        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        const sanitizedData = Array.isArray(data) ? data.map(item => sanitizeArcade(item)) : [];

        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(sanitizedData));
        await AsyncStorage.setItem(CACHE_TIME_KEY, String(Date.now()));

        return sanitizedData;
    } catch (error) {
        const cachedData = await readCachedArcades();
        if (cachedData.length > 0) return cachedData;

        return [];
    }
};