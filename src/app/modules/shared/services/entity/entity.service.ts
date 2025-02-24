import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiServiceService } from '../api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  
  constructor(
    private apiService: ApiServiceService
  ) { }

  getALlEntities() {
    let url = `${environment['onboarding']}/onboarding/entity`;
    return this.apiService.doGet(url)
  }
}
