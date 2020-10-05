import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShowsComponent } from './view-shows.component';

describe('ViewShowsComponent', () => {
  let component: ViewShowsComponent;
  let fixture: ComponentFixture<ViewShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
