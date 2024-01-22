import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBottleComponent } from './new-bottle.component';

describe('NewBottleComponent', () => {
  let component: NewBottleComponent;
  let fixture: ComponentFixture<NewBottleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBottleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
