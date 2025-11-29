export class SearchCenter {
    country: string = "";
    type: string = "";
    city: string = "";
    name: string = "";
    longitude: number = 0;
    latitude: number = 0;

    public getKey = () => `${this.type}+${this.country}+${this.city}+${this.name}`;
}

export const createSearchCenterFromRaw = (raw: any) => Object.assign(new SearchCenter(), raw);