import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FhirSearchFn, ISearchFormData } from '@red-probeaufgabe/types';
import { combineLatest, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const INITIAL_SEARCH_VALUE = '';
const INITIAL_TYPE_VALUE = FhirSearchFn.SearchAll

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnDestroy {

  private readonly subscriptions = new Subscription();

  public readonly enumType = FhirSearchFn;

  public readonly searchField = new FormControl(INITIAL_SEARCH_VALUE);
  public readonly typeField = new FormControl(INITIAL_TYPE_VALUE);

  @Output()
  public readonly searchChanged = new EventEmitter<ISearchFormData>();

  constructor() {

    const searchFieldValue$ = this.searchField.valueChanges.pipe(
      startWith(INITIAL_SEARCH_VALUE)
    );

    const typeFieldValue$ = this.typeField.valueChanges.pipe(
      startWith(INITIAL_TYPE_VALUE)
    );

    const inputChange$ = combineLatest([searchFieldValue$, typeFieldValue$]).pipe(
      map(([searchTerm, type]) => ({
        searchText: searchTerm,
        searchFuncSelect: type
      }))
    );

    const inputChangeSub = inputChange$.subscribe(el => this.searchChanged.emit(el));

    this.subscriptions.add(inputChangeSub);
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
  }
}
