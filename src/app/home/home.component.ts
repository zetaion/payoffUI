import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public tableData1: TableData;

    constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'VIN', 'Lien Holder', 'Veh Info', 'Type', 'Finance Source', 'Payoff Amount (Trade Owed)', 'Per Diem','Request Date', 'Good Untill' ],
          dataRows: [
              ['153456346346', 'Dakota Rice', 'Toyoto',             'JP Morgan Chase', '$36,738', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '12-12-2019'],
              ['2153456346346', 'Minerva Hooper', 'Honda',          'Huntington Bank', '$23,789', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '12-12-2019'],
              ['3153456346346', 'Sage Rodriguez', 'Mercedes Benz', 'Credit Union',      '$56,142', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '12-12-2019'],
              ['4153456346346', 'Philip Chaney', 'Mitsubishi',      'Overland Park',    '$38,735', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '12-12-2019'],
              ['5153456346346', 'Doris Greene', 'Volkswagen',       'Feldkirchen in Kärnten', '$63,542', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '12-12-2019'],
              ['6153456346346', 'Mason Porter', 'Cheverolet',       'Gloucester', '$78,615', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '12-12-2019']
          ]
      };

  }

}
