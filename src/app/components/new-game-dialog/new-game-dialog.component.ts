import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DEFAULT_BOTTLE_SIZE, DEFAULT_GAME_NAME, DEFAULT_REPEATS, DEFAULT_VARIANTS, RANGE_BOTTLE_SIZE, RANGE_REPEATS, RANGE_VARIANTS } from '../../constants';
import { GameService } from '../../services/game/game.service';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatRippleModule],
  templateUrl: './new-game-dialog.component.html',
  styleUrl: './new-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogComponent {

  form = new FormGroup({
    variants: new FormControl(DEFAULT_VARIANTS, [Validators.required, Validators.min(RANGE_VARIANTS.min), Validators.max(RANGE_VARIANTS.max)]),
    repeats: new FormControl(DEFAULT_REPEATS, [Validators.required, Validators.min(RANGE_REPEATS.min), Validators.max(RANGE_REPEATS.max)]),
    bottleSize: new FormControl(DEFAULT_BOTTLE_SIZE, [Validators.required, Validators.min(RANGE_BOTTLE_SIZE.min), Validators.max(RANGE_BOTTLE_SIZE.max)]),
    name: new FormControl(DEFAULT_GAME_NAME, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });

  /** component constructor */
  constructor(
    private matDialogRef: MatDialogRef<NewGameDialogComponent>,
    private gameService: GameService,
  ) { /* do nothing */ }

  newGame(): void {
    if (this.form.valid) {
      this.gameService.newGame.next({
        bottleSize: this.form.controls.variants.value || DEFAULT_BOTTLE_SIZE,
        name: this.form.controls.name.value || DEFAULT_GAME_NAME,
        repeats: this.form.controls.repeats.value || DEFAULT_REPEATS,
        variants: this.form.controls.variants.value || DEFAULT_VARIANTS,
      });
      this.matDialogRef.close();
    }
  }
}
