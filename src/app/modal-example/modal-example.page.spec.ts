import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalExamplePage } from 'modal-example.page';

describe('ModalExamplePage', () => {
  let component: ModalExamplePage;
  let fixture: ComponentFixture<ModalExamplePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
