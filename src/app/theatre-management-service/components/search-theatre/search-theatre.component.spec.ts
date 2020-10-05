import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTheatreComponent } from './search-theatre.component';

describe('SearchTheatreComponent', () => {
  let component: SearchTheatreComponent;
  let fixture: ComponentFixture<SearchTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
