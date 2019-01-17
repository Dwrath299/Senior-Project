import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreRecipesComponent } from './explore-recipes.component';

describe('ExploreRecipesComponent', () => {
  let component: ExploreRecipesComponent;
  let fixture: ComponentFixture<ExploreRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
