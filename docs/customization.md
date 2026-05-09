# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Pediatra Privato'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `pediatra` con nome cliente (`acme-pediatra`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili Sviluppi Customizzabili per Pediatra Privato

### 1. AI Symptom Triage + Telemedicina Aptness
**Scope**: ~22h | **Tier**: Avanzato | **Valore**: Safety, ER reduction, liability mitigation

Ollama classify RED (ER now) / YELLOW (pediatra 24h) / GREEN (routine telemedicina). Rule-based safety net. SMS escalation alert pediatra. Parent education transparency.

### 2. Dosage Calculator + AIFA Drug DB
**Scope**: ~26h | **Tier**: Avanzato | **Valore**: Clinical safety, differentiator, confidence

AIFA drug database. Formula weight_kg × dosage_per_kg → dose_mg output. Interaction check pediatric-specific. Age contraindication alert. Clinical-grade confidence.

### 3. Growth Curve + AI Centile Prediction
**Scope**: ~24h | **Tier**: Avanzato | **Valore**: Early intervention, parental peace-of-mind

OMS WHO reference curve. Input height/weight/age → centile placement. Polynomial regression 6-month projection. Failure-to-thrive alert (< 5th percentile visual). Parent-friendly report.

### 4. Vaccine Scheduler PIV + Reminder + Certificate
**Scope**: ~18h | **Tier**: Avanzato | **Valore**: Compliance, automation, parent ease

Italian vaccination calendar (PIV Calendario Nazionale). Due reminder SMS (7gg prima). PDF certificate + QR code official. Compliance Ministero Salute. School enrollment ready.

### 5. Pre-Visit Screening 24h Before
**Scope**: ~15h | **Tier**: Avanzato | **Valore**: Efficiency, reduce visit time 20%, better diagnosis

Parent form: medical history, current symptoms, photo rash/injury, vitals (temp, weight, O2). Pediatra pre-visit brief (2 min read). In-office time saved 20%.

### 6. Post-Visit PDF Note + Parent Summary
**Scope**: ~12h | **Tier**: Avanzato | **Valore**: Compliance, parent understanding, audit trail

Auto-generate PDF: pediatra clinical note (ICD-10 codes) + parent-friendly summary. Medication AIFA link. Dosage instructions visual. Diet recommendation. Auto email.

### 7. Sick Visit + No-Show Protection
**Scope**: ~14h | **Tier**: Avanzato | **Valore**: Revenue protection, operational efficiency

24h booking window sick visit (slots priority). SMS confirm 12h prior. €20 cancellation fee (non-refundable). Antibiotics prudent-use policy reminder built-in.

### 8. Parental Consent Workflow GDPR Art.8
**Scope**: ~16h | **Tier**: Avanzato | **Valore**: GDPR compliance, custody verification, audit

Age-based consent wizard (0-5: parent, 6-13: parent+child, 14-17: adolescent+parent). Revocation audit. Shared custody logic. Compliance-ready for GDPR audit.

### 9. AI Parent Guidance Chat 24h
**Scope**: ~18h | **Tier**: Avanzato | **Valore**: Support continuity, reduce unnecessary ER visits

Ollama supportive Q&A (Fever > 39°C → "Consulta pediatra oggi"). When-to-escalate-ER logic (difficulty breathing, seizure). No medical advice, purely supportive. Compassionate tone.

### 10. Growth Projection + Nutrition Tips
**Scope**: ~14h | **Tier**: Intermedio+ | **Valore**: Parental education, wellness positioning

Jenss-Bayley adult height prediction. Ollama nutrition tips (low growth, slow eater, picky eater). Food allergy tracker. Parent education resource library links.

**Total customizzazioni**: 10 idee, €5.5k-9.5k, ROI 3-6 mesi per pediatra PMI 1-5 pediatri privati.
