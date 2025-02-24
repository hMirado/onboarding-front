import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customerOnboarding$: Subject<Customer> = new Subject<Customer>();
  public customerOnboardingUpdate$: Subject<Customer> = new Subject<Customer>();
  public validate$: Subject<number> = new Subject<number>();

  constructor(private apiService: ApiServiceService) { }

  saveOnboarding(value: any) {
    let url = `${environment['onboarding']}/onboarding/create`;
    return this.apiService.doPost(url, value);
  }

  getAllOnboarding() {
    let url = `${environment['onboarding']}/onboarding`; 
    return this.apiService.doGet(url);
  }

  getOnboarding(id: number) {
    let url = `${environment['onboarding']}/onboarding/${id}`; 
    return this.apiService.doGet(url);
  }

  customerOnboarding(value: Customer) {
    this.customerOnboarding$.next(value);
  }

  updateOnboarding(id: number, value: Customer) {
    let url = `${environment['onboarding']}/onboarding/${id}`;
    return this.apiService.doPut(url, value);
  }

  valideOnboarding(id: number, status: any) {
    let url = `${environment['onboarding']}/onboarding/validate/${id}`;
    return this.apiService.doPut(url, status);
  }
}
