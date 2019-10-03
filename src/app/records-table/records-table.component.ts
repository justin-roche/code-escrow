import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-records-table',
    templateUrl: './records-table.component.html',
    styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {

    constructor(private api: ApiService) { }
    private records = [];
    ngOnInit() {
        this.api.getRecords().subscribe((r) => {
            console.log('records', r);
            this.records = r.rows;

        })
    }

}
