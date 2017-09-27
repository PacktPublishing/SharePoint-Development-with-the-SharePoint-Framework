declare interface IHelloPnPStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'helloPnPStrings' {
  const strings: IHelloPnPStrings;
  export = strings;
}
