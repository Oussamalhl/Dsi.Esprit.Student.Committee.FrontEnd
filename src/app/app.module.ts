import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './admin/containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule, CarouselModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule, PopoverModule,
  ProgressModule,
  SharedModule,
  SidebarModule, TableModule,
  TabsModule, ToastModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import { DefaultLayoutUComponent } from './user/default-layout-u/default-layout-u.component';
import { DefaultFooterUComponent } from './user/default-layout-u/default-footer-u/default-footer-u.component';
import { DefaultHeaderUComponent } from './user/default-layout-u/default-header-u/default-header-u.component';
import { CommingSoonComponent } from './user/comming-soon/comming-soon.component';
import { UserIndexComponent } from './user/user-index/user-index.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent} from './user/signup/signup.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatOptionModule} from "@angular/material/core";
import { NgxStarRatingModule } from 'ngx-star-rating';

import {MatRadioModule} from "@angular/material/radio";
import { UserShowAllComponent } from './admin/user/user-show-all/user-show-all.component';
import { UserDetailsComponent } from './admin/user/user-details/user-details.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import { UserAddComponent } from './admin/user/user-add/user-add.component';
import { UserUpdateComponent } from './admin/user/user-update/user-update.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { ReclamationShowAllComponent } from './admin/reclamation/reclamation-show-all/reclamation-show-all.component';
import { ReclamationAddComponent } from './admin/reclamation/reclamation-add/reclamation-add.component';
import { ReclamationUpdateComponent } from './admin/reclamation/reclamation-update/reclamation-update.component';
import { ReclamationShowFilesComponent } from './admin/reclamation/reclamation-show-all/reclamation-show-files/reclamation-show-files.component';
import { ReclamationAddFileComponent } from './admin/reclamation/reclamation-add/reclamation-add-file/reclamation-add-file.component';
import { ReclamationChartsComponent } from './admin/reclamation/reclamation-charts/reclamation-charts.component';
import {ChartjsModule} from "@coreui/angular-chartjs";



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];
@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, DefaultLayoutUComponent, DefaultFooterUComponent, DefaultHeaderUComponent, CommingSoonComponent, UserIndexComponent, SigninComponent,SignupComponent, UserShowAllComponent, UserDetailsComponent, UserAddComponent, UserUpdateComponent, ReclamationShowAllComponent, ReclamationAddComponent, ReclamationUpdateComponent, ReclamationShowFilesComponent, ReclamationAddFileComponent, ReclamationChartsComponent],
    imports: [
        BrowserModule,
        ScheduleModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AvatarModule,
        BreadcrumbModule,
        FooterModule,
        DropdownModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        IconModule,
        PerfectScrollbarModule,
        NavModule,
        ButtonModule,
        FormModule,
        UtilitiesModule,
        ButtonGroupModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        TabsModule,
        ListGroupModule,
        ProgressModule,
        BadgeModule,
        ListGroupModule,
        FormsModule,
        CardModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        TableModule,
        MatSortModule,
        MatTableModule,
        PopoverModule,
        MatPaginatorModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatOptionModule,
        NgxStarRatingModule,
        MatRadioModule,
        MatExpansionModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule,
        CarouselModule,
        ToastModule,
        ChartjsModule


    ],
  providers: [
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
