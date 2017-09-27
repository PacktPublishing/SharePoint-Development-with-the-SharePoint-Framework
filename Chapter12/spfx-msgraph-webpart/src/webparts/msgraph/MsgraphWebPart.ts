import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Msgraph.module.scss';
import * as strings from 'msgraphStrings';
import { IMsgraphWebPartProps } from './IMsgraphWebPartProps';

import { GraphHttpClient, HttpClientResponse } from '@microsoft/sp-http';


export default class MsgraphWebPart extends BaseClientSideWebPart<IMsgraphWebPartProps> {

  private _graphCall(): Promise<{displayName: string}> {
    return this.context.graphHttpClient.get(`v1.0/sites/root`, GraphHttpClient.configurations.v1)
    .then((response: HttpClientResponse) => {
      console.log(response.status);
      return response.json();
    })  
  }

  public render(): void {

    let webtitle: string = ""; 

    this._graphCall()
    .then((web: {displayName: string}): void => {
      webtitle = web.displayName;
      document.getElementById('webtitle').innerHTML = webtitle; 
    });

    this.domElement.innerHTML = `
      <div class="${styles.msgraph}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <p class="ms-font-l ms-fontColor-white"><div id="webtitle"/></p>
            </div>
          </div>
        </div>
      </div>`;
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
