import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { noop } from 'rxjs';
import { RANGE_BOTTLE_SIZE, RANGE_REPEATS, RANGE_VARIANTS, LEVELS, DEFAULT_GAME_NAME } from '../../constants';

import { NewGameDialogComponent } from './new-game-dialog.component';

describe('NewGameDialogComponent', () => {
  let component: NewGameDialogComponent;
  let fixture: ComponentFixture<NewGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: noop } },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit the form', () => {
    component.form.patchValue({ name: '', variants: 0, repeats: 0, bottleSize: 0 });
    // invalid form
    component['gameService']['_newGame'] = { next: jasmine.createSpy() } as any;
    component.newGame();
    expect(component['gameService']['_newGame'].next).not.toHaveBeenCalled();
  });

  it('should submit the form and close the dialog', () => {
    component.form.patchValue({
      name: LEVELS[0].name,
      variants: RANGE_VARIANTS.min,
      repeats: RANGE_REPEATS.max,
      bottleSize: RANGE_BOTTLE_SIZE.min,
    });
    // invalid form
    component['gameService']['_newGame'] = { next: jasmine.createSpy() } as any;
    component.newGame();
    expect(component['gameService']['_newGame'].next).toHaveBeenCalled();
  });

  it('should submit the form with default values', () => {
    component.form.controls.name.clearValidators();
    component.form.controls.variants.clearValidators();
    component.form.controls.repeats.clearValidators();
    component.form.controls.bottleSize.clearValidators();
    component.form.patchValue({ name: '', variants: 0, repeats: 0, bottleSize: 0 });
    // invalid form
    component['gameService']['_newGame'] = { next: jasmine.createSpy() } as any;
    component.newGame();
    expect(component['gameService']['_newGame'].next).toHaveBeenCalledWith(jasmine.objectContaining({ name: DEFAULT_GAME_NAME }));
  });
});
