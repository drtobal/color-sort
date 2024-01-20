import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SorterService } from '../../services/sorter/sorter.service';
import { AnyObject, Bottle } from '../../types';

const BOTTLE_MAX = 90;

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

  @Input() variants: number = 3;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  getColorStyle(variant: number): AnyObject {
    return {
      'background-color': this.sorterService.getVariantColor(variant),
      height: `${BOTTLE_MAX / this.variants}%`,
    };
  }
}
