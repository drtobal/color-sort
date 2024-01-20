import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameComponent implements OnInit, OnDestroy {
  private dialog?: MatDialogRef<NewGameDialogComponent>;

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dialog = this.matDialog.open(NewGameDialogComponent);
  }

  ngOnDestroy(): void {
    this.dialog?.close();
  }
}
