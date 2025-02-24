import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiServiceService } from '../api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class PurposeService {
  
  constructor(
    private apiService: ApiServiceService
  ) { }

  getALlPurposes() {
    let url = `${environment['onboarding']}/onboarding/purpose`;
    return this.apiService.doGet(url)
  }
}
