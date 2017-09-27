declare interface IFeedbackStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  HintTextFieldLabel: string;
}

declare module 'feedbackStrings' {
  const strings: IFeedbackStrings;
  export = strings;
}
