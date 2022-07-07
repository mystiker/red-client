import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FhirUtilService } from '@red-probeaufgabe/search';
import { IFhirPatient, IFhirPractitioner, IPreparedIFhirPatient, IPreparedIFhirPractitioner } from '@red-probeaufgabe/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss'],
})
export class DashboardDetailsComponent {

  public readonly user$: Observable<IPreparedIFhirPatient | IPreparedIFhirPractitioner>

  constructor(private readonly utils: FhirUtilService, private readonly activatedRoute: ActivatedRoute) {

    this.user$ = this.activatedRoute.data.pipe(map(data => this.utils.prepareData(data.user)));
  }


  public getPhone(value: IPreparedIFhirPatient | IPreparedIFhirPractitioner) {
    value.telecom.find(el => el.system === 'phone')?.value
  }
}
