import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/admin/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Typography',
    url: '/admin/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'USERS',
    url: '/admin/users',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'add User',
        url: '/admin/users/addUser',
        iconComponent: { name: 'cilUserFollow' }
      },
      {
        name: 'show Users',
        url: '/admin/users',
        iconComponent: { name: 'cilGroup' }
      }

    ]
  },
  {
    name: 'Reclamations',
    url: '/admin/reclamations',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'add Reclamations',
        url: '/admin/reclamations/addReclamation',
        iconComponent: { name: 'cil-note-add' }
      },
      {
        name: 'show Reclamations',
        url: '/admin/reclamations',
        iconComponent: { name: 'cil-list-rich' }
      },
      {
        name: 'Reclamation Charts',
        url: '/admin/reclamations/charts',
        iconComponent: { name: 'cil-chart' }
      }
    ]
  },
  {
    name: 'Events',
    url: '/admin/events',
    iconComponent: { name: 'cil-bullhorn' },
    children: [
      {
        name: 'add Events',
        url: '/admin/events/addEvent'
      },
      {
        name: 'show Events',
        url: '/admin/events'
      },
      {
        name: 'Event Charts',
        url: '/admin/events/charts',
        iconComponent: { name: 'cil-chart' }
      }
    ]
  },
  {
    name: 'Clubs',
    url: '/admin/clubs',
    iconComponent: { name: 'cil-bullhorn' },
    children: [
      {
        name: 'add Clubs',
        url: '/admin/clubs/addClub'
      },
      {
        name: 'show Clubs',
        url: '/admin/clubs'
      },
      {
        name: 'Club Charts',
        url: '/admin/clubs/charts',
        iconComponent: { name: 'cil-chart' }
      }
    ]
  },

  {
    name: 'ADS',
    iconComponent: { name: 'cil-star' },
    url: '/admin/ad',
    children: [
      {
        name: 'addAd',
        url: '/admin/ad/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showAd',
        url: '/admin/ad/show'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/admin/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
