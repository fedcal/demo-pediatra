import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Dr. Marini Pediatria — Pediatra privato 0-14 anni Verona'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Dr. Marini Pediatria Verona'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Dr. Marini Pediatria'
  },
  {
    path: 'vaccinazioni',
    loadComponent: () => import('./pages/vaccinazioni/vaccinazioni.component').then((m) => m.VaccinazioniComponent),
    title: 'Calendario Vaccinazioni — Dr. Marini Pediatria Verona'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Prenota una visita — Dr. Marini Pediatria'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
