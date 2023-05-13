import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesafioaceptadoComponent } from './desafioaceptado.component';

describe('DesafioaceptadoComponent', () => {
  let component: DesafioaceptadoComponent;
  let fixture: ComponentFixture<DesafioaceptadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesafioaceptadoComponent]
    });
    fixture = TestBed.createComponent(DesafioaceptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
