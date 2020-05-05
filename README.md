# Datatable
The only data table you will ever need
## What is this?
This is a custom data table that aims to solve common data table problems 



[Live Example](https://ayotycoon.github.io/inn-datatable-example)
[Contribute and star on github](https://github.com/ayotycoon/inn-datatable-example)
[Npm](https://www.npmjs.com/package/inn-datatable)
[ayotycoon](https://github.com/ayotycoon)


### Install

```
npm i inn-datatable
```
### Css Dependences

this table requires you have bootstrap css and font awesome installed in your project

### Sample usage

app.module.ts
```typescript
...
import { DatatableModule } from 'inn-datatable';

@NgModule({
  ...,
  imports: [...,
    DatatableModule
  ]
})

```
app.component.html
```html
<!--Only heads and bodyrows attribute are required-->
<inn-datatable 
[tableContainerClass]="'custom-class'"  

[tableClass]="' table-bordered  table-hover'"
[dataChanged]="dataTable.dataChangedObs"
[options]="dataTable.options"
[heads]="dataTable.heads"
(feedback)="dataFeedBackObsListener($event)"
[bodyrows]="dataSource">
  </inn-datatable>
```
app.component.ts
```typescript
export class AppComponent implements OnInit {
  title = '';


  dataTable = {
    dataChangedObs: new BehaviorSubject(null),
    heads: [
     { title: 'checkbox', key: 'checkbox' },
      { title: 'Name', key: 'name' },
      { title: 'Email', key: 'email' },
      { title: 'Body', key: 'body' },
      { title: 'Sex', key: 'nested.sex' },
      { title: 'Created Date', key: 'createdDate', transform:(fieldData,rowData) => new Date(a).toLocaleDateString() },


     // { title: "Creation date", key: "createdDate", transform: (fieldData, rowData) => new Date(fieldData).toLocaleDateString() },

      { title: 'Action', key: 'action' }
    ],
    options: {
      bulkActions: [
        'Email',
        'Sms'
      ],
      singleActions: [
        'View',
        'Update',
        'Delete',
      ]

    }
  };

  dataSource: any [];

  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/comments').then(_ => _.json()).then(data => {
      this.dataSource = data;
      this.dataTable.dataChangedObs.next(true); // must be called each time the data supplied to the data table changes
    });
  }

  dataFeedBackObsListener = data => {
    console.log(data);
    switch (data.type) {
      case 'singleaction':

        if (data.action === 'View') {
          // this.router.navigate(['/view/' + data.data.id]);

        } else if (data.action === 'Update') {
         // this.router.navigate(['/Update/' + data.data.id]);

        } else if (data.action === 'Delete') {
// perform custom delete action
      

        }
        break;

      default:
        break;
    }
  }
}

```


## Basic usage
Basic usage just need  the ```bodyrows``` and the ```heads```  attribute to work. This is usually used if the data in ```bodyrows``` and ```heads``` wont change at any point and also when you dont need feedback from the table. This should not be used for async data

### app.component.html

```html

<app-datatable


[heads]="heads"

[bodyrows]="rows">

</app-datatable>


```
### app.component.ts
```heads``` must be an array of object which contains keys ```title``` and ```key ```
```title```: contains the text that will show on the table head
```key```: contains the object property that is matched with the associated title in the rows array. 
Example title can be full name, but the key which is used in the array is just ```name```. in this case, **full name** will be the ```title``` and **name** will be the ```key```

```typescript

export  class  AppComponent  implements  OnInit {


heads: [

{ title:  "checkbox", key:  "checkbox" }, // insert this if you need checkbox funtionality
{ title:  "ID", key:  "id" },

{ title:  "Full Name", key:  "name" },




],


rows: [
{id:1,name: 'ayokunle'},
{id:2,name: 'sam'},
{id:3,name: 'josh'},
{id:4,name: 'ronke'},
{id:5,name: 'ade'},
]

}


```






## Advanced Usage ( More common )
- ```[dataChanged]```  expects a BehaviorSubject of a true or false value. This is used to notify the table that the either the **heads** or the **bodyrows** data chas changed, to the table should change accordingly.
- ```[options]``` Contains extra options, please scroll down for possible options
- ```[heads]```  expects an array of object. that contains the head title and key value
- ```[bodyrows]```  expects an array of object.
- ```(feedback)``` expects a callback function. this emits actions back to the parent component
- ```[tableContainerClass]``` expects a string of optional classes you want to affect the table container

- ```[tableClass]``` expects a string of optional classes you want to affect the table itself
### app.component.html

```html

   <app-datatable 
    [dataChanged]="dataTable.dataChangedObs"
    [options]="dataTable.options"
    [heads]="dataTable.heads"
    (feedback)="dataFeedBackObsListener($event)"
    [bodyrows]="rows">
    </app-datatable>


```
possible options
### app.component.ts


-  ```options.debug``` : defaults to false, if checked, some actions the libary performs will be logged to the console
-  ```options.emitClickActions``` : defaults to ` ['View/Edit', 'View / Edit', 'View', 'Edit']`, list pf single actions to emit when a row in the datatable is clicked


-  ```options.singleActions``` : actions to display on each body row . must be an array of string or an array of ```{title: string, showIf?: Function}```

-  ```options.bulkActions``` : actions to display on alll rows . must be an array of string

-  ```dataFeedBackObsListener``` emits back action events performed on the datatable , so you can the select those actions and act on them accordingly


```typescript



export  class  AppComponent  implements  OnInit {


 dataTable = {
    dataChangedObs: new BehaviorSubject(null),

    heads: [
     { title:  "checkbox", key:  "checkbox" }, // insert this if you need checkbox funtionality
    { title:  "ID", key:  "id" },

    { title:  "Full Name", key:  "name",transform: (fieldText,rowData) => fieldText.replace(',', ' ') },
    // transform property is completely optional. It is used to modify a text.the first argument contains the row value and the second argument contains the entire row data. transform property must return the string you want to show in that row and firld. Example if you want to replace the ',' in name firlds to space
    ],
    options: {

      singleActions: [
        "Edit",
        "Delete",
        {title:"Activate", showIf: (fieldText,rowData) => !rowData.activated}, // showIf property is completely optional. It is used to confitionally show an option based on the given row data.the first argument contains the row value and the second argument contains the entire row data. showIf property needs a boolean to show or ide an action

        {title:"Deactivate", showIf: (fieldText,rowData) => rowData.activated}
      ],
      bulkActions: [
          'Change',
          'Wipe'
      ]
    }
  };


rows;

}
 constructior(){}

 ngOnInit(){

// fetch an external api
this.authService.fetchData().subscribe((data: {id: number; name: string}) => {
    this.rows = data
    this.dataTable.dataChangedObs.next(true)

})


 }
   dataFeedBackObsListener = data => {
  
    switch (data.type) {
      case "singleaction":
        // data.data contains the row data the action was performed on
        if (data.action === "Delete") {
          //Perform your action

        } else if (data.action === "Edit") {

         // perform your action


        }
        break;
      case "bulkaction":
        // data.data contains array of row data the action was performed on
        if (data.action === "Wipe") {
          //Perform your action

        } else if (data.action === "Change") {

         // perform your action


        }
        break;
      default:
        break;
    }
  };

```

## Key note
At anypoint if the **heads** or the **bodyrows** data changes, you need to call ```this.dataTable.dataChangedObs.next(true)``` and the dataTable will reflect those changes and handle all other thins automatically


to enable click actions, make sure you have any of this actions ```['View/Edit','View / Edit','View', 'Edit']```







