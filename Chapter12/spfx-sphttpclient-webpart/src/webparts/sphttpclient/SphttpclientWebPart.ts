import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Sphttpclient.module.scss';
import * as strings from 'sphttpclientStrings';
import { ISphttpclientWebPartProps } from './ISphttpclientWebPartProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class SphttpclientWebPart extends BaseClientSideWebPart<ISphttpclientWebPartProps> {

private _getWebTitle(): Promise<{Title: string}> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web?$select=Title`, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    })  
}

  public render(): void {

    let webtitle: string = ""; 

    this._getWebTitle()
    .then((web: {Title: string}): void => {
      webtitle = web.Title;
      document.getElementById('webtitle').innerHTML = webtitle; 
    });
    
    //   console.log(webtitle); 
    // }, (error: any): void => {
    //   console.error(error);
    

    this.domElement.innerHTML = `
        
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white"><div id="webtitle"></div></span>
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
