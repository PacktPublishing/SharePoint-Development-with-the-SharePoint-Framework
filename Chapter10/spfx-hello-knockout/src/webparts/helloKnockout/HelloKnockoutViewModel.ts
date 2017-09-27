import * as ko from 'knockout';
import styles from './HelloKnockout.module.scss';
import { IHelloKnockoutWebPartProps } from './IHelloKnockoutWebPartProps';

export interface IHelloKnockoutBindingContext extends IHelloKnockoutWebPartProps {
  shouter: KnockoutSubscribable<{}>;
}

export default class HelloKnockoutViewModel {
  public description: KnockoutObservable<string> = ko.observable('');

  public labelClass: string = styles.label;
  public helloKnockoutClass: string = styles.helloKnockout;
  public containerClass: string = styles.container;
  public rowClass: string = `ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`;
  public buttonClass: string = `ms-Button ${styles.button}`;

  constructor(bindings: IHelloKnockoutBindingContext) {
    this.description(bindings.description);

    // When web part description is updated, change this view model's description.
    bindings.shouter.subscribe((value: string) => {
      this.description(value);
    }, this, 'description');
  }
}
