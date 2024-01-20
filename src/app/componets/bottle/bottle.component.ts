import { animate, query, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BOTTLE_MAX } from '../../constants';
import { SorterService } from '../../services/sorter/sorter.service';
import { AnyObject, Bottle } from '../../types';

const COLOR_ENTER = style({ 'max-height': 0 });

const COLOR_LEAVE = style({ 'max-height': '2rem' });

@Component({
  selector: 'app-bottle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottle.component.html',
  styleUrl: './bottle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('colorAnimation', [
      transition('* => *', [
        query(':enter', [COLOR_ENTER, animate('0.5s', COLOR_LEAVE)], { optional: true }),
        query(':leave', [COLOR_LEAVE, animate('0.5s', COLOR_ENTER)], { optional: true }),
      ]),
    ]),
  ],
})
export class BottleComponent {
  @Input() bottle?: Bottle;

  @Input() variants: number = 3;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing */ }

  getColorStyle(variant: number): AnyObject {
    return {
      'background-color': this.sorterService.getVariantColor(variant),
      height: `${BOTTLE_MAX / this.variants}%`,
    };
  }
}
