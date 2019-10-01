import { Injectable } from '@angular/core';
import { flatMap, map, catchError, delay, throttleTime, concatMap, bufferTime, take, switchMap, toArray } from 'rxjs/operators'
import { Observable, Subject, pipe, of, from, interval, concat, timer, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    getItems() {
        return this.http.get('/api/companies').pipe(
            map((r: any) => {
                let result = JSON.parse(r.body);
                // console.log('got user', this.userData);
            })
        )
    }
}
