import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { AbstractSearchFacadeService } from "@red-probeaufgabe/search";
import { IFhirPatient, IFhirPractitioner } from "@red-probeaufgabe/types";
import { throwError, Observable, combineLatest, merge, of } from "rxjs";
import { map, catchError, tap, filter } from "rxjs/operators";

@Injectable()
export class DashboardDetailsResolver implements Resolve<any> {

    constructor(private readonly router: Router, private readonly searchService: AbstractSearchFacadeService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {

        console.log("Call in router")

        const userId = route.paramMap.get('id');

        const checkValue = this.searchService.findPatientById(userId).pipe(
            catchError(_ => this.searchService.findPractitionerById(userId).pipe(
                catchError(error => this.handleError(error))
            ))
        );

        return checkValue;
    }

    private handleError(error) {
        this.router.navigateByUrl('/');
        return throwError(error);
    }
}