import { Component, Input, input, OnDestroy, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Business } from '../../../shared/models/business';
import { Subscription } from 'rxjs';
import { ApiResponse } from '../../../shared/models/ApiResponse';
import { CommonModule } from '@angular/common';
import { Entity } from '../../../shared/models/entity';
import { Purpose } from '../../../shared/models/purpose';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';
import { EntityService } from '../../../shared/services/entity/entity.service';
import { HelperService } from '../../../shared/services/helper/helper.service';
import { PurposeService } from '../../../shared/services/purpose/purpose.service';
import { BusinessService } from '../../../shared/services/business/business.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { Customer } from '../../models/customer';
import { Shareholder } from '../../models/shareholder';
import { StatusService } from '../../services/status/status.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() public isEdit: boolean = false;

  public onboardingForm!: FormGroup;
  public businesses: Business[] = [];
  public entities: Entity[] = [];
  public purposes: Purpose[] = [];
  public countries: String[] = [];
  private subscription: Subscription = new Subscription();
  public formHasError: boolean = false;
  public isVerified: boolean = false;
  public approuved: any =  {};
  public rejected: any =  {};

  constructor( 
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private entityService: EntityService,
    private purposeService: PurposeService,
    private apiService: ApiServiceService,
    public helperService: HelperService,
    private customerService: CustomerService,
    private statusService: StatusService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getBusinesses();
    this.getEntities();
    this.getPurposes();
    this.getCountries();
    if (!this.isEdit) {
      this.addShareholderField();
    }
    this.getOnboardingDetail();
    this.getAllStatus();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    this.onboardingForm = this.formBuilder.group({
      purpose: ['', Validators.required],
      entity: ['', Validators.required],
      business: ['', Validators.required],
      company: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      incorporationDate: ['', Validators.required],
      applicant: ['', Validators.required],
      license: [''],
      shareholderField: this.formBuilder.array([])
    })

    if (this.isEdit) {
      this.onboardingForm.addControl('id', Validators.required)
    }
  }

  get shareholderField(): FormArray {
    return this.onboardingForm.get('shareholderField') as FormArray;
  }

  addShareholderField(id: string = '', name: string = '', passport: string = ''): void {
    let field: FormGroup = this.formBuilder.group({
      id: [id],
      name: [name, Validators.required],
      passport: [passport, Validators.required]
    });
    if (!this.isEdit) {
      field.removeControl('id');
    }
    this.shareholderField.push(field)
  }

  removeShareholderField(index: number) {
    this.shareholderField.removeAt(index);
  }

  getBusinesses(): void {
    this.subscription.add(
      this.businessService.getALlBusinesses().subscribe((response: ApiResponse) => {
        this.businesses = response.data;
      })
    )
  }

  getEntities(): void {
    this.subscription.add(
      this.entityService.getALlEntities().subscribe((response: ApiResponse) => {
        this.entities = response.data;
      })
    )
  }

  getPurposes(): void {
    this.subscription.add(
      this.purposeService.getALlPurposes().subscribe((response: ApiResponse) => {
        this.purposes = response.data;
      })
    )
  }

  getCountries(): void {
    this.subscription.add(
      this.apiService.getCountry().subscribe(response => {
        this.countries = response;
      })
    )
  }

  submit(): void {
    if (!this.onboardingForm.valid) {
      this.formHasError = true;
    } else {
      this.formHasError = false;
      const value = this.onboardingForm.value;
      value['purposeDto'] = { id: value.purpose }
      value['entityTypeDto'] = { id: value.entity }
      value['businessDto'] = { id: value.business }
      value['shareholderDtos'] = value.shareholderField;
      delete value['id'];
      delete value['purpose'];
      delete value['entity'];
      delete value['business'];
      delete value['shareholderField'];
      this.save(value)
    }
  }

  save(value: any) {
    this.subscription.add(
      this.customerService.saveOnboarding(value).subscribe((response: ApiResponse) => {
        alert(response.message);
        this.helperService.setIsCreated(response.success)
      })
    )
  }

  isBank : boolean =false
  selectBusiness(event: any) {
    const business = this.checkBusiness(event.target.value);
    this.isBank = business  == 'Banking' ? true : false;
    if (business == 'Banking') {
      this.onboardingForm.controls['license'].addValidators(Validators.required);
      this.onboardingForm.controls['license'].updateValueAndValidity();
    } else {
      this.onboardingForm.controls['license'].removeValidators(Validators.required);
      this.onboardingForm.controls['license'].updateValueAndValidity();
    }
  }

  checkBusiness(id: number) {
    const business = this.businesses.filter((business: Business) => business.id == id)[0];
    return business.name;
  }


  getOnboardingDetail() {
    if (this.isEdit) {
      this.subscription.add(
        this.customerService.customerOnboarding$.subscribe((onboarding: Customer) => {
          this.onboardingForm.patchValue({
            id: onboarding.id,
            purpose: onboarding.purposeDto.id,
            entity: onboarding.entityTypeDto.id,
            business: onboarding.businessDto.id,
            company: onboarding.company,
            registrationNumber: onboarding.registrationNumber,
            country: onboarding.country,
            email: onboarding.email,
            incorporationDate: onboarding.incorporationDate,
            applicant: onboarding.applicant,
            license: onboarding.license,
          })
          this.isVerified = onboarding.statusDto != null ? true : false;

          onboarding.shareholderDtos.forEach((shareholder: Shareholder) => {
            const id: string = shareholder.id ? shareholder.id.toString() : '';
            this.addShareholderField(id, shareholder.name, shareholder.passport);
          })
        })
      )
    }
  }

  update() {
    if (!this.onboardingForm.valid) {
      this.formHasError = true;
    } else {
      this.formHasError = false;
      let value = this.onboardingForm.value;
      value['purposeDto'] = { id: value.purpose }
      value['entityTypeDto'] = { id: value.entity }
      value['businessDto'] = { id: value.business }
      delete value['id'];
      delete value['purpose'];
      delete value['entity'];
      delete value['business'];

      const shareholder = value.shareholderField.map((value: any) => {
        Object.keys(value).forEach(key => {
            if (value[key] === "") {
                delete value[key];
            }
        });
        return value;
      });
      value['shareholderDtos'] = shareholder;
      delete value['shareholderField'];

      this.customerService.customerOnboardingUpdate$.next(value);
    }
  }

  getAllStatus() {
    this.subscription.add(
      this.statusService.getAllStatus().subscribe((response: ApiResponse) => {
        this.approuved = response.data.filter((value: any) => value.name == "Approved")[0];
        this.rejected = response.data.filter((value: any) => value.name == "Rejected")[0];
      })
    )
  }

  valid(id: number) {
    this.customerService.validate$.next(id);
  }
}