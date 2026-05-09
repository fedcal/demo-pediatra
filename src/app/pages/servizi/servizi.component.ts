import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { FasciaServizio, ServizioMedico } from '../../data/types';

interface GruppoServizi {
  fascia: FasciaServizio;
  label: string;
  icona: string;
  items: ServizioMedico[];
}

const FASCIA_LABELS: Record<FasciaServizio, { label: string; icona: string }> = {
  urgenza: { label: 'Visite urgenti e filtro', icona: '🩺' },
  prevenzione: { label: 'Prevenzione e bilanci', icona: '📈' },
  specialistica: { label: 'Consulenze specialistiche', icona: '🔬' },
  certificati: { label: 'Certificati medici', icona: '📄' },
  digitale: { label: 'Telemedicina', icona: '💻' }
};

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri servizi</h1>
        <p>12 servizi pediatrici per bambini 0–14 anni. Prezzi trasparenti, nessun extra nascosto.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="gruppi$ | async as gruppi">
      <section *ngFor="let gruppo of gruppi" class="gruppo-servizi">
        <h2>
          <span aria-hidden="true">{{ gruppo.icona }}</span>
          {{ gruppo.label }}
        </h2>
        <ul class="servizi-list">
          <li *ngFor="let s of gruppo.items" class="servizio-item">
            <div class="servizio-item__head">
              <span class="servizio-item__icon" aria-hidden="true">{{ s.icona }}</span>
              <h3>{{ s.nome }}</h3>
              <span class="servizio-item__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-item__desc">{{ s.descrizione }}</p>
            <span class="servizio-item__durata">Durata: {{ s.durata }}</span>
          </li>
        </ul>
      </section>

      <aside class="info-box">
        <h3>Informazioni sui pagamenti</h3>
        <p>
          Lo studio e' interamente privato. I prezzi indicati sono da intendersi IVA inclusa.
          Le spese mediche sono detraibili al 19% (art. 15 TUIR) — rilasciamo ricevuta fiscale per ogni visita.
        </p>
        <a routerLink="/contatti" class="btn btn-primary">Prenota ora</a>
      </aside>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .gruppo-servizi {
        margin-bottom: 3rem;
      }
      .gruppo-servizi h2 {
        font-size: 1.3rem;
        margin: 0 0 1.25rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .servizio-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .servizio-item__head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.6rem;
      }
      .servizio-item__icon {
        font-size: 1.4rem;
        flex-shrink: 0;
      }
      .servizio-item__head h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .servizio-item__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
      }
      .servizio-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.4rem;
        line-height: 1.6;
      }
      .servizio-item__durata {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .info-box {
        background: #fffbeb;
        border: 1px solid #fde68a;
        border-radius: var(--radius-lg);
        padding: 2rem;
        margin-top: 2rem;
      }
      .info-box h3 {
        margin: 0 0 0.75rem;
        color: #92400e;
      }
      .info-box p {
        margin: 0 0 1.5rem;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: var(--color-accent-hover);
        text-decoration: none;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly gruppi$ = this.mockData.servizi$.pipe(
    map((data) => {
      const ordine: FasciaServizio[] = ['urgenza', 'prevenzione', 'specialistica', 'digitale', 'certificati'];
      return ordine
        .map((fascia): GruppoServizi => ({
          fascia,
          label: FASCIA_LABELS[fascia].label,
          icona: FASCIA_LABELS[fascia].icona,
          items: data.servizi.filter((s) => s.fascia === fascia)
        }))
        .filter((g) => g.items.length > 0);
    })
  );
}
