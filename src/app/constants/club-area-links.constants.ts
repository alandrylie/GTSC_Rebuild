import { APP_ROUTES } from './app-routes.constants';
import { ClubAreaLink } from '../model/club-area-link';

// The tiles on the Club Area page. To add a new back-office page, add one entry here.
export const CLUB_AREA_LINKS = (() => {
  const links: ClubAreaLink[] = [
    {
      title: 'Range Officer Chat',
      description: 'Message the other range officers and officers.',
      icon: 'forum',
      route: APP_ROUTES.roChat,
    },
  ];
  return Object.freeze(links);
})();
