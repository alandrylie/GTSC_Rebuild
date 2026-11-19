import { APP_ROUTES } from './app-routes.constants';
import { ClubAreaLink } from '../model/club-area-link';

// The tiles on the Club Area page. To add a new back-office page, add one entry here.
export const CLUB_AREA_LINKS = (() => {
  const links: ClubAreaLink[] = [
    {
      title: 'Range Officer Chat',
      description: 'Message the other range officers.',
      icon: 'forum',
      route: APP_ROUTES.roChat,
    },
    {
      title: `RO Rota's`,
      description: 'See who is the range officer at each club night.',
      icon: 'event',
      route: APP_ROUTES.roRota,
    },
    {
      title: `Rota Manager`,
      description: 'Creates the Rota for the club.',
      icon: 'event',
      route: APP_ROUTES.clubArea,
    },
    {
      title: `Committee Discussion`,
      description: 'General Committee discussion',
      icon: 'event',
      route: APP_ROUTES.clubArea,
    },
    {
      title: `Executive Committee Discussion`,
      description: 'Executive Committee discussion',
      icon: 'event',
      route: APP_ROUTES.clubArea,
    },
    {
      title: `Add/amend roles`,
      description: 'Used to add remove or update roles of signed in users.',
      icon: 'event',
      route: APP_ROUTES.clubArea,
    },
  ];
  return Object.freeze(links);
})();
