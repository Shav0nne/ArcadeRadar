import sanitizeArcade from './sanitizeArcade';

export const fetchArcades = async () => {
    try {
        const response = await fetch('http://localhost:3000/arcades.json');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        return data.map(item => sanitizeArcade(item));
    } catch (error) {
        console.log('Loading from local assets...');
        const data = require('../../assets/arcades.json');
        return data.map(item => sanitizeArcade(item));
    }
};

