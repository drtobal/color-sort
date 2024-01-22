import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-bottle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-bottle.component.html',
  styleUrl: './new-bottle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBottleComponent {
  @Input() disabled: boolean = true;
}
