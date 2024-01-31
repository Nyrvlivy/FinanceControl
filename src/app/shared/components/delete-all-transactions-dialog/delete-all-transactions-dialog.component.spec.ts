import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllTransactionsDialogComponent } from './delete-all-transactions-dialog.component';
import { AppMaterialModule } from '@app/shared/app-material/app-material.module';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('DeleteAllTransactionsDialogComponent', () => {
  let component: DeleteAllTransactionsDialogComponent;
  let fixture: ComponentFixture<DeleteAllTransactionsDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAllTransactionsDialogComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        AppMaterialModule,
        SharedModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAllTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when onDelete is called', () => {
    component.onDelete();
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should return false when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
