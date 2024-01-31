import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTableComponent } from './transactions-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from '@app/shared/app-material/app-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionsService } from '@app/shared/services/transactions.service';
import { Transaction } from '@app/shared/types/transaction';
import { of } from 'rxjs';

describe('TransactionsTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;
  let mockTransactionsService: any;

  beforeEach(async () => {
    mockTransactionsService = jasmine.createSpyObj('TransactionsService', [
      'filterTransactions',
      'getTransactionsUpdateListener',
      'deleteTransaction',
    ]);
    mockTransactionsService.filterTransactions.and.returnValue(
      of(/* mocked transactions */),
    );
    mockTransactionsService.getTransactionsUpdateListener.and.returnValue(
      of(/* mocked value */),
    );
    mockTransactionsService.deleteTransaction.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [TransactionsTableComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        AppMaterialModule,
      ],
      providers: [
        { provide: TransactionsService, useValue: mockTransactionsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to transaction updates on ngOnInit', () => {
    spyOn(component, 'loadFilteredTransactions');

    component.ngOnInit();

    expect(component.loadFilteredTransactions).toHaveBeenCalled();
    expect(
      mockTransactionsService.getTransactionsUpdateListener,
    ).toHaveBeenCalled();
  });

  it('should call deleteTransaction and reload transactions on success', () => {
    spyOn(component, 'loadFilteredTransactions');

    component.deleteTransaction(123);

    expect(mockTransactionsService.deleteTransaction).toHaveBeenCalledWith(123);
    expect(component.loadFilteredTransactions).toHaveBeenCalled();
  });

  it('should calculate total correctly', () => {
    component.dataSource.data = [
      { value: 10 },
      { value: 20 },
      { value: 30 },
    ] as Transaction[];

    expect(component.calculateTotal()).toBe(60);

    component.dataSource.data = [
      { value: 10 },
      { value: -20 },
      { value: -80 },
    ] as Transaction[];

    expect(component.calculateTotal()).toBe(-90);
  });

  it('should toggle total visibility', () => {
    const initialVisibility = component.isTotalVisible;

    component.toggleTotalVisibility();

    expect(component.isTotalVisible).toBe(!initialVisibility);
  });
});
