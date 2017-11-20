export interface IPolicy {
  id: number | string;
  name: string;
  status: string;
  policyAvatar: string;
  type: string;
}

export const policies: IPolicy[] = [
  {
    id: 0,
    name: 'Policy 1',
    status: 'Add more details to complete this policy',
    policyAvatar: 'http://www.newdesignfile.com/postpic/2014/10/procedure-policy-standards-icon_74483.png',
    type: 'Motor Vehicle',
  },
  {
    id: 1,
    name: 'Policy 2',
    status: 'Add more details to complete this policy',
    policyAvatar: 'http://icons.iconarchive.com/icons/blackvariant/button-ui-requests-4/1024/Autodesk-360-icon.png',
    type: 'Motor Vehicle',
  },
  {
    id: 2,
    name: 'Policy 3',
    status: 'Add more details to complete this policy',
    policyAvatar: 'http://www.buildingmobilebritain.org.uk/wp-content/uploads/2017/07/y4.png',
    type: 'Motor Vehicle',
  },
];