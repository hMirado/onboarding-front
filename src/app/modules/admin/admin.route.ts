import {Routes} from "@angular/router";

export const admin_route: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(component => component.DashboardComponent)
    },
    {
        path: 'onboarding/:id',
        loadComponent: () => import('./modules/onboarding/edit/edit.component').then(component => component.EditComponent)
    }
] 