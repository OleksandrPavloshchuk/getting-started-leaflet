export class SearchCenterGroup {
    id: string | undefined = undefined;
    name: string = "";
    description: string | null = null;
    is_public: boolean = false;
}

export const createSearchCenterGroupFromRaw = (raw: any) => Object.assign(new SearchCenterGroup(), raw);