import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';

/** TODO: currently unused component to configure a new game, defer this component to load dependences only when it's needed */
@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameComponent implements AfterViewInit, OnDestroy {
  /** automatically close the dialog when component is destroyed? */
  @Input() closeOnExit: boolean = true;

  /** displayed dialog */
  dialog?: MatDialogRef<NewGameDialogComponent>;

  /** component constructor */
  constructor(
    private matDialog: MatDialog,
  ) { /*  do nothing*/ }

  /** displays a child dialog */
  ngAfterViewInit(): void {
    this.dialog = this.matDialog.open(NewGameDialogComponent);
  }

  /** close the dialog */
  ngOnDestroy(): void {
    if (this.closeOnExit) {
      this.dialog?.close();
    }
  }
}
