import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class NewGameComponent implements AfterViewInit, OnDestroy {

  @Input() closeOnExit: boolean = true;

  dialog?: MatDialogRef<NewGameDialogComponent>;

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    this.dialog = this.matDialog.open(NewGameDialogComponent);
  }

  ngOnDestroy(): void {
    if (this.closeOnExit) {
      this.dialog?.close();
    }
  }
}
