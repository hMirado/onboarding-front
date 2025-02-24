import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { FormComponent } from './form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { BusinessService } from '../../services/business/business.service';
import { CustomerService } from '../../services/customer/customer.service';
import { EntityService } from '../../services/entity/entity.service';
import { HelperService } from '../../services/helper/helper.service';
import { PurposeService } from '../../services/purpose/purpose.service';
import { StatusService } from '../../services/status/status.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let formBuilder: FormBuilder;
  let businessService: BusinessService;
  let purposeService: PurposeService;
  let entityService: EntityService;
  let apiService: ApiServiceService;
  let helperService: HelperService;
  let customerService: CustomerService;
  let statusService: StatusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormComponent, 
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        BusinessService,
        PurposeService,
        EntityService,
        ApiServiceService,
        HelperService,
        CustomerService,
        StatusService,
      ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    businessService = TestBed.inject(BusinessService);
    purposeService = TestBed.inject(PurposeService);
    entityService= TestBed.inject(EntityService);
    apiService = TestBed.inject(ApiServiceService);
    helperService = TestBed.inject(HelperService);
    customerService = TestBed.inject(CustomerService);
    statusService = TestBed.inject(StatusService);

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form is initialized', () => {
    component.onboardingForm = formBuilder.group({
      purpose: ['', Validators.required],
      entity: ['', Validators.required],
      business: ['', Validators.required],
      company: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      incorporationDate: ['', Validators.required],
      applicant: ['', Validators.required],
      license: ['', Validators.required],
      shareholderField: formBuilder.array([])
    })

    expect(component.onboardingForm.get('company')?.value).toBe('')
    expect(component.onboardingForm.get('applicant')?.value).toBe('')
    expect(component.onboardingForm.get('registrationNumber')?.value).toBe('')
  })

  it('should be call service getBusinesses', () => {
    const spy_on_getBusiness = spyOn(component, 'getBusinesses').and.callThrough();
    component.ngOnInit();
    expect(spy_on_getBusiness).toHaveBeenCalledTimes(1);
  })

  it('should be call service getEntities', () => {
    const spy_on_getEntities = spyOn(component, 'getEntities').and.callThrough();
    component.ngOnInit();
    expect(spy_on_getEntities).toHaveBeenCalledTimes(1);
  })

  it('should be call submit function', fakeAsync(() => {
    spyOn(component, 'submit');
    let button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    tick();
    expect(component.submit).toHaveBeenCalled();
  }))

  it('should create onboarding', () => {
    component.isEdit = false;
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#submit');
    expect(button).toBeTruthy();
    expect(button).not.toBeNull();
  })
});

