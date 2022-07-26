import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
    private story$ = new BehaviorSubject<any>({});
    private history$ = new BehaviorSubject<any>([]);
    selectedStory$ = this.story$.asObservable();
    selectedHistory$ = this.history$.asObservable();
    constructor() { }

    setStory(story: any) {
        this.story$.next(story);
    }

    setSearchHistory(history: any) {
        this.history$.next(history);
    }
}