import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { BlankComponent } from './pages/blank/blank.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CustomerCreditComponent } from './pages/customer-credit/customer-credit.component';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LocalComponent } from './pages/local/local.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
        component: LocalComponent,
        pathMatch: 'full',
        title: 'Local | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'ecommerce',
        component:EcommerceComponent,
        title:'Ecommerce | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'calendario',
        component:CalenderComponent,
        title:'Calendario | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'productos',
        component:ProductsComponent,
        title:'Productos | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'pedidos',
        component:OrdersComponent,
        title:'Pedidos | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'ventas',
        component:SalesComponent,
        title:'Ventas | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'clientes',
        component:ClientsComponent,
        title:'Clientes | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'clientes-credito',
        component:CustomerCreditComponent,
        title:'Clientes - Crédito | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'proveedores',
        component:SuppliersComponent,
        title:'Proveedores | Bodega',
        canActivate: [AuthGuard]
      },
      {

        path:'perfil',
        component:ProfileComponent,
        title:'Perfil | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'form-elements',
        component:FormElementsComponent,
        title:'Form Elements | Bodega',
        canActivate: [AuthGuard]
      },
      {
        path:'basic-tables',
        component:BasicTablesComponent,
        title:'Angular Basic Tables Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      // support tickets
      {
        path:'invoice',
        component:InvoicesComponent,
        title:'Angular Invoice Details Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'line-chart',
        component:LineChartComponent,
        title:'Angular Line Chart Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'bar-chart',
        component:BarChartComponent,
        title:'Angular Bar Chart Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'alerts',
        component:AlertsComponent,
        title:'Angular Alerts Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'avatars',
        component:AvatarElementComponent,
        title:'Angular Avatars Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'badge',
        component:BadgesComponent,
        title:'Angular Badges Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'buttons',
        component:ButtonsComponent,
        title:'Angular Buttons Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'images',
        component:ImagesComponent,
        title:'Angular Images Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
      {
        path:'videos',
        component:VideosComponent,
        title:'Angular Videos Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate: [AuthGuard]
      },
    ]
  },
  // auth pages
  {
    path:'iniciar-sesion',
    component:SignInComponent,
    title:'Iniciar Sesión | Bodega',
    canActivate: [AuthenticatedGuard]
  },
  {
    path:'registrarse',
    component:SignUpComponent,
    title:'Registrarse | Bodega',
    canActivate: [AuthenticatedGuard]
  },
  // error pages
  {
    path:'**',
    component:NotFoundComponent,
    title:'Error | Bodega'
  },
];
