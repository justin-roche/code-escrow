import { Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { flatMap, map, catchError, delay, throttleTime, concatMap, bufferTime, switchMap, toArray } from 'rxjs/operators'
import { Observable, Subject, pipe, of, from, interval, concat, timer, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { RecordsTableComponent } from './records-table/records-table.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'landing' },

    {
        path: 'landing', pathMatch: 'full', component: LandingComponent,
    },
    {
        path: 'inquiry', pathMatch: 'full', component: SubmissionFormComponent,
    },
    {
        path: 'records', pathMatch: 'full', component: RecordsTableComponent,
    }
];
