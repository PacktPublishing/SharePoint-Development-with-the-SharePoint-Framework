declare interface ISpFxCrudStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'spFxCrudStrings' {
  const strings: ISpFxCrudStrings;
  export = strings;
}
