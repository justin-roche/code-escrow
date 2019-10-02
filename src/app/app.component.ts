import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'code-escrow';
    constructor(private api: ApiService) {
        console.log('hi');
    }

    getItems() {
        // alert("wow");
        this.api.getItems().subscribe();
    }

    submit() {
        // alert("wow");
        this.api.submit().subscribe();
    }



}
