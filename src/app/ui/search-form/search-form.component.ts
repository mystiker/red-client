import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FhirSearchFn, ISearchFormData } from '@red-probeaufgabe/types';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const INITIAL_SEARCH_VALUE = '';
const INITIAL_TYPE_VALUE = FhirSearchFn.SearchAll

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnDestroy, OnInit {

  private readonly subscriptions = new Subscription();

  public readonly enumType = FhirSearchFn;

  public readonly searchFormGroup: FormGroup;

  @Output()
  public readonly searchChanged = new EventEmitter<ISearchFormData>();

  constructor() {

    this.searchFormGroup = new FormGroup({
      searchField: new FormControl(INITIAL_SEARCH_VALUE),
      typeField: new FormControl(INITIAL_TYPE_VALUE)
    });
  }

  ngOnInit(): void {

    const inputChange$: Observable<ISearchFormData> = this.searchFormGroup.valueChanges.pipe(
      map(formValues => ({
        searchText: formValues.searchField,
        searchFuncSelect: formValues.typeField
      })),
      startWith(({
        searchFuncSelect: INITIAL_TYPE_VALUE,
        searchText: INITIAL_SEARCH_VALUE
      }))
    );

    const inputChangeSub = inputChange$.subscribe(formData => this.searchChanged.emit(formData));

    this.subscriptions.add(inputChangeSub);
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
  }
}
