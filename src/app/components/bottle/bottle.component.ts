import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BOTTLE_HEIGHT, BOTTLE_WIDTH, COLOR_GAP, DEFAULT_BOTTLE_SIZE, REM_PX } from '../../constants';
import { SorterService } from '../../services/sorter/sorter.service';
import { AnyObject, Bottle } from '../../types';

@Component({
  selector: 'app-bottle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottle.component.html',
  styleUrl: './bottle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottleComponent {
  @Input() bottle?: Bottle;

  @Input() isSelected: boolean = false;

  @Input() bottleSize: number = DEFAULT_BOTTLE_SIZE;

  @Output() selectBottle = new EventEmitter<void>();

  bottleWidth: number = BOTTLE_WIDTH - COLOR_GAP;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing */ }

  getBottleStyle(): AnyObject {
    return {
      width: `${BOTTLE_WIDTH}rem`,
      height: `${BOTTLE_HEIGHT}rem`,
    };
  }

  getColorStyle(variant: number, index: number, selected: boolean): AnyObject {
    const style: AnyObject = {
      'background-color': this.sorterService.getVariantColor(variant),
      width: `${this.bottleWidth}rem`,
      height: `${this.bottleWidth}rem`,
      left: 0,
      bottom: `${index * this.bottleWidth}rem`,
    };
    if (selected) {
      style['bottom'] = `${BOTTLE_HEIGHT}rem`;
    }
    return style;
  }
}
