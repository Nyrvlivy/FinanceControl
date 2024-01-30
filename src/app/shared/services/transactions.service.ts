import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transaction} from '@shared/types/transaction';
import {Observable, Subject, tap} from 'rxjs';

export type CreateTransactionsPayload = {
  transactions: Transaction[];
};

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl = 'http://localhost:8080/transactions';
  private transactionsUpdated = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getTransactionsUpdateListener(): Observable<void> {
    return this.transactionsUpdated.asObservable();
  }

  findAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  filterTransactions(date?: string, category?: string): Observable<Transaction[]> {
    let params = new HttpParams();
    if (date) {
      params = params.append('date', date);
    }
    if (category) {
      params = params.append('category', category);
    }
    return this.http.get<Transaction[]>(this.baseUrl, {params});
  }

  createTransactions(transactions: CreateTransactionsPayload) {
    return this.http.post(this.baseUrl, transactions).pipe(
      tap(() => {
        this.transactionsUpdated.next();
      })
    );
  }

  updateTransaction(updatedTransaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${updatedTransaction.id}`, updatedTransaction).pipe(
      tap(() => {
        this.transactionsUpdated.next();
      })
    );
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.transactionsUpdated.next();
      })
    );
  }

  deleteAllTransactions(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}`).pipe(
      tap(() => {
        this.transactionsUpdated.next();
      })
    );
  }
}
