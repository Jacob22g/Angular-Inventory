import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './Item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiServerUrl}/items`);
    }

    public addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(`${this.apiServerUrl}/items`, item);
    }

    public updateItem(item: Item): Observable<Item> {
        return this.http.put<Item>(`${this.apiServerUrl}/items`, item);
    }
    // public updateItem(itemId: number): Observable<Item> {
    //     return this.http.put<Item>(`${this.apiServerUrl}/items/${itemId}`, item);
    // }

    public deleteItem(itemId: number): Observable<Item> {
        return this.http.delete<Item>(`${this.apiServerUrl}/items/${itemId}`);
    }
}