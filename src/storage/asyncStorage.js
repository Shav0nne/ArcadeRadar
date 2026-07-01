import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@arcadeRadar';

export const loadLocalData = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : { favorites: [] };
    } catch (e) {
        return { favorites: [] };
    }
};

export const saveLocalData = async (data) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.log('Error saving data');
    }
};

export const toggleFavorite = async (id, currentFavorites) => {
    const newFav = currentFavorites.includes(id)
        ? currentFavorites.filter(fav => fav !== id)
        : [...currentFavorites, id];
    const data = await loadLocalData();
    data.favorites = newFav;
    await saveLocalData(data);
    return newFav;
};

