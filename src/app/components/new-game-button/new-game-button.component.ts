import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { NewGameComponent } from '../new-game/new-game.component';

/** button of new game as placeholder, when is clicked defer the dependences */
@Component({
  selector: 'app-new-game-button',
  standalone: true,
  imports: [CommonModule, MatRippleModule, NewGameComponent],
  templateUrl: './new-game-button.component.html',
  styleUrl: './new-game-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameButtonComponent {
  /** check if has dialog to defer it */
  hasDialog: boolean = false;

  /** component constructor */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing */ }

  /** open the dialog and then, clean the html to enable a new display dialog */
  openDialog(): void {
    this.hasDialog = true;
    setTimeout(() => {
      this.hasDialog = false;
      this.changeDetectorRef.detectChanges();
    }, 100);
    this.changeDetectorRef.detectChanges();
  }
}
