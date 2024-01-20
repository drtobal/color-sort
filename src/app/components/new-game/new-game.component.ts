import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameComponent {

}
