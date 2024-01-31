import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransactionDialogComponent } from './update-transaction-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Transaction } from '@app/shared/types/transaction';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from '@app/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { TransactionsService } from '@app/shared/services/transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

const mockTransaction: Transaction = {
  id: 1,
  date: '2023-01-01',
  value: 100,
  category: 'Groceries',
};

describe('UpdateTransactionDialogComponent', () => {
  let component: UpdateTransactionDialogComponent;
  let fixture: ComponentFixture<UpdateTransactionDialogComponent>;

  let mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  let mockSnackBar: any;
  let mockTransactionsService: any;
  let mockDatePipe: DatePipe;

  beforeEach(async () => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockTransactionsService = jasmine.createSpyObj('TransactionsService', [
      'updateTransaction',
    ]);
    mockDatePipe = new DatePipe('en-US');

    await TestBed.configureTestingModule({
      declarations: [UpdateTransactionDialogComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockTransaction,
        },
        { provide: TransactionsService, useValue: mockTransactionsService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: DatePipe, useValue: mockDatePipe },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with updated false when cancel clicked', () => {
    component.onCancelClick();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ updated: false });
  });

  it('should successfully call updateTransaction when onSaveClick is called with valid form', () => {
    component.isFormValid = true;
    component.transaction = { ...mockTransaction, date: '2023-01-01' };
    mockTransactionsService.updateTransaction.and.returnValue(of());

    component.onSaveClick();

    expect(mockTransactionsService.updateTransaction).toHaveBeenCalled();
  });

  it('should open snack bar with appropriate message for each validation error', () => {
    component.transaction = { id: null, date: '', value: 0, category: '' };
    component.displayErrorMessages();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Transaction ID is required',
      'Close',
      { duration: 3000 },
    );
  });

  it('should open snack bar with appropriate message for each validation error', () => {
    component.transaction = { id: 1, date: '', value: 0, category: '' };
    component.displayErrorMessages();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Date cannot be null',
      'Close',
      { duration: 3000 },
    );
  });

  it('should open snack bar with appropriate message for each validation error', () => {
    component.transaction = {
      id: 1,
      date: '2023-11-11',
      value: 0,
      category: '',
    };
    component.displayErrorMessages();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Value cannot be zero or empty',
      'Close',
      { duration: 3000 },
    );
  });

  it('should open snack bar with appropriate message for each validation error', () => {
    component.transaction = {
      id: 1,
      date: '2023-11-11',
      value: 113,
      category: '',
    };
    component.displayErrorMessages();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Category cannot be null',
      'Close',
      { duration: 3000 },
    );
  });
});
