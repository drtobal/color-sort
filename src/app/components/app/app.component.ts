import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SorterService } from '../../services/sorter/sorter.service';
import { Bottle, BottleDragData, NewGame } from '../../types';
import { BottleComponent } from '../bottle/bottle.component';
import { CdkDragDrop, CdkDragRelease, DragDropModule } from '@angular/cdk/drag-drop';
import { NewGameComponent } from '../new-game/new-game.component';
import { DEFAULT_BOTTLE_SIZE, DEFAULT_GAME_NAME, DEFAULT_REPEATS, DEFAULT_VARIANTS } from '../../constants';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game/game.service';
import { NewGameButtonComponent } from '../new-game-button/new-game-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottleComponent, DragDropModule, NewGameComponent, NewGameButtonComponent],
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

  newGameSub?: Subscription;

  constructor(
    private sorterService: SorterService,
    private changeDetectorRef: ChangeDetectorRef,
    private gameService: GameService,
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

  cdkDragEnded(event: CdkDragRelease): void {
    event.source.reset();
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

  cdkDropListDropped(event: CdkDragDrop<any>): void {
    if (event.container.data.length === 1) {
      const sourceIdx = event.item.data.index;
      const targetIdx = event.container.data[0].index;
      if (this.bottles[sourceIdx] && this.bottles[targetIdx]) {
        const result = this.sorterService.moveColor(this.bottles[sourceIdx], this.bottles[targetIdx], this.bottleSize);

        if (result.moved) {
          this.bottles[sourceIdx] = result.source;
          this.bottles[targetIdx] = result.target;
          this.changeDetectorRef.detectChanges();
          this.checkCompleted();
        }
      }
    }
  }
}
