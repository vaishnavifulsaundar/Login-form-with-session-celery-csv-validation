import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GochartComponent } from './gochart.component';

describe('GochartComponent', () => {
  let component: GochartComponent;
  let fixture: ComponentFixture<GochartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GochartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GochartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
