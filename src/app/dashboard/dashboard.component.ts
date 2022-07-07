import { Component } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay, startWith, tap, switchMap } from 'rxjs/operators';
import { SiteTitleService } from '@red-probeaufgabe/core';
import { IFhirPatient, IFhirPractitioner, IFhirSearchResponse, ISearchFormData } from '@red-probeaufgabe/types';
import { IUnicornTableColumn } from '@red-probeaufgabe/ui';
import { AbstractSearchFacadeService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  private readonly searchConditions = new ReplaySubject<ISearchFormData>();

  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);

  isLoading = true;

  /*
   * Implement search on keyword or fhirSearchFn change
   **/
  // old code
  // search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> = this.searchFacade
  //   .search(FhirSearchFn.SearchAll, '')
  //   .pipe(
  //     catchError(this.handleError),
  //     // antipattern detected :)
  //     tap((data: IFhirSearchResponse<IFhirPatient | IFhirPractitioner>) => {
  //       this.isLoading = false;
  //     }),
  //     shareReplay(),
  //   );

  // new code - 
  search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> = this.searchConditions.pipe(
    switchMap(conditions => this.searchFacade.search(conditions.searchFuncSelect, conditions.searchText).pipe(
      catchError(this.handleError)
    )),
    tap((data: IFhirSearchResponse<IFhirPatient | IFhirPractitioner>) => {
      this.isLoading = false;
    }),
    shareReplay()
  );

  entries$: Observable<Array<IFhirPatient | IFhirPractitioner>> = this.search$.pipe(
    map((data) => !!data && data.entry),
    startWith([]),
  );

  totalLength$ = this.search$.pipe(
    map((data) => !!data && data.total),
    startWith(0),
  );

  constructor(private siteTitleService: SiteTitleService, private searchFacade: AbstractSearchFacadeService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }

  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return of({ entry: [], total: 0 });
  }

  public onSearchChanged(data: ISearchFormData) {
    this.searchConditions.next(data);
  }
}
