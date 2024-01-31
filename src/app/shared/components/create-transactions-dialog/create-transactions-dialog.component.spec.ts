import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionsDialogComponent } from './create-transactions-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppMaterialModule } from '@app/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionsService } from '@app/shared/services/transactions.service';
import { of } from 'rxjs';

describe('CreateTransactionsDialogComponent', () => {
  let component: CreateTransactionsDialogComponent;
  let fixture: ComponentFixture<CreateTransactionsDialogComponent>;
  let mockTransactionsService: any;
  let mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    mockTransactionsService = jasmine.createSpyObj('TransactionsService', [
      'createTransactions',
    ]);
    mockTransactionsService.createTransactions.and.returnValue(
      of(/* mocked transactions */),
    );
    await TestBed.configureTestingModule({
      declarations: [CreateTransactionsDialogComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: TransactionsService,
          useValue: mockTransactionsService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close when onCancel is called', () => {
    component.onCancelClick();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should correctly create the transaction when onSaveClick is called', () => {
    spyOn(component, 'parseTransaction' as never).and.callThrough();
    spyOn(component, 'isValidLine' as never).and.callThrough();
    component.transactionInput = `2023-01-01,100,Groceries
2023-01-01,100,Groceries
2023-01-01,100,Groceries`;

    component.onSaveClick();

    expect(component['isValidLine']).toHaveBeenCalled();
    expect(component['isValidLine']).toHaveBeenCalledTimes(4);
    expect(component['parseTransaction']).toHaveBeenCalled();
    expect(mockTransactionsService.createTransactions).toHaveBeenCalled();
  });

  it('should open snack when transactions are invalid', () => {
    spyOn(component, 'isValidLine' as never).and.callThrough();
    spyOn(component, 'showSnackBar' as never).and.callThrough();
    component.transactionInput = `2023-01-01,100`;

    component.onSaveClick();

    expect(component['showSnackBar']).toHaveBeenCalled();
  });
});
