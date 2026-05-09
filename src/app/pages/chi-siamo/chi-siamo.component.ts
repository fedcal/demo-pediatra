import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Un team pediatrico a misura di famiglia, con passione e competenza.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Lo studio Dr. Marini Pediatria</h2>
        <p>
          Il Dr. Marco Marini ha fondato lo studio nel 1998 a Verona, con l'obiettivo di offrire
          alle famiglie un punto di riferimento pediatrico privato, accessibile e familiare. Dopo la
          specializzazione all'Università di Verona e anni di esperienza nel reparto pediatrico di
          Borgo Trento, ha scelto la libera professione per dedicare il giusto tempo a ogni paziente.
        </p>
        <p>
          Lo studio si trova in Via Carducci 18, nel cuore di Verona, facilmente raggiungibile con i
          mezzi pubblici e dotato di parcheggio nelle vicinanze. L'ambiente e' stato pensato per mettere
          a proprio agio sia i bambini piu' piccoli sia i ragazzi fino ai 14 anni: colori caldi, spazio
          giochi in sala d'attesa e nessuna fretta.
        </p>
        <p>
          Dal 2021 e' attivo il servizio di telemedicina, che consente alle famiglie di consultare il
          Dr. Marini da remoto per sintomi lievi, follow-up e risposta ai dubbi piu' comuni. Il servizio
          e' disponibile per tutta Italia.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Ascolto</h3>
            <p>Ogni visita inizia con un colloquio approfondito con il genitore e, quando possibile, con il bambino stesso.</p>
          </li>
          <li>
            <h3>Prevenzione</h3>
            <p>Bilanci di salute regolari e calendario vaccinale aggiornato: la salute del bambino si costruisce passo dopo passo.</p>
          </li>
          <li>
            <h3>Trasparenza</h3>
            <p>Prezzi chiari, comunicazione diretta con i genitori e spiegazioni semplificate su diagnosi e terapie.</p>
          </li>
          <li>
            <h3>Continuita'</h3>
            <p>Un pediatra che conosce la storia del bambino fin dai primi mesi: la continuita' di cura fa la differenza.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as data">
        <h2>Il nostro team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of data.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__certs">
              <li *ngFor="let c of m.certificazioni">{{ c }}</li>
            </ul>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq-section" *ngIf="faq$ | async as data">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of data.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: #fffbeb;
        border-radius: var(--radius-md);
        border: 1px solid #fde68a;
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: #92400e;
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.6;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .team-card__certs {
        list-style: none;
        padding: 0;
        margin: 0 0 0.75rem;
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        text-align: left;
      }
      .team-card__certs li::before {
        content: '✓ ';
        color: var(--color-success);
        font-weight: 700;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .faq-section h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
      }
      .faq-item {
        padding: 1.25rem 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
      }
      .faq-item p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
