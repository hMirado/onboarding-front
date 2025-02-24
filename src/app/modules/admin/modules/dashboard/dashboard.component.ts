import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { HelperService } from '../../../shared/services/helper/helper.service';
import { Subscription } from 'rxjs';
import { ApiResponse } from '../../../shared/models/ApiResponse';
import { Customer } from '../../../shared/models/customer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public customerOnboardings: Customer[] = [];
  constructor(
      public helperService: HelperService,
      private customerService: CustomerService,
      private router: Router
    ) {
    }

  ngOnInit(): void {
    this.getAllOnboarding();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllOnboarding() {
    this.subscription.add(
      this.customerService.getAllOnboarding().subscribe((response: ApiResponse) => {
        this.customerOnboardings = response.data;
        console.log(response.data);
        
      })
    );
  }

  edit(id: number) {
    this.router.navigate(['/admin/onboarding', id]);
  }

  getStatus(name: string | null) {
    let status = "In Progress"
    if (name == "Approved") status = "Approved"
    else if (name == "Rejected") status = "Rejected"

/*     let s = "In Progress"
    if (status && status.name == "Approved" ) s = "Approved"
    else if (status && status.name == "Rejected") s = "Rejected" */
    return status;
  }
}
