import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingModalPage } from './parking.modal.page';

describe('ParkingModalPage', () => {
  let component: ParkingModalPage;
  let fixture: ComponentFixture<ParkingModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
