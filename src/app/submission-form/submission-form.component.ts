import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-submission-form',
    templateUrl: './submission-form.component.html',
    styleUrls: ['./submission-form.component.css']
})

export class SubmissionFormComponent {

    private inquiry = {
        company: "",
        email: "",
        framework: null,
        task: "",
    };

    constructor(private api: ApiService, private r: Router) { }

    onSubmit() {
        this.api.submit(this.inquiry).subscribe((r) => {
            this.r.navigate(['records']);
        })
    }
}
