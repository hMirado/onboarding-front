import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  getAllStatus() {
    let url = `${environment['onboarding']}/onboarding/status`;
    return this.apiService.doGet(url)
  }
}
