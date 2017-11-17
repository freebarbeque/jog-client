export const parseDashboardLocation = (location: string, datasource: any) => {
  const splittedLocation = location.slice(1).split('/');
  return splittedLocation.map(location => datasource[location]);
};