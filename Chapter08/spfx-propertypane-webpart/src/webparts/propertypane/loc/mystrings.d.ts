declare interface IPropertypaneStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'propertypaneStrings' {
  const strings: IPropertypaneStrings;
  export = strings;
}
