import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BOTTLE_WIDTH, DEFAULT_BOTTLE_SIZE } from '../../constants';
import { SorterService } from '../../services/sorter/sorter.service';
import { AnyObject, Bottle } from '../../types';

/** displays a bottle and its colors */
@Component({
  selector: 'app-bottle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottle.component.html',
  styleUrl: './bottle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottleComponent {
  /** bottle to display */
  @Input() bottle?: Bottle;

  /** check if this bottle is selected */
  @Input() isSelected: boolean = false;

  /** css height size of the bottle */
  @Input() bottleHeight: number = 0;

  /** colors per bottle */
  @Input() bottleSize: number = DEFAULT_BOTTLE_SIZE;

  /** component constructor */
  constructor(
    private sorterService: SorterService,
  ) { /* do nothing */ }

  /** css styles fot the bottle */
  getBottleStyle(): AnyObject {
    return {
      width: `${BOTTLE_WIDTH}rem`,
      height: `${this.bottleHeight}rem`,
    };
  }

  /** css styles for a color */
  getColorStyle(index: number, selected: boolean): AnyObject {
    const style: AnyObject = {
      width: `${BOTTLE_WIDTH}rem`,
      height: `${BOTTLE_WIDTH}rem`,
      left: 0,
      bottom: `${index * BOTTLE_WIDTH}rem`,
    };
    if (selected) {
      style['bottom'] = `${this.bottleHeight + 1}rem`;
    }
    return style;
  }

  /** add styles to identify the color */
  getColorBg(variant: number): AnyObject {
    return {
      background: this.sorterService.getVariantColor(variant),
    };
  }
}
