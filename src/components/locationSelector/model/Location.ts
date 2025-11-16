export class Location {
    public id: string = "";
    public name: string = "";
    public country: string = "";
    public city: string = "";
    public lat: number = 0;
    public lng: number = 0;
    public thumbnail: string = "";
    public address: string = "";
    public description: string = "";
    public stars: number = 0;
    public type: string = "";
    public importantinfo: string = "";

    public isShowStars = () => this.stars > 0;

    public getStarsString = () => {
        switch (Math.ceil(this.stars)) {
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
}

export const createLocation = (raw: any) => Object.assign(new Location(), raw);