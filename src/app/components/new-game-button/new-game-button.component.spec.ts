import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NewGameButtonComponent } from './new-game-button.component';

describe('NewGameButtonComponent', () => {
  let component: NewGameButtonComponent;
  let fixture: ComponentFixture<NewGameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewGameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog and after time, remove the child component', fakeAsync(() => {
    component.hasDialog = false;
    component.openDialog();
    expect(component.hasDialog).toBeTrue();
    tick(500);
    expect(component.hasDialog).toBeFalse();
  }));
});
