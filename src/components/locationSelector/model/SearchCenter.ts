export class SearchCenter {
    country: string = "";
    city: string = "";
    name: string = "";
    longitude: number = 0;
    latitude: number = 0;
    group_id: string = "";
    group_name: string = "";
    is_public: boolean = false;

    public getKey = () => `${this.group_id}+${this.country}+${this.city}+${this.name}`;
}

export const createSearchCenterFromRaw = (raw: any) => Object.assign(new SearchCenter(), raw);