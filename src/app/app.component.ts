import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';


  dataTable = {
    dataChangedObs: new BehaviorSubject(null),
    heads: [
      { title: 'checkbox', key: 'checkbox' },
      { title: 'Name', key: 'name' },
      { title: 'Email', key: 'email' },
      { title: 'Body', key: 'body' },
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
    fetch('https://jsonplaceholder.typicode.com/comments').then(_ => _.json()).then(data => {
      this.dataSource = data.map(_ => {return {..._, createdDate: Number(new Date)}});
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
