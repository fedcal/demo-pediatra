// Tipi TypeScript per i dati mock del Dr. Marini Pediatria

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface ContattiStudio {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    facebook?: string;
    instagram?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziStudio {
  telemedicina: boolean;
  richiamoTelefonico: boolean;
  certificatiOnline: boolean;
  accessibileDisabili: boolean;
  parcheggioNearby: boolean;
  urgenzeTelefoniche: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoStudio {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  albo: string;
  indirizzo: Indirizzo;
  contatti: ContattiStudio;
  orari: OrariApertura;
  servizi: ServiziStudio;
  metaSeo: MetaSeo;
}

export type FasciaServizio = 'urgenza' | 'prevenzione' | 'specialistica' | 'certificati' | 'digitale';

export interface ServizioMedico {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  durata: string;
  fascia: FasciaServizio;
  icona: string;
}

export interface Servizi {
  servizi: ServizioMedico[];
}

export interface FasciaVaccinale {
  eta: string;
  etaMesi: number;
  vaccini: string[];
}

export interface VaccinoConsigliato {
  nome: string;
  descrizione: string;
  fascia: string;
}

export interface Vaccinazioni {
  nota: string;
  fasce: FasciaVaccinale[];
  vaccinazioniConsigliate: VaccinoConsigliato[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
  certificazioni: string[];
  image: string;
}

export interface Team {
  team: MembroTeam[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
