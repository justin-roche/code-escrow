import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-submission-form',
    templateUrl: './submission-form.component.html',
    styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit {

    private inquiry = {
        company: "test",
        task: "task description",
        email: "a@a.com"
    };

    constructor(private api: ApiService) { }

    ngOnInit() {
    }

    onSubmit() {
        this.api.submit(inquiry).subscribe();
    }
}
