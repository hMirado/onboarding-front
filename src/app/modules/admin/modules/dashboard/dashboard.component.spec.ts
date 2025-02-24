import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { HelperService } from '../../../shared/services/helper/helper.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { customerOnboardingMock } from '../../../../../assets/data/mocks/customerOnboarding';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let helperService: HelperService;
  let httpClient: HttpClient;
  let customerService: CustomerService

  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HelperService,
        CustomerService
      ]
    })
    .compileComponents();

    helperService = TestBed.inject(HelperService);
    httpClient = TestBed.inject(HttpClient);
    customerService = TestBed.inject(CustomerService)

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllOnboarding and update customerOnboardings', () => {
    const mockData = customerOnboardingMock;
    spyOn(customerService, 'getAllOnboarding').and.returnValue(of(mockData));
    component.getAllOnboarding();
    expect(customerService.getAllOnboarding).toHaveBeenCalled();
    expect(component.customerOnboardings).toEqual(mockData.data);
    expect(component.customerOnboardings).not.toEqual([]);
  });
});
