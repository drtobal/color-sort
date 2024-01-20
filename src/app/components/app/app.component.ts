import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SorterService } from '../../services/sorter/sorter.service';
import { Bottle, BottleDragData } from '../../types';
import { BottleComponent } from '../../componets/bottle/bottle.component';
import { CdkDragDrop, CdkDragRelease, CdkDragStart, DragDropModule } from '@angular/cdk/drag-drop';

const DRAG_CLASS = 'dragging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottleComponent, DragDropModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  bottles: Bottle[] = [];

  /** check if the code is running in server side or browser */
  isBrowser: boolean = false;

  variants: number = 3;

  repeats: number = 1;

  isCompleted: boolean = false;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.bottles = this.sorterService.generateBottles(this.variants, this.repeats);
    }
  }

  cdkDragEnded(event: CdkDragRelease): void {
    event.source.reset();
  }

  getDragData(bottle: Bottle, index: number): BottleDragData {
    return { bottle, index };
  }

  cdkDropListDropped(event: CdkDragDrop<any>): void {
    if (event.container.data.length === 1) {
      const sourceIdx = event.item.data.index;
      const targetIdx = event.container.data[0].index;
      if (this.bottles[sourceIdx] && this.bottles[targetIdx]) {
        const result = this.sorterService.moveLiquid(this.bottles[sourceIdx], this.bottles[targetIdx]);

        if (result.moved) {
          this.bottles[sourceIdx] = result.source;
          this.bottles[targetIdx] = result.target;
          this.isCompleted = this.sorterService.checkBottlesFinished(this.bottles, this.variants);
          this.changeDetectorRef.detectChanges();
        }
      }
    }
  }
}
