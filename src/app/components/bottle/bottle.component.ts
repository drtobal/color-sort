import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BOTTLE_HEIGHT, BOTTLE_WIDTH, DEFAULT_BOTTLE_SIZE } from '../../constants';
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

  getColorStyle(index: number, selected: boolean): AnyObject {
    const style: AnyObject = {
      width: `${BOTTLE_WIDTH}rem`,
      height: `${BOTTLE_WIDTH}rem`,
      left: 0,
      bottom: `${index * BOTTLE_WIDTH}rem`,
    };
    if (selected) {
      style['bottom'] = `${BOTTLE_HEIGHT + 1}rem`;
    }
    return style;
  }

  getColorBg(variant: number): AnyObject {
    return {
      'background-color': this.sorterService.getVariantColor(variant),
    };
  }
}
