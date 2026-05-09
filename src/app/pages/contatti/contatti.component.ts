import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota una visita</h1>
        <p>Compila il modulo o contattaci telefonicamente. Risponderemo entro 24 ore lavorative.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">

        <section class="info-block">
          <h2>Lo studio</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">
                {{ info.contatti.whatsapp }}
              </a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedi'</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedi'</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledi'</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedi'</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdi'</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span class="chiuso">{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span class="chiuso">{{ info.orari.domenica }}</span></li>
          </ul>

          <div class="urgenza-box">
            <h3>Urgenze fuori orario</h3>
            <p>
              Per urgenze al di fuori degli orari di apertura, contattare il Pronto Soccorso Pediatrico
              AOUI Borgo Trento, Verona, oppure chiamare il <strong>118</strong> per emergenze gravi.
            </p>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiesta di appuntamento</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">

            <fieldset class="fieldset">
              <legend>Dati del genitore / tutore</legend>
              <div class="field">
                <label for="nomeGenitore">Nome e cognome genitore <span aria-hidden="true">*</span></label>
                <input
                  id="nomeGenitore"
                  type="text"
                  formControlName="nomeGenitore"
                  required
                  autocomplete="name"
                />
              </div>
              <div class="field">
                <label for="emailGenitore">Email genitore <span aria-hidden="true">*</span></label>
                <input
                  id="emailGenitore"
                  type="email"
                  formControlName="emailGenitore"
                  required
                  autocomplete="email"
                />
              </div>
              <div class="field">
                <label for="telefonoGenitore">Telefono genitore <span aria-hidden="true">*</span></label>
                <input
                  id="telefonoGenitore"
                  type="tel"
                  formControlName="telefonoGenitore"
                  required
                  autocomplete="tel"
                />
              </div>
              <div class="field field--checkbox">
                <input id="privacyGenitore" type="checkbox" formControlName="privacyGenitore" />
                <label for="privacyGenitore">
                  Acconsento al trattamento dei miei dati personali ai sensi dell'art. 6 GDPR per la gestione
                  dell'appuntamento. <span aria-hidden="true">*</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>Dati del bambino / paziente</legend>
              <div class="field">
                <label for="nomeBambino">Nome e cognome bambino <span aria-hidden="true">*</span></label>
                <input
                  id="nomeBambino"
                  type="text"
                  formControlName="nomeBambino"
                  required
                />
              </div>
              <div class="row">
                <div class="field">
                  <label for="dataNascitaBambino">Data di nascita <span aria-hidden="true">*</span></label>
                  <input
                    id="dataNascitaBambino"
                    type="date"
                    formControlName="dataNascitaBambino"
                    required
                  />
                </div>
                <div class="field">
                  <label for="tipologiaVisita">Tipo di visita <span aria-hidden="true">*</span></label>
                  <select id="tipologiaVisita" formControlName="tipologiaVisita" required>
                    <option value="">Seleziona...</option>
                    <option value="visita-filtro">Visita filtro</option>
                    <option value="bilancio-salute">Bilancio di salute</option>
                    <option value="vaccinazione">Vaccinazione</option>
                    <option value="controllo-crescita">Controllo crescita</option>
                    <option value="telemedicina">Telemedicina</option>
                    <option value="allergologia">Consulenza allergologica</option>
                    <option value="dermatologia">Dermatologia infantile</option>
                    <option value="certificato">Certificato medico</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
              </div>
              <div class="field field--checkbox">
                <input id="privacyBambino" type="checkbox" formControlName="privacyBambino" />
                <label for="privacyBambino">
                  Acconsento al trattamento dei dati sanitari del minore ai sensi dell'art. 9 GDPR,
                  in qualita' di genitore / tutore legale. <span aria-hidden="true">*</span>
                </label>
              </div>
            </fieldset>

            <div class="field">
              <label for="dataPreferita">Data preferita per l'appuntamento</label>
              <input id="dataPreferita" type="date" formControlName="dataPreferita" />
            </div>
            <div class="field">
              <label for="note">Note aggiuntive (sintomi, allergie note, urgenza)</label>
              <textarea id="note" formControlName="note" rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato e' realmente inviato. In un sito reale i dati sarebbero
              trasmessi in modo sicuro e cifrato (TLS) e conservati nel rispetto del GDPR Art. 9 (dati sanitari).
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">👶</span>
              <h3>Grazie, {{ form.value.nomeGenitore }}!</h3>
              <p>
                La richiesta di appuntamento per <strong>{{ form.value.nomeBambino }}</strong>
                ({{ form.value.tipologiaVisita }}) e' stata registrata.
              </p>
              <p>
                In un sito reale ricevereste una conferma via email e vereste ricontattati entro 24 ore
                per confermare data e orario.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.2rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .chiuso {
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .urgenza-box {
        margin-top: 1.5rem;
        background: #fff7ed;
        border: 1px solid #fed7aa;
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
      }
      .urgenza-box h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: #c2410c;
      }
      .urgenza-box p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-bottom: 1.5rem;
        background: #ffffff;
      }
      fieldset.fieldset legend {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-fg-default);
        padding: 0 0.4rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field:last-child {
        margin-bottom: 0;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .field label span[aria-hidden] {
        color: var(--color-danger);
        margin-left: 0.15rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 0.15rem;
        flex-shrink: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.4;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
        background: var(--color-accent-hover);
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        line-height: 1.5;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 0.75rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
      }
      @media (max-width: 560px) {
        .row {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    // Dati genitore
    nomeGenitore: ['', [Validators.required, Validators.minLength(2)]],
    emailGenitore: ['', [Validators.required, Validators.email]],
    telefonoGenitore: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    privacyGenitore: [false, Validators.requiredTrue],
    // Dati bambino
    nomeBambino: ['', [Validators.required, Validators.minLength(2)]],
    dataNascitaBambino: ['', Validators.required],
    tipologiaVisita: ['', Validators.required],
    privacyBambino: [false, Validators.requiredTrue],
    // Preferenze
    dataPreferita: [''],
    note: ['']
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacyGenitore: false, privacyBambino: false });
    this.submitted.set(false);
  }
}
