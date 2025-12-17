export class SearchCenterGroup {
    id: number | undefined = undefined;
    name: string = "";
    description: string | null = null;
    is_public: boolean = false;
}

export const createSearchCenterGroupFromRaw = (raw: any) => Object.assign(new SearchCenterGroup(), raw);