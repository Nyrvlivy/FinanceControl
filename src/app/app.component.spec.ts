import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent, HeaderComponent } from './core';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { MatDividerModule } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        AppMaterialModule,
        NgOptimizedImage,
        MatDividerModule,
      ],
      declarations: [AppComponent, HeaderComponent, FooterComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FinanceControl'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FinanceControl');
  });

  it('should render header and footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header')!;
    const footer = compiled.querySelector('app-footer')!;

    expect(header.querySelector('.project-link')).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(footer.querySelector('.footer-text')?.textContent).toContain(
      'IBM Challenge 2024',
    );
  });
});
