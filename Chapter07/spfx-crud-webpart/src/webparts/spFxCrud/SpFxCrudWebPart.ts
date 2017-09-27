import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxCrud.module.scss';
import * as strings from 'spFxCrudStrings';
import { ISpFxCrudWebPartProps } from './ISpFxCrudWebPartProps';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { ISPList } from "./ISPList";

import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { ISPListItem } from "./ISPListItem";
import MockSharePointClient from "./MockSharePointClient";


export default class SpFxCrudWebPart extends BaseClientSideWebPart<ISpFxCrudWebPartProps> {

public render(): void {
  this.domElement.innerHTML =
        `<div>
          <button type='button' class='ms-Button'>
            <span class='ms-Button-label'>Create List</span>
          </button>
        </div>`;
      this._createSharePointList = this._createSharePointList.bind(this);
      const button: HTMLButtonElement = this.domElement.
        getElementsByTagName("BUTTON")[0] as HTMLButtonElement;
      button.addEventListener("click", this._createSharePointList);
}

/*
public render(): void {
  let listItemsStr : string = "";
  this._getListItems().then(listItems => {
    listItems.forEach(listItem => {
      listItemsStr += `
      <li>${listItem.Id} - ${listItem.Title}</li>
      `;
    });
    this.domElement.innerHTML = `<h3>List items</h3><ul>${listItemsStr}</li>`;
  });
}
*/
/*
public render(): void {
  let listItems : string = "";
  this._getSharePointLists().then(lists => {
    lists.forEach(list => {
      listItems += `
      <div>
        <img src='${list.ImageUrl}'/>&nbsp;${list.Title}<br/>
        ID: ${list.Id}<br/>
        Last Item User Modified Date: ${list.LastItemUserModifiedDate}          
      </div><hr/>`;
    });
    this.domElement.innerHTML = `<h1>List of lists:</h1><div>${listItems}</div>`;
  });
}
*/
private _getMockListData(): Promise<ISPListItem[]> {
  return MockSharePointClient.get("")
    .then((data: ISPListItem[]) => {
          return data;
      });
}

private _getListItems(): Promise<ISPListItem[]> {
  if (Environment.type === EnvironmentType.Local) {
    return this._getMockListData();
  } else {
    alert("TODO: Implement real thing here");
    return null;
  }
}
  private _getSharePointLists(): Promise<ISPList[]> {
    const url: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists";
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
    .then(json => {
      return json.value;
    }) as Promise<ISPList[]>;
  }

private _createSharePointList(): void {
  const getListUrl: string = this.context.pageContext.web.absoluteUrl
  + "/_api/web/lists/GetByTitle('My List')"; 
  this.context.spHttpClient.get(getListUrl, SPHttpClient.configurations.v1)
  .then((response: SPHttpClientResponse) => {
      if (response.status === 200) {
        alert("List already exists.");
        return; // list already exists
      }
      if (response.status === 404) {
        const url: string = this.context.pageContext.web.absoluteUrl +
          "/_api/web/lists";
        const listDefinition : any = {
                "Title": "My List",
                "Description": "My description",
                "AllowContentTypes": true,
                "BaseTemplate": 100,
                "ContentTypesEnabled": true,
        };
        const spHttpClientOptions: ISPHttpClientOptions = {
            "body": JSON.stringify(listDefinition)
        };
        this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, 
          spHttpClientOptions)
          .then((response: SPHttpClientResponse) => {
            if (response.status === 201) {
              alert("List created successfully");
            } else {
              alert("Response status "+response.status+" - "+response.statusText);
            }
          });
      } else {
        alert("Something went wrong. "+response.status+" "+response.statusText);
      }
    });
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
