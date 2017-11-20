export const parseDashboardLocation = (location: string, datasource: any) => {
  const splittedLocation = location.replace(/\/app\//, '').split('/');
  return splittedLocation.map(location => datasource[location]);
};