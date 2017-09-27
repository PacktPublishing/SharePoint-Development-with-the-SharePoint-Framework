declare interface IReactTodoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'reactTodoStrings' {
  const strings: IReactTodoStrings;
  export = strings;
}
