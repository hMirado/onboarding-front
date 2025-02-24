import { Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/home/home.component').then(component => component.HomeComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./modules/customer/components/onboarding/onboarding.component').then(component => component.OnboardingComponent)
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path:'',
                loadChildren: () => import('./modules/admin/admin.route').then(route => route.admin_route)
            }
        ]
    }
];
