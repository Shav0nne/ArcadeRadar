export default function sanitizeArcade(item = {}) {
    const lat = Number(item.lat);
    const lng = Number(item.lng);

    return {
        id: Number(item.id) || 0,
        name: String(item.name || 'Unknown'),
        address: String(item.address || ''),
        lat: !isNaN(lat) ? lat : 51.9225,
        lng: !isNaN(lng) ? lng : 4.47917,
        image: String(item.image || ''),
        description: String(item.description || ''),
    };
}
