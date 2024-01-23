import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up on new game', fakeAsync(() => {
    component.bottles = [];
    component.addedBottles = 2;
    component.gameName = '...';
    component.onNewGame({ name: 'demo', bottleSize: 3, repeats: 2, variants: 2 });
    expect(component.bottles.length).toBe(0);
    expect(component.addedBottles).toBe(2);
    expect(component.gameName).toBe('...');

    tick(2000);

    expect(component.bottleSize).toBe(3);
    expect(component.repeats).toBe(2);
    expect(component.variants).toBe(2);
    expect(component.bottles.length).toBe(5); // 4 bottles plus one empty
    expect(component.addedBottles).toBe(0);
    expect(component.gameName).toBe('demo');
  }));

  it('should move a color between bottles, if it can', (done) => {
    (async () => {
      component.isMoving = true;
      component.bottles = [];
      // moving, can't select
      expect(await component.selectBottle(0)).toBeFalse();

      component.isMoving = false;
      component.selectedBottle = null;
      // just select the bottle
      await component.selectBottle(0);
      expect(component.selectedBottle).toBe(0 as any);

      // if same bottle, deselect it
      await component.selectBottle(0);
      expect(component.selectedBottle).toBeNull();

      // select out of bounds bottles
      expect(await component.selectBottle(10)).toBeTrue();
      expect(component.selectedBottle).toBe(10 as any);
      expect(await component.selectBottle(20)).toBeFalse();

      // select out of bounds bottles, but only second
      component.bottles = [[1, 2], [1], [2]];
      component.selectedBottle = null;
      expect(await component.selectBottle(0)).toBeTrue();
      expect(component.selectedBottle).toBe(0 as any);
      expect(await component.selectBottle(20)).toBeFalse();

      // correct selection but forbidden movement
      component.bottles = [[1, 2], [1], [2]];
      component.selectedBottle = null;
      component['sorterService']['moveColor'] = jasmine.createSpy().and.returnValue({ moved: false, source: [], target: [] });
      expect(await component.selectBottle(1)).toBeTrue();
      expect(component.selectedBottle).toBe(1 as any);
      expect(await component.selectBottle(0)).toBeFalse();

      // correct selection but forbidden movement
      component.bottles = [[1, 2], [1], [2]];
      component.selectedBottle = null;
      component['sorterService']['moveColor'] = jasmine.createSpy().and.returnValue({ moved: true, source: [], target: [] });
      component['moveColor'] = jasmine.createSpy().and.returnValue(new Promise(s => { s(true) }));
      expect(await component.selectBottle(0)).toBeTrue();
      expect(component.selectedBottle).toBe(0 as any);
      expect(await component.selectBottle(1)).toBeTrue();

      done();
    })();
  });

  it('should make the animations of color movement', fakeAsync(() => {
    (async () => {
      component.bottles = [[1, 2], [1], [2]];
      expect(await component.moveColor(0, 1)).toBeFalse();

      component['elementRef'].nativeElement.innerHTML = `
      <div>
      <app-bottle><div class="bottle"></div></app-bottle>
      <app-bottle><div class="bottle"></div></app-bottle>
      </div>
      `;
      expect(await component.moveColor(0, 1)).toBeFalse();

      component['elementRef'].nativeElement.innerHTML = `
      <div>
      <app-bottle><div class="bottle"><div class="color"></div></div></app-bottle>
      <app-bottle><div class="bottle"><div class="color"></div></div></app-bottle>
      </div>
      `;

      component.moveColor(0, 1).then(result => expect(result).toBeTrue());

      tick(100000);
    })();
  }));

  it('should add a new bottle once', () => {
    component.bottles = [[1]];
    component.addedBottles = 0;
    component.addBottle();
    expect(component.bottles).toEqual([[1], []]);

    component.addBottle();
    expect(component.bottles).toEqual([[1], []]);
  });

  it('should call next level on game completed', () => {
    component['sorterService']['checkBottlesFinished'] = jasmine.createSpy().and.returnValue(false);
    component.nextLevel = jasmine.createSpy();
    component.checkCompleted();
    expect(component.nextLevel).not.toHaveBeenCalled();

    component['sorterService']['checkBottlesFinished'] = jasmine.createSpy().and.returnValue(true);
    component.nextLevel = jasmine.createSpy();
    component.checkCompleted();
    expect(component.nextLevel).toHaveBeenCalled();
  });

  it('should return some css styles', () => {
    expect(component.bottlesContainer()).toBeDefined();
  });
});
