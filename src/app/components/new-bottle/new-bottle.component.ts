import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** button to add a new bottle */
@Component({
  selector: 'app-new-bottle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-bottle.component.html',
  styleUrl: './new-bottle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBottleComponent {
  /** check if button is disabled */
  @Input() disabled: boolean = true;
}
