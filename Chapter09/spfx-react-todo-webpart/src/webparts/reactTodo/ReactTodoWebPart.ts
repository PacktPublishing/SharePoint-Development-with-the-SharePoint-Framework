import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactTodoStrings';
import ReactTodo from './components/ReactTodo';
import { IReactTodoProps } from './components/IReactTodoProps';
import { IReactTodoWebPartProps } from './IReactTodoWebPartProps';
import TodoClient from "./TodoClient";
export default class ReactTodoWebPart extends BaseClientSideWebPart<IReactTodoWebPartProps> {
public render(): void {
    const element: React.ReactElement<IReactTodoProps> = React.createElement(
      ReactTodo,
      {
        description: this.properties.description,
        todoClient: new TodoClient()
      }
    );
    ReactDom.render(element, this.domElement);
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
