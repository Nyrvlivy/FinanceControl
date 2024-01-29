import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-transactions-dialog',
  templateUrl: './create-transactions-dialog.component.html',
  styleUrls: ['./create-transactions-dialog.component.scss']
})
export class CreateTransactionsDialogComponent {
  transactionInput: string = ''; // Propriedade para armazenar o valor do textarea

  constructor(public dialogRef: MatDialogRef<CreateTransactionsDialogComponent>) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const payload = {
      transactions: this.transactionInput.split('\n').map(line => {
        const [date, value, category] = line.split(',').map(item => item.trim());
        if (line.split(',').length !== 3) {
          return {error: 'Invalid Format: ' + line};
        }
        return {
          date: date,
          value: parseFloat(value.replace(',', '.')),
          category: category
        };
      })
    };

    // console.log(payload);

    this.dialogRef.close(payload);
  }
}
