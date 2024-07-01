import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCreatorComponent } from './api-creator.component';

describe('ApiCreatorComponent', () => {
  let component: ApiCreatorComponent;
  let fixture: ComponentFixture<ApiCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
