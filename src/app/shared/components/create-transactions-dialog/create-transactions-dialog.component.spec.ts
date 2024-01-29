import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionsDialogComponent } from './create-transactions-dialog.component';

describe('CreateTransactionsDialogComponent', () => {
  let component: CreateTransactionsDialogComponent;
  let fixture: ComponentFixture<CreateTransactionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTransactionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
