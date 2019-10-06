// modulos
import { Routes, RouterModule } from '@angular/router';

// componentes
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { RegisterComponent } from './login/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });

