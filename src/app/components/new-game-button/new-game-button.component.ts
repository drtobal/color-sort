import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { NewGameComponent } from '../new-game/new-game.component';

@Component({
  selector: 'app-new-game-button',
  standalone: true,
  imports: [CommonModule, MatRippleModule, NewGameComponent],
  templateUrl: './new-game-button.component.html',
  styleUrl: './new-game-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameButtonComponent {
  hasDialog: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing */ }

  openDialog(): void {
    this.hasDialog = true;
    setTimeout(() => {
      this.hasDialog = false;
      this.changeDetectorRef.detectChanges();
    }, 100);
    this.changeDetectorRef.detectChanges();
  }
}
