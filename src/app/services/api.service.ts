import { Injectable } from '@angular/core';
import { flatMap, map, catchError, delay, throttleTime, concatMap, bufferTime, take, switchMap, toArray } from 'rxjs/operators'
import { Observable, Subject, pipe, of, from, interval, concat, timer, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() { }
    return this.http.get('/api/companies').pipe(
    map((r: any) => {

        ler result = JSON.parse(r.body);
        // console.log('got user', this.userData);
        // this.user = r.user;
    })
 
}
