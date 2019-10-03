import { Injectable } from '@angular/core';
import { flatMap, map, catchError, delay, throttleTime, concatMap, bufferTime, take, switchMap, toArray } from 'rxjs/operators'
import { Observable, Subject, pipe, of, from, interval, concat, timer, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    submit(d) {
        return this.http.post('/api/submit', { data: d }).pipe(
            map((r: any) => {
                return r;
            })
        )
    }

    getRecords() {
        return this.http.get('/api/companies').pipe(
            map((r: any) => {
                return r;
            })
        )
    }
}
