import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <div class="hero__badge">Pediatria privata · Verona · 0–14 anni</div>
        <h1>Il tuo pediatra di fiducia a Verona</h1>
        <p class="hero-tagline">
          Cure personalizzate, ascolto attento e un ambiente rassicurante per te e il tuo bambino.
          Dal bilancio di salute alle vaccinazioni, siamo qui in ogni fase della crescita.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota una visita</a>
          <a routerLink="/servizi" class="btn btn-secondary">Scopri i servizi</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere il Dr. Marini</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">👶</span>
          <h3>Specialista 0–14 anni</h3>
          <p>Esperienza pediatrica dedicata esclusivamente ai bambini, dalla nascita all'adolescenza.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💙</span>
          <h3>Ambiente rassicurante</h3>
          <p>Sala d'attesa accogliente, tempi di visita distesi e approccio empatico con tutta la famiglia.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💻</span>
          <h3>Telemedicina attiva</h3>
          <p>Videoconsulto disponibile per famiglie fuori Verona o per follow-up di situazioni già valutate.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📋</span>
          <h3>Certificati e documentazione</h3>
          <p>Rilasciamo tutti i certificati scolastici e sportivi richiesti, anche con consegna digitale.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>I nostri servizi principali</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <span class="servizio-card__icon" aria-hidden="true">{{ s.icona }}</span>
          <div class="servizio-card__body">
            <div class="servizio-card__title">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-card__desc">{{ s.descrizione }}</p>
            <span class="servizio-card__durata">Durata: {{ s.durata }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prenota ora la visita per il tuo bambino</h2>
        <p>Siamo a Verona in Via Carducci 18. Disponibili anche in telemedicina per tutta Italia.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota una visita</a>
          <a routerLink="/vaccinazioni" class="btn btn-secondary">Calendario vaccinazioni</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero__badge {
        display: inline-block;
        background: #fef3c7;
        color: #92400e;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.3rem 0.8rem;
        border-radius: 9999px;
        margin-bottom: 1rem;
        letter-spacing: 0.02em;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
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
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.75rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        display: flex;
        gap: 1rem;
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        align-items: flex-start;
      }
      .servizio-card__icon {
        font-size: 2rem;
        flex-shrink: 0;
        line-height: 1;
      }
      .servizio-card__body {
        flex: 1;
        min-width: 0;
      }
      .servizio-card__title {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.4rem;
      }
      .servizio-card__title h3 {
        margin: 0;
        font-size: 1rem;
      }
      .servizio-card__price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1rem;
        flex-shrink: 0;
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.4rem;
        line-height: 1.5;
      }
      .servizio-card__durata {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.35);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) => s.fascia !== 'certificati').slice(0, 3))
  );
}
