import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-vaccinazioni',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Calendario Vaccinazioni</h1>
        <p>Piano vaccinale MIUR 2024 per bambini 0–12 anni. Dati illustrativi — consultare sempre il pediatra.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="vaccinazioni$ | async as data">
      <section class="calendario">
        <h2>Calendario vaccinale</h2>
        <p class="nota-intro">{{ data.nota }}</p>
        <div class="timeline">
          <div *ngFor="let fascia of data.fasce" class="timeline-item">
            <div class="timeline-dot" aria-hidden="true"></div>
            <div class="timeline-body">
              <h3 class="timeline-eta">{{ fascia.eta }}</h3>
              <ul class="vaccini-list">
                <li *ngFor="let vaccino of fascia.vaccini">{{ vaccino }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="consigliate">
        <h2>Vaccini facoltativi consigliati</h2>
        <p class="section-intro">
          Oltre al calendario obbligatorio, il Dr. Marini consiglia i seguenti vaccini per una protezione completa.
        </p>
        <ul class="consigliate-grid">
          <li *ngFor="let v of data.vaccinazioniConsigliate" class="consigliato-card">
            <span class="consigliato-badge">Consigliato</span>
            <h3>{{ v.nome }}</h3>
            <p>{{ v.descrizione }}</p>
          </li>
        </ul>
      </section>

      <aside class="disclaimer-box">
        <h3>Importante</h3>
        <p>
          Il calendario riportato in questa pagina e' puramente illustrativo e basato sulle linee guida MIUR 2024.
          Le scadenze esatte e i vaccini disponibili dipendono dalla Regione Veneto e dal libretto sanitario del bambino.
          Contattate lo studio per pianificare il percorso vaccinale del vostro bambino.
        </p>
        <a routerLink="/contatti" class="btn btn-primary">Prenota la visita vaccinale</a>
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
        font-size: 0.95rem;
      }
      .content {
        padding: 3rem 1rem;
      }
      .calendario h2 {
        margin-bottom: 0.5rem;
      }
      .nota-intro {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 2rem;
        font-style: italic;
      }
      .timeline {
        position: relative;
        padding-left: 2rem;
        border-left: 2px solid var(--color-accent);
        margin-bottom: 4rem;
      }
      .timeline-item {
        position: relative;
        margin-bottom: 2rem;
      }
      .timeline-dot {
        position: absolute;
        left: calc(-2rem - 6px);
        top: 0.4rem;
        width: 12px;
        height: 12px;
        background: var(--color-accent);
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 0 0 2px var(--color-accent);
      }
      .timeline-body {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .timeline-eta {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-size: 1.05rem;
        font-weight: 700;
      }
      .vaccini-list {
        margin: 0;
        padding: 0 0 0 1.2rem;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .vaccini-list li {
        margin-bottom: 0.3rem;
        line-height: 1.5;
      }
      .consigliate {
        margin-bottom: 3rem;
      }
      .consigliate h2 {
        margin-bottom: 0.5rem;
      }
      .section-intro {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1.5rem;
      }
      .consigliate-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1rem;
      }
      .consigliato-card {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .consigliato-badge {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        background: #fef3c7;
        color: #92400e;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        margin-bottom: 0.6rem;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }
      .consigliato-card h3 {
        margin: 0 0 0.4rem;
        font-size: 1rem;
      }
      .consigliato-card p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        line-height: 1.6;
      }
      .disclaimer-box {
        background: #fff7ed;
        border: 1px solid #fed7aa;
        border-radius: var(--radius-lg);
        padding: 2rem;
      }
      .disclaimer-box h3 {
        margin: 0 0 0.75rem;
        color: #c2410c;
      }
      .disclaimer-box p {
        margin: 0 0 1.5rem;
        color: var(--color-fg-muted);
        font-size: 0.875rem;
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
export class VaccinazioniComponent {
  private readonly mockData = inject(MockDataService);

  readonly vaccinazioni$ = this.mockData.vaccinazioni$;
}
