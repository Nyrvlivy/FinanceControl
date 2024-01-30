import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
