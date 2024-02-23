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
    name: 'EVENTS',
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
      }
    ]
  },
  {
    name: 'Reclamations',
    url: '/admin/fundraisers',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'addFundraiser',
        url: '/admin/fundraiser/add'
      },
      {
        name: 'showFundraiser',
        url: '/admin/fundraiser/show'
      }
    ]
  },
  {
    name: 'SUBSCRIPTIONS',
    iconComponent: { name: 'cil-star' },
    url: '/admin/subscription',
    children: [
      {
        name: 'addSubscription',
        url: '/admin/subscription/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showSubscription',
        url: '/admin/subscription/show'
      }
    ]
  },
  {
    name: 'PACKS',
    url: '/admin/pack',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'addPack',
        url: '/admin/pack/add'
      },
      {
        name: 'showPack',
        url: '/admin/pack/show'
      }
    ]
  },
  {
    name: 'COURSES',
    iconComponent: { name: 'cil-star' },
    url: '/admin/course',
    children: [
      {
        name: 'addCourse',
        url: '/admin/course/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showCourse',
        url: '/admin/course/show'
      }
    ]
  },
  {
    name: 'COMPLAINTS',
    iconComponent: { name: 'cil-star' },
    url: '/admin/complaint',
    children: [
      {
        name: 'addComplaint',
        url: '/admin/complaint/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showComplaint',
        url: '/admin/complaint/show'
      }
    ]
  },
  {
    name: 'ChatBot',
    iconComponent: { name: 'cil-star' },
    url: '/admin/chatbot',
  },

  {
    name: 'ExpertInterview',
    iconComponent: { name: 'cil-star' },
    url: '/admin/expertinterview',
    children: [
      {
        name: 'Add ExpertInterview',
        url: '/admin/expertinterview/add'
      },
      {
        name: 'Show ExpertInterview',
        url: '/admin/expertinterview/show',
        badge: {
          color: 'success',
          text: 'FREE'
        },
      },
      {
        name: 'Best Ratings',
        url: '/admin/expertinterview/bestrating'
      },
    ]
  },
  {
    name: 'OFFERS',
    iconComponent: { name: 'cil-star' },
    url: '/admin/offer',
    children: [
      {
        name: 'addOffer',
        url: '/admin/offer/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showOffer',
        url: '/admin/offer/show'
      }
    ]
  },
  {
    name: 'INTERVIEWS',
    iconComponent: { name: 'cil-star' },
    url: '/admin/interview',
    children: [
      {
        name: 'addInterview',
        url: '/admin/interview/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showInterview',
        url: '/admin/interview/show'
      }
    ]
  },
  {
    name: 'POSTS',
    iconComponent: { name: 'cil-star' },
    url: '/admin/post',
    children: [
      {
        name: 'addPost',
        url: '/admin/post/add',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'showPost',
        url: '/admin/post/show'
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
