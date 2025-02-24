import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription, switchMap } from 'rxjs';
import { CustomerService } from '../../../../shared/services/customer/customer.service';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { ApiResponse } from '../../../../shared/models/ApiResponse';
import { FormComponent } from '../../../../shared/component/form/form.component';
import { Customer } from '../../../../shared/models/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent, CommonModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy {
  private onboardingId!: number
  private subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentOnboarding();
    this.getCustomerUpdatingValue();
    this.getStatusValidation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getCurrentOnboarding() {
    this.subscription.add(
      this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id') as string;
          return this.customerService.getOnboarding(parseInt(id));
        })
      ).subscribe((response: ApiResponse) => {
        this.onboardingId = response.data.id;
        this.customerService.customerOnboarding(response.data);
      })
    );
  }

  getCustomerUpdatingValue() {
    this.subscription.add(
      this.customerService.customerOnboardingUpdate$.pipe(
        switchMap((value: Customer) => {
          value.id = this.onboardingId;
          return this.customerService.updateOnboarding(this.onboardingId, value)
        })
      ).subscribe((response: ApiResponse) => {
        alert(response.message);
        location.reload()
      })
    );
  }

  getStatusValidation() {
    this.subscription.add(
      this.customerService.validate$.pipe(
        switchMap((status: number) => {
          return this.customerService.valideOnboarding(this.onboardingId, {status});
        })
      ).subscribe((response: ApiResponse) => {
        alert(response.message);
        location.reload()
      })
    )
  }
}
