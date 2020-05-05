import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import * as Prism from 'prismjs';



import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  code = {
    rawHtml: `
      <inn-datatable 
       [tableContainerClass]="'custom-class'" \n
        [tableClass]="' table-bordered  table-hover'"
    [dataChanged]="dataTable.dataChangedObs" 
    [options]="dataTable.options"
     [heads]="dataTable.heads"

    (feedback)="dataFeedBackObsListener($event)" 
    [bodyrows]="dataSource">
  </inn-datatable>`,
    rawTypescript: `
    import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



    dataTable = {
        dataChangedObs: new BehaviorSubject(null),
        heads: [
            { title: 'checkbox', key: 'checkbox' },
            { title: 'Name', key: 'name' },
            { title: 'Email', key: 'email' },
            { title: 'Body', key: 'body' },
            { title: 'Sex', key: 'nested.sex' },
            { title: 'createdDate', key: 'createdDate', transform: (a, b) => new Date(a).toLocaleDateString() },

            // { title: "Creation date", key: "createdDate", transform: (fieldData, rowData) => new Date(fieldData).toLocaleDateString() },

            { title: 'Action', key: 'action' }
        ],
        options: {
            bulkActions: [
                'Email',
                'Sms'
            ],
            singleActions: [
                'Delete',
                'Message'
            ]

        }
    };

    dataSource: any[] = [];

    ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/comments').then(_ => _.json()).then(data => {
            this.dataSource = data.map(_ => { return { ..._, createdDate: Number(new Date), nested: { sex: 'male' } } });
            this.dataTable.dataChangedObs.next(true);
        });
    }

    dataFeedBackObsListener = data => {
        console.log(data);
        switch (data.type) {
            case 'singleaction':

                if (data.action === 'View') {
                    // this.router.navigate(['/tenants/status/' + data.data.id]);

                } else if (data.action === 'View License') {
                    // this.router.navigate(['/tenants/license/' + data.data.id]);

                } else if (data.action === 'Delete') {
                    // @ts-ignore
                    // document.querySelector("[data-target='#deleteLicenseModal'").click()
                    // this.onModalDelete(data.data.id)

                }
                break;

            default:
                break;
        }
    }
}
`,
    highlightedHtml: '',
    highlightedTypescript: '',
  }


  dataTable = {
    dataChangedObs: new BehaviorSubject(null),
    heads: [
      { title: 'checkbox', key: 'checkbox' },
      { title: 'Name', key: 'name' },
      { title: 'Email', key: 'email' },
      { title: 'Body', key: 'body' },
      { title: 'Sex', key: 'nested.sex' },
      { title: 'createdDate', key: 'createdDate', transform:(a,b) => new Date(a).toLocaleDateString() },

     // { title: "Creation date", key: "createdDate", transform: (fieldData, rowData) => new Date(fieldData).toLocaleDateString() },

      { title: 'Action', key: 'action' }
    ],
    options: {
      bulkActions: [
        'Email',
        'Sms'
      ],
      singleActions: [
        'Delete',
        'Message'
      ]

    }
  };

  dataSource: any [];

  ngOnInit() {
    this.code.highlightedHtml = Prism.highlight(this.code.rawHtml, Prism.languages.html, 'html');

    this.code.highlightedTypescript = Prism.highlight(this.code.rawTypescript, Prism.languages.typescript, 'typescript');
    Prism.highlightAll();
    fetch('https://jsonplaceholder.typicode.com/comments').then(_ => _.json()).then(data => {
      this.dataSource = data.map(_ => {return {..._, createdDate: Number(new Date), nested:{sex: 'male'}}});
      this.dataTable.dataChangedObs.next(true);
    });
  }

  dataFeedBackObsListener = data => {
    console.log(data);
    switch (data.type) {
      case 'singleaction':

        if (data.action === 'View') {
          // this.router.navigate(['/tenants/status/' + data.data.id]);

        } else if (data.action === 'View License') {
         // this.router.navigate(['/tenants/license/' + data.data.id]);

        } else if (data.action === 'Delete') {
          // @ts-ignore
         // document.querySelector("[data-target='#deleteLicenseModal'").click()
          // this.onModalDelete(data.data.id)

        }
        break;

      default:
        break;
    }
  }
}
