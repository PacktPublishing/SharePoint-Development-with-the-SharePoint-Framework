import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneCustomField 
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Propertypane.module.scss';
import * as strings from 'propertypaneStrings';
import { IPropertypaneWebPartProps } from './IPropertypaneWebPartProps';
import * as jQuery from 'jQuery';  

export default class PropertypaneWebPart extends BaseClientSideWebPart<IPropertypaneWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    alert(jQuery('#foo').val());
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

private _customFieldRender(elem: HTMLElement): void {
  elem.innerHTML = '<div><h1>This is our custom field</h1></div>';
}

protected get disableReactivePropertyChanges(): boolean {
  return true;
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
                }                
                )
              ]
            },
            {
              groupName: "Custom group",
              groupFields: [
                PropertyPaneLabel('labelField', {
                  text: "This is a custom text in PropertyPaneLabel"
                })
              ]
            }
          ]
        },
        {
          header: {
            description: "Group (page 2)"
          },          
          groups: [
            {
              groupName: "Custom group (page 2)",
              groupFields: [
                PropertyPaneTextField('descriptionPage2', {
                  label: "Description"
                }                
                )
              ]
            },
            {
              groupName: "Custom group 2 (page 2)",
              groupFields: [
                PropertyPaneTextField('textboxFieldPage2', {
                  label: "Enter a custom value"
                }),
                PropertyPaneLabel('labelFieldPage2', {
                  text: "This is a custom text in page 2"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
