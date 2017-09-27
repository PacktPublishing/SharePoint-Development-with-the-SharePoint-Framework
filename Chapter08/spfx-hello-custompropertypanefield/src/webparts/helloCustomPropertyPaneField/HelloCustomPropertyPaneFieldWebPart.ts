import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCustomField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloCustomPropertyPaneField.module.scss';
import * as strings from 'helloCustomPropertyPaneFieldStrings';
import { IHelloCustomPropertyPaneFieldWebPartProps } from './IHelloCustomPropertyPaneFieldWebPartProps';

export default class HelloCustomPropertyPaneFieldWebPart extends BaseClientSideWebPart<IHelloCustomPropertyPaneFieldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloCustomPropertyPaneField}">
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

private _customPasswordFieldRender(elem: HTMLElement, context?: any): void {
  if (elem.childElementCount === 0) {
    let label: HTMLLabelElement = document.createElement("label");
    label.className = "ms-Label";
    label.innerText = "Password";
    elem.appendChild(label);
    let br: HTMLBRElement = document.createElement("br");
    elem.appendChild(br);
    let inputElement: HTMLInputElement = document.createElement("input");
    inputElement.type = "password";
    inputElement.name = context;
    this._customPasswordFieldChanged = this._customPasswordFieldChanged.bind(this);
    inputElement.addEventListener("keyup", this._customPasswordFieldChanged);
    inputElement.className = "ms-TextField-field";
    elem.appendChild(inputElement);
  }
}

private _customPasswordFieldChanged(event: Event): void {
    let srcElement: HTMLInputElement = event.srcElement as HTMLInputElement;
    this.properties.password = srcElement.value;
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
                }),
                PropertyPaneCustomField( {
                  key: 'password',
                  onRender: (domElement: HTMLElement, context?: any) => {
                    this._customPasswordFieldRender(domElement, "password");
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
