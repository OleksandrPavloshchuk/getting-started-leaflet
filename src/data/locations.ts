export type Location = {
    id: string;
    name: string;
    lat: number;
    lng: number;
};

export const sampleLocations: Location[] = [
    { id: '1', name: 'Kyiv, Maidan', lat: 50.4501, lng: 30.5234 },
    { id: '2', name: 'Lviv, Rynok', lat: 49.8397, lng: 24.0297 },
    { id: '3', name: 'Odesa, Deribasivska', lat: 46.4825, lng: 30.7233 },
    { id: '4', name: 'Kharkiv, Freedom Sq', lat: 50.0000, lng: 36.2300 }
];
