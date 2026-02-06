import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostComponent } from './components/post/post.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';

export const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/blog/blog.component').then((m) => m.BlogComponent),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./components/post/post.component').then((m) => m.PostComponent),
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./components/privacy/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'terms',
    loadComponent: () => import('./components/terms/terms.component').then((m) => m.TermsComponent),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
