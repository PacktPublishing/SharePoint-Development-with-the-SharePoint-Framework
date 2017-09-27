import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloPnP.module.scss';
import * as strings from 'helloPnPStrings';
import { IHelloPnPWebPartProps } from './IHelloPnPWebPartProps';

import pnp, { EmailProperties }  from "sp-pnp-js";
import { Web, List, ListAddResult, PagedItemCollection, CamlQuery, ItemAddResult } from "sp-pnp-js";


export default class HelloPnPWebPart extends BaseClientSideWebPart<IHelloPnPWebPartProps> {

/* Accessing web 
public render(): void {
  this.domElement.innerHTML = `<p>Loading...</p>`;
  pnp.sp.web.get().then((web: any) => {
    const webTitle: string = web.Title;
    const webUrl: string = web.Url;
    const webTemplate: string = web.WebTemplate;
    this.domElement.innerHTML =
      `<p>webTitle: ${webTitle}</p>
        <p>webUrl: ${webUrl}</p>
        <p>webTemplate: ${webTemplate}</p>`;
  });
const web: Web = new Web("https://opax.sharepoint.com/pnp");
web.update({Title: "PnP JS Core Library Rules!" }).then(() => {
  console.log("site title updated");
});

const site: Site  = pnp.sp.site;
site.rootWeb.
pnp.sp.site.get().then((site: Site) => {
  
});
} */

/* Accessing the user profile 
public render(): void {
  this.domElement.innerHTML = `<p>Loading...</p>`;
  pnp.sp.profiles.myProperties.get().then((userProfile: any) => {
    const userCard: string =
      `<div>
        <a href="${userProfile.PersonalUrl}">          
          ${userProfile.DisplayName}
        </a>
      </div>`;
    this.domElement.innerHTML = userCard;
  });
}
*/

/* send email
public render(): void {
  this.domElement.innerHTML = `<p>Loading...</p>`;
  const emailProperties: EmailProperties = {
    To: ["olli@opax.onmicrosoft.com"],
    CC: [],
    Subject: "Testing PnP JavaScript send email functionality",
    Body: "This email has been sent using JavaScript",
  };
  pnp.sp.utility.sendEmail(emailProperties).then(() => {
    this.domElement.innerHTML = `<p>Email has been sent.</p>`;
  }).catch((error: any) => {
    alert(error);
  });
}
*/

/*
public render(): void {
  this.domElement.innerHTML = `<p>Loading...</p>`;
// get list by web relative url
pnp.sp.web.getList("/Shared Documents").get().then((list: List) => {
  console.log(list);
});

// get list by title
pnp.sp.web.lists.getByTitle("Documents").get().then((list: List) => {
  console.log(list);
});

// get list by id
pnp.sp.web.lists.getById("267acf5a-151b-4dbf-b65b-545ed382a425").get().then((list: any) => {
  console.log(list);
  console.log(list.AllowContentTypes);
});

pnp.sp.web.lists.add("Custom List 2").then((value: ListAddResult) => {
  value.list.update({"AllowContentTypes": true, "ContentTypesEnabled": true}).then(() => {
    console.log("List created and then modified to allow the use of content types.");
  });
});

pnp.sp.web.lists.getByTitle("Custom List 1").delete().then(() => {
  console.log("List deleted.");
});
}
*/

public render(): void {
  
/*
const camlQuery: CamlQuery = {
  ViewXml: "<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>Second item</Value></Eq></Where></Query></View>"
};
pnp.sp.web.lists.getByTitle("Custom 1").getItemsByCAMLQuery(camlQuery).then((items: any[]) => {
  items.forEach(item => {
    console.log("item.Title = " + item.Title);
  });
});

pnp.sp.web.lists.getByTitle("Custom 1").items.top(1).filter("Title eq 'First item'").get().then((items: any[]) => {
  items.forEach(item => {
    console.log("item.Title = " + item.Title);
  });
});

pnp.sp.web.lists
  .getByTitle("Custom 1").items
  .add({ Title: "New item added via code."})
  .then((value: ItemAddResult) => {
    console.log(value);
  });

let batch: any = pnp.sp.web.createBatch();
const list: any = pnp.sp.web.lists.getByTitle("Custom 1");
let i: number;
for (i = 1; i <= 10; i++) {
  list.items.inBatch(batch)
  .add({ Title: "New item "+i+" added via code."})
  .then(() => {
    console.log(i);
  });
}
batch.execute().then(()=> {
  console.log("Added 10 items as single batch.");
});


pnp.sp.web.lists.getByTitle("Custom 1").items
  .getById(1)
  .update({Title: "Updated list item title"})
  .then(() => {
    console.log("List item updated.");
  });
*/

pnp.sp.web.lists.getByTitle("Custom 1").items
  .getById(2)
  .delete().then(() => {
    console.log("List item deleted.");
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
