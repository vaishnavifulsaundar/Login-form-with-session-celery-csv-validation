import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeleryUIComponent } from './celery-ui.component';

describe('CeleryUIComponent', () => {
  let component: CeleryUIComponent;
  let fixture: ComponentFixture<CeleryUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeleryUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeleryUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
