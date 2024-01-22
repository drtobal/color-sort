import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BOTTLE_MAX, DEFAULT_BOTTLE_SIZE } from '../../constants';
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

  @Input() bottleSize: number = DEFAULT_BOTTLE_SIZE;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing */ }

  getColorStyle(variant: number): AnyObject {
    return {
      'background-color': this.sorterService.getVariantColor(variant),
      height: `${BOTTLE_MAX / this.bottleSize}%`,
    };
  }
}
