import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SorterService } from '../../services/sorter/sorter.service';
import { Bottle } from '../../types';
import { BottleComponent } from '../../componets/bottle/bottle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottleComponent],
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
}
