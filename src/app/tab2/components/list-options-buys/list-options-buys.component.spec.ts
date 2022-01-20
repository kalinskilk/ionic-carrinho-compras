import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOptionsBuysComponent } from './list-options-buys.component';

describe('ListOptionsBuysComponent', () => {
  let component: ListOptionsBuysComponent;
  let fixture: ComponentFixture<ListOptionsBuysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOptionsBuysComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOptionsBuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
