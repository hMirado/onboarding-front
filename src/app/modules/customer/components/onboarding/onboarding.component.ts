import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormComponent } from "../../../shared/component/form/form.component";
import { HelperService } from '../../../shared/services/helper/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription();

  constructor(public helperService: HelperService) {  }
  
  ngOnInit(): void {
    this.onboardingIsSaved();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onboardingIsSaved(): void {
    this.subscription.add(
      this.helperService.isCreated$.subscribe((isSuccess: boolean) => {
        if(isSuccess) location.reload();
      })
    )
  }
}
