import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './admin/containers';
import { Page404Component } from './admin/views/pages/page404/page404.component';
import { Page500Component } from './admin/views/pages/page500/page500.component';
import { LoginComponent } from './admin/views/pages/login/login.component';
import { RegisterComponent } from './admin/views/pages/register/register.component';
import {DefaultLayoutUComponent} from "./user/default-layout-u/default-layout-u.component";
import {CommingSoonComponent} from "./user/comming-soon/comming-soon.component";
import {UserIndexComponent} from "./user/user-index/user-index.component";
import {SigninComponent} from "./user/signin/signin.component";
import {PaginationsComponent} from "./admin/views/base/paginations/paginations.component";
import {UserDetailsComponent} from "./admin/user/user-details/user-details.component";
import {UserShowAllComponent} from "./admin/user/user-show-all/user-show-all.component";
import {UserAddComponent} from "./admin/user/user-add/user-add.component";
import {UserUpdateComponent} from "./admin/user/user-update/user-update.component";
import {ReclamationShowAllComponent} from "./admin/reclamation/reclamation-show-all/reclamation-show-all.component";
import {ReclamationAddComponent} from "./admin/reclamation/reclamation-add/reclamation-add.component";
import {ReclamationUpdateComponent} from "./admin/reclamation/reclamation-update/reclamation-update.component";
import {AuthGaurdService} from "./_services/auth-gaurd.service";
import {
  ReclamationShowFilesComponent
} from "./admin/reclamation/reclamation-show-all/reclamation-show-files/reclamation-show-files.component";
import {
  ReclamationAddFileComponent
} from "./admin/reclamation/reclamation-add/reclamation-add-file/reclamation-add-file.component";
import {ReclamationChartsComponent} from "./admin/reclamation/reclamation-charts/reclamation-charts.component";
import {EventShowAllComponent} from "./admin/event/event-show-all/event-show-all.component";
import {EventAddComponent} from "./admin/event/event-add/event-add.component";
import {EventUpdateComponent} from "./admin/event/event-update/event-update.component";
import {EventShowFilesComponent} from "./admin/event/event-show-all/event-show-files/event-show-files.component";
import {EventChartsComponent} from "./admin/event/event-charts/event-charts.component";
import {EventAddFileComponent} from "./admin/event/event-add/event-add-file/event-add-file.component";
import {EventParticipantsComponent} from "./admin/event/event-show-all/event-participants/event-participants.component";
import {
  EventAddParticipantsComponent
} from "./admin/event/event-show-all/event-participants/event-add-participants/event-add-participants.component";
import {EventDetailsComponent} from "./admin/event/event-show-all/event-details/event-details.component";
import {BrowseEventsComponent} from "./user/browse-events/browse-events.component";
import {UserEventDetailsComponent} from "./user/browse-events/user-event-details/user-event-details.component";
import {ClubEventsComponent} from "./user/browse-events/club-events/club-events.component";
import {BrowseReclamationsComponent} from "./user/browse-reclamations/browse-reclamations.component";
import {
  UserReclamationDetailsComponent
} from "./user/browse-reclamations/user-reclamation-details/user-reclamation-details.component";
import {
  UserReclamationAddComponent
} from "./user/browse-reclamations/user-reclamation-add/user-reclamation-add.component";

import {
  UserReclamationFilesAddComponent
} from "./user/browse-reclamations/user-reclamation-add/user-reclamation-files-add/user-reclamation-files-add.component";
import {ClubShowAllComponent} from "./admin/club/club-show-all/club-show-all.component";
import {ClubAddComponent} from "./admin/club/club-add/club-add.component";
import {ClubAddFileComponent} from "./admin/club/club-add/club-add-file/club-add-file.component";
import {ClubChartsComponent} from "./admin/club/club-charts/club-charts.component";
import {ClubDetailsComponent} from "./admin/club/club-show-all/club-details/club-details.component";
import {ClubShowFilesComponent} from "./admin/club/club-show-all/club-show-files/club-show-files.component";
import {ClubUpdateComponent} from "./admin/club/club-update/club-update.component";

const routes: Routes = [

  {
    path: '',
    component: DefaultLayoutUComponent,
    children:[
     /* {
        path : '',
        component : CommingSoonComponent
      },*/
      {
        path : 'signin',
        component : SigninComponent
      },


      {
        path : '',
        component : UserIndexComponent
      },
      {
        path : 'reclamations',
        component : BrowseReclamationsComponent
      },
      {
        path: 'reclamations/:id/Files/add',
        component: UserReclamationFilesAddComponent
      },
      {
        path : 'reclamations/add',
        component : UserReclamationAddComponent
      },
      {
        path : 'reclamation/details/:id',
        component : UserReclamationDetailsComponent
      },
      {
        path : 'events',
        component : BrowseEventsComponent
      },
      {
        path : 'events/club',
        component : ClubEventsComponent
      },
      {
        path : 'events/details/:id',
        component : UserEventDetailsComponent
      }
    ]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate:[AuthGaurdService],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'course/add',
        component: PaginationsComponent
      },
      {
        path: 'users/showUser/:id',
        component: UserDetailsComponent
      },
      {
        path: 'users/addUser',
        component: UserAddComponent
      },
      {
        path: 'users/updateUser/:id',
        component: UserUpdateComponent
      },
      {
        path: 'users',
        component: UserShowAllComponent
      },
      {
        path: 'reclamations',
        component: ReclamationShowAllComponent
      },
      {
        path: 'reclamations/addReclamation',
        component: ReclamationAddComponent
      },
      {
        path: 'reclamations/updateReclamation/:id',
        component: ReclamationUpdateComponent
      },
      {
        path: 'reclamations/:id/Files',
        component: ReclamationShowFilesComponent,
      },
      {
        path: 'reclamations/charts',
        component: ReclamationChartsComponent,
      },
      {
        path: 'reclamations/:id/Files/add',
        component: ReclamationAddFileComponent,
      },

      {
        path: 'events',
        component: EventShowAllComponent
      },
      {
        path: 'events/addEvent',
        component: EventAddComponent
      },
      {
        path: 'events/updateEvent/:id',
        component: EventUpdateComponent
      },
      {
        path: 'events/:id/Files',
        component: EventShowFilesComponent,
      },
      {
        path: 'events/:id/participants',
        component: EventParticipantsComponent,
      },
      {
        path: 'events/:id/participants/Addparticipants',
        component: EventAddParticipantsComponent,
      },
      {
        path: 'events/:id/eventDetails',
        component: EventDetailsComponent,
      },
      {
        path: 'events/charts',
        component: EventChartsComponent,
      },
      {
        path: 'events/:id/Files/add',
        component: EventAddFileComponent,
      },
      {
        path: 'clubs',
        component: ClubShowAllComponent
      },
      {
        path: 'clubs/addClub',
        component: ClubAddComponent
      },
      {
        path: 'clubs/updateClub/:id',
        component: ClubUpdateComponent
      },
      {
        path: 'clubs/:id/Files',
        component: ClubShowFilesComponent,
      },
      {
        path: 'clubs/:id/clubDetails',
        component: ClubDetailsComponent,
      },
      {
        path: 'clubs/charts',
        component: ClubChartsComponent,
      },
      {
        path: 'clubs/:id/Files/add',
        component: ClubAddFileComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import('./admin/views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./admin/views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./admin/views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./admin/views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./admin/views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./admin/views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./admin/views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./admin/views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./admin/views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./admin/views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',

      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
