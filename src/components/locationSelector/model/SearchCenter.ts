export class SearchCenter {
    type: string = "";
    city: string = "";
    name: string = "";
    longitude: number = 0;
    latitude: number = 0;
}

export const createSearchCenter = (raw: any) => Object.assign(new SearchCenter(), raw);