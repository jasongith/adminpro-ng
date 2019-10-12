import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from './notfound/notfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        NotfoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    exports: [
        NotfoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]
})
export class SharedModule { }
