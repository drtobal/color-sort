import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [],
  templateUrl: './new-game-dialog.component.html',
  styleUrl: './new-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogComponent {

}
