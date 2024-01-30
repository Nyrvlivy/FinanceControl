import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from "@shared/types/transaction";

export type CreateTransactionsPayload = {
  transactions: Transaction[];
};

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {
  }

  createTransactions(transactions: CreateTransactionsPayload) {
    return this.http.post(this.baseUrl, transactions);
  }
}
