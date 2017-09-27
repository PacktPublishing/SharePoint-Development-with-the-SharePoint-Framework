import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloMarkupJs.module.scss';
import * as strings from 'helloMarkupJsStrings';
import { IHelloMarkupJsWebPartProps } from './IHelloMarkupJsWebPartProps';

import * as Mark from "markup-js";

export default class HelloMarkupJsWebPart extends BaseClientSideWebPart<IHelloMarkupJsWebPartProps> {

public render(): void {
  let context: any = {
    list: {
      Title: "Sample list",
      ItemCount: 3
    },
    listItems: [
      { ID: 1, Title: "First item"},
      { ID: 2, Title: "Second item"},
      { ID: 3, Title: "Third item"},
    ]
  };
  let template: string = "<h3>{{list.Title}} ({{list.ItemCount}})</h3><ul>{{listItems}}<li>{{Title}}</li>{{/listItems}}</ul>";
  let result:string = Mark.up(template, context);
  this.domElement.innerHTML = result;
}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
