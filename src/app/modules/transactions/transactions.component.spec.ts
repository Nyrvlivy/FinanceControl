import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionsComponent } from './transactions.component';
import { AppMaterialModule } from '@app/shared/app-material/app-material.module';
import { SharedModule } from '@app/shared/shared.module';
import { NgOptimizedImage } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        AppMaterialModule,
        SharedModule,
        NgOptimizedImage,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
