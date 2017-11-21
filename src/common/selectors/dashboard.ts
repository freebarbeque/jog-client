import {createSelector} from 'reselect';

export const getCurrentPathName = (state: any) => state.router.location.pathname;

export const getBaseUrlForTabs = createSelector(
  getCurrentPathName,
  (pathName: string) => pathName.replace(/\/\w+$/g, '')
);

export const getLastPathName = createSelector(
  getCurrentPathName,
  (pathName: string) => {
    const matched = pathName.match(/\/\w+$/g);
    return matched ? matched[0] : '';
  }
);