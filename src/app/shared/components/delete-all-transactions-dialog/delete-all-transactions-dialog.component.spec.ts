import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllTransactionsDialogComponent } from './delete-all-transactions-dialog.component';

describe('DeleteAllTransactionsDialogComponent', () => {
  let component: DeleteAllTransactionsDialogComponent;
  let fixture: ComponentFixture<DeleteAllTransactionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAllTransactionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAllTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
