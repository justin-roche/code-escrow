import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { GenerateComponent } from './generate/generate.component';
import { RecordsTableComponent } from './records-table/records-table.component';
import { routes } from './app.router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SubmissionFormComponent,
        GenerateComponent,
        RecordsTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            routes,
            {
                useHash: false
            })


        HttpClientModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
