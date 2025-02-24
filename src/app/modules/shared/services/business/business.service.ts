import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  
  constructor(
    private apiService: ApiServiceService
  ) { }

  getALlBusinesses() {
    let url = `${environment['onboarding']}/onboarding/business`;
    return this.apiService.doGet(url)
  }
}
