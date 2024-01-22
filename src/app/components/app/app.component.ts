import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SorterService } from '../../services/sorter/sorter.service';
import { Bottle, BottleDragData, NewGame } from '../../types';
import { BottleComponent } from '../bottle/bottle.component';
import { NewGameComponent } from '../new-game/new-game.component';
import { BOTTLE_HEIGHT, BOTTLE_WIDTH, DEFAULT_BOTTLE_SIZE, DEFAULT_GAME_NAME, DEFAULT_REPEATS, DEFAULT_VARIANTS, REM_PX, TRANSITION_DURATION_COMPLEX } from '../../constants';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game/game.service';
import { NewGameButtonComponent } from '../new-game-button/new-game-button.component';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottleComponent, NewGameComponent, NewGameButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  bottles: Bottle[] = [];

  /** check if the code is running in server side or browser */
  isBrowser: boolean = false;

  variants: number = DEFAULT_VARIANTS;

  repeats: number = DEFAULT_REPEATS;

  bottleSize: number = DEFAULT_BOTTLE_SIZE;

  gameName: string = DEFAULT_GAME_NAME;

  isCompleted: boolean = false;

  selectedBottle: number | null = null;

  isMoving: boolean = false;

  newGameSub?: Subscription;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
    private gameService: GameService,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.nextLevel();
      // this.bottles = this.sorterService.generateBottles(this.variants, this.repeats, this.bottleSize);
      this.newGameSub = this.gameService.newGame.subscribe(this.onNewGame.bind(this));
    }
  }

  ngOnDestroy(): void {
    this.newGameSub?.unsubscribe();
  }

  nextLevel(): void {
    const level = this.gameService.getNextLevel();
    if (level) {
      this.onNewGame(level);
    }
  }

  onNewGame(newGame: NewGame): void {
    this.variants = newGame.variants;
    this.repeats = newGame.repeats;
    this.bottleSize = newGame.bottleSize;
    this.gameName = newGame.name;
    this.bottles = this.sorterService.generateBottles(this.variants, this.repeats, this.bottleSize);
    this.changeDetectorRef.detectChanges();
  }

  getDragData(bottle: Bottle, index: number): BottleDragData {
    return { bottle, index };
  }

  checkCompleted(): void {
    this.isCompleted = this.sorterService.checkBottlesFinished(this.bottles, this.bottleSize);
    if (this.isCompleted) {
      this.gameService.saveCompletedLevel(this.gameName);
      this.nextLevel();
    }
  }

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

    console.log(result);

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
    dummy.style.top = `${targetPosition.top + (REM_PX * (BOTTLE_HEIGHT - (BOTTLE_WIDTH * (bottleLength + 1))))}px`;

    await UtilService.wait(TRANSITION_DURATION_COMPLEX);
    dummy.remove();

    return true;
  }
}
