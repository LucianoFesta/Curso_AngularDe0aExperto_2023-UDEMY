import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: HomePageComponent
    // },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'contact',
        component: ContactPageComponent
    },
    {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(module => module.CountriesModule) //Importo a mi ruteo principal, el children (otro ruteo). es como una promesa en donde espera que devuelva un modulo y selecciono que modulo deseo importar. CARGA PEREZOSA DE UN MÓDULO --> LazyLoad.
    },
    {
        path: '**',
        redirectTo: 'countries'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes), //Si es el principal modulo de ruteo lo importo de esta manera. Sino es .forChild(routes); 
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
