import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoStudio, Servizi, Vaccinazioni, Team, Faq } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoStudio> = this.http
    .get<InfoStudio>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly servizi$: Observable<Servizi> = this.http
    .get<Servizi>('/assets/mock/servizi.json')
    .pipe(shareReplay(1));

  readonly vaccinazioni$: Observable<Vaccinazioni> = this.http
    .get<Vaccinazioni>('/assets/mock/vaccinazioni.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<Team> = this.http
    .get<Team>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<Faq> = this.http
    .get<Faq>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
