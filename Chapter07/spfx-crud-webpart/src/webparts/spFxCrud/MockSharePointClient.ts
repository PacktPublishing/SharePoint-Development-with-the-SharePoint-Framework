import { ISPListItem } from "./ISPListItem";

export default class MockSharePointClient {
    private static _listItems: ISPListItem[] = [
      { Id: 1, Title: "First list item" },
      { Id: 2, Title: "Second list item" },
      { Id: 3, Title: "Third list item" },
      { Id: 4, Title: "Fourth list item" },
      { Id: 5, Title: "Fifth list item" },
      { Id: 6, Title: "Sixth list item" },
      { Id: 7, Title: "Seventh list item" },
      { Id: 8, Title: "Eight list item" },
      { Id: 9, Title: "Ninth list item" },
    ];
    public static get(restUrl: string, options?: any)
       : Promise<ISPListItem[]> {
            return new Promise<ISPListItem[]>((resolve) => {
            resolve(MockSharePointClient._listItems);
        });
    }
}
