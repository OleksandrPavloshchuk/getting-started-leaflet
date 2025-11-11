export type Location = {
    id: string;
    name: string;
    country: string;
    city: string;
    lat: number;
    lng: number;
    thumbnail: string;
    address: string,
    description: string;
    stars: number;
    type: string;
    importantinfo: string;
};

export const getStarsString = (val: number) => {
    switch (Math.ceil(val)) {
        case 0:
            return "";
        case 1:
            return "⭐️";
        case 2:
            return "⭐️⭐️";
        case 3:
            return "⭐️⭐️⭐️";
        case 4:
            return "⭐️⭐️⭐️⭐️";
        case 5:
            return "⭐️⭐️⭐️⭐️⭐️";
        default:
            return "⭐️⭐️⭐️⭐️⭐️+";
    }
}
