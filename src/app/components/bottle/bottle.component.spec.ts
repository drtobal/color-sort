import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleComponent } from './bottle.component';

describe('BottleComponent', () => {
  let component: BottleComponent;
  let fixture: ComponentFixture<BottleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return bottle styles', () => {
    const styles = component.getBottleStyle();
    expect(Object.keys(styles).indexOf('width')).toBeGreaterThan(-1);
    expect(Object.keys(styles).indexOf('height')).toBeGreaterThan(-1);
  });

  it('should return color', () => {
    const styles = component.getColorStyle(0, false);
    expect(Object.keys(styles).indexOf('width')).toBeGreaterThan(-1);
    expect(Object.keys(styles).indexOf('height')).toBeGreaterThan(-1);

    // additional or different properties
    const stylesB = component.getColorStyle(0, true);
    expect(stylesB).not.toEqual(styles);
  });

  it('should return color variant', () => {
    component['sorterService']['getVariantColor'] = jasmine.createSpy().and.returnValue('custom');
    expect(component.getColorBg(1)).toEqual(jasmine.objectContaining({ background: 'custom' }));
  });
});
