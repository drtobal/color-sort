import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SorterService } from '../../services/sorter/sorter.service';
import { AnyObject, Bottle, BottleDragData, NewGame } from '../../types';
import { BottleComponent } from '../bottle/bottle.component';
import { BOTTLE_WIDTH, DEFAULT_BOTTLE_SIZE, DEFAULT_GAME_NAME, DEFAULT_REPEATS, DEFAULT_VARIANTS, REM_PX, TRANSITION_DURATION_COMPLEX, TRANSITION_ENTER } from '../../constants';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game/game.service';
import { NewGameButtonComponent } from '../new-game-button/new-game-button.component';
import { UtilService } from '../../services/util/util.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { NewBottleComponent } from '../new-bottle/new-bottle.component';
import { FooterComponent } from '../footer/footer.component';

const ENTER_A = style({ opacity: 0, transform: 'translateY(2rem)' });
const ENTER_B = style({ opacity: 1, transform: 'none' });

/** displays the game container */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottleComponent, NewGameButtonComponent, NewBottleComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('bottles', [
      transition('* => *', [
        query(':enter', [ENTER_A, stagger(50, [animate(TRANSITION_ENTER, ENTER_B)]),], { optional: true }),
        query(':leave', [ENTER_B, stagger(50, [animate(TRANSITION_ENTER, ENTER_A)]),], { optional: true }),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  /** array of bottles of the game */
  bottles: Bottle[] = [];

  /** check if the code is running in server side or browser */
  isBrowser: boolean = false;

  /** color variants to play with */
  variants: number = DEFAULT_VARIANTS;

  /** bottles of the same color */
  repeats: number = DEFAULT_REPEATS;

  /** colors per bottle */
  bottleSize: number = DEFAULT_BOTTLE_SIZE;

  /** game name, currently only have level name */
  gameName: string = DEFAULT_GAME_NAME;

  /** calculated bottle html element height in base of the size */
  bottleHeight: number = 0;

  /** check if game is completed, use this to display a contratulations message (TODO) */
  isCompleted: boolean = false;

  /** currently moving color bottle */
  selectedBottle: number | null = null;

  /** block any interaction while color animation is in progress */
  isMoving: boolean = false;

  /** additional empty bottles added */
  addedBottles: number = 0;

  /** subscription to new game */
  newGameSub?: Subscription;

  /** component constructor */
  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
    private gameService: GameService,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** set up the UI */
  ngOnInit(): void {
    if (this.isBrowser) {
      this.nextLevel();
      // this.bottles = this.sorterService.generateBottles(this.variants, this.repeats, this.bottleSize);
      this.newGameSub = this.gameService.newGame.subscribe(this.onNewGame.bind(this));
    }
  }

  /** clea up */
  ngOnDestroy(): void {
    this.newGameSub?.unsubscribe();
  }

  /** go to next level */
  nextLevel(): void {
    const level = this.gameService.getNextLevel();
    if (level) {
      this.onNewGame(level);
    }
  }

  /** reset entire game and start a new one */
  async onNewGame(newGame: NewGame): Promise<void> {
    const bottlesLength = this.bottles.length;
    this.bottles = [];
    this.changeDetectorRef.detectChanges();

    await UtilService.wait((bottlesLength * 50) + 200);

    this.addedBottles = 0;
    this.variants = newGame.variants;
    this.repeats = newGame.repeats;
    this.bottleSize = newGame.bottleSize;
    this.gameName = newGame.name;
    this.bottleHeight = (newGame.bottleSize * BOTTLE_WIDTH) + 0.5;
    this.bottles = this.sorterService.generateBottles(this.variants, this.repeats, this.bottleSize);
    this.changeDetectorRef.detectChanges();
  }

  /** check if game is completed */
  checkCompleted(): void {
    this.isCompleted = this.sorterService.checkBottlesFinished(this.bottles, this.bottleSize);
    if (this.isCompleted) {
      this.gameService.saveCompletedLevel(this.gameName);
      this.nextLevel();
    }
  }

  /** add a empty bottle */
  addBottle(): void {
    if (this.addedBottles === 0) {
      this.bottles.push([]);
      this.addedBottles = 1;
      this.changeDetectorRef.detectChanges();
    }
  }

  /** select a bottle, can select a new bottle, de-select bottle, change selection or move a color */
  async selectBottle(bottle: number): Promise<boolean> {
    if (this.isMoving) {
      return false;
    }

    if (this.selectedBottle === null) {
      this.selectedBottle = bottle;
      return true;
    }

    if (bottle === this.selectedBottle) {
      this.selectedBottle = null;
      return false;
    }

    const sourceIdx = this.selectedBottle;
    const targetIdx = bottle;

    if (!this.bottles[sourceIdx] || !this.bottles[targetIdx]) {
      return false;
    }

    const result = this.sorterService.moveColor(this.bottles[sourceIdx], this.bottles[targetIdx], this.bottleSize);
    if (!result.moved) {
      this.selectedBottle = bottle;
      return false;
    }

    this.isMoving = true;
    await this.moveColor(sourceIdx, targetIdx);
    this.selectedBottle = null;
    this.bottles[sourceIdx] = result.source;
    this.bottles[targetIdx] = result.target;
    this.checkCompleted();
    this.isMoving = false;
    this.changeDetectorRef.detectChanges();
    return true;
  }

  /** move color animations */
  async moveColor(sourceIndex: number, targetIndex: number): Promise<boolean> {
    const source = this.elementRef.nativeElement.querySelector(`app-bottle:nth-child(${sourceIndex + 1}) > .bottle`);
    const target = this.elementRef.nativeElement.querySelector(`app-bottle:nth-child(${targetIndex + 1}) > .bottle`) as HTMLElement;
    if (!source || !target) {
      return false;
    }

    const color = source.querySelector('.color:last-child') as HTMLDivElement;
    if (!color) {
      return false;
    }

    const startPosition = UtilService.getOffset(color);
    const targetPosition = UtilService.getOffset(target);

    const dummy = color.cloneNode(true) as HTMLDivElement;
    color.style.display = 'none';

    dummy.style.position = 'fixed';
    dummy.style.top = `${startPosition.top}px`;
    dummy.style.right = '';
    dummy.style.bottom = '';
    dummy.style.left = `${startPosition.left}px`;
    this.elementRef.nativeElement.appendChild(dummy);

    await UtilService.wait(100);

    dummy.style.left = `${targetPosition.left}px`;

    await UtilService.wait(TRANSITION_DURATION_COMPLEX);

    const bottleLength = this.bottles[targetIndex].length;
    dummy.style.top = `${targetPosition.top + (REM_PX * (this.bottleHeight - (BOTTLE_WIDTH * (bottleLength + 1))))}px`;

    await UtilService.wait(TRANSITION_DURATION_COMPLEX);
    dummy.remove();

    return true;
  }

  /** set css styles of bottles container */
  bottlesContainer(): AnyObject {
    return {'min-height': `${this.bottleHeight}rem`};
  }
}
