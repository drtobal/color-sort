import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-game-dialog.component.html',
  styleUrl: './new-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogComponent {

  form = new FormGroup({
    variants: new FormControl(1),
    repeats: new FormControl(1),
  });

  /** component constructor */
  constructor(
    private gameService: GameService,
  ) { /* do nothing */ }

  newGame(): void {

  }
}
