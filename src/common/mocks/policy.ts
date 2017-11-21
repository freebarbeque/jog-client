import {IInsurer, IPolicy} from '../interfaces/policies';

export const policies: IPolicy[] = [
  {
    id: 0,
    name: 'Policy 1',
    status: 'Add more details to complete this policy',
    policyAvatar: 'http://www.newdesignfile.com/postpic/2014/10/procedure-policy-standards-icon_74483.png',
    type: 'Motor Vehicle',
    insurer: 'Admiral Insurer',
  },
  {
    id: 1,
    name: 'Policy 2',
    status: 'Add more details to complete this policy',
    policyAvatar: 'http://icons.iconarchive.com/icons/blackvariant/button-ui-requests-4/1024/Autodesk-360-icon.png',
    type: 'Motor Vehicle',
    insurer: 'Admiral Insurer',
  },
  {
    id: 2,
    name: 'Policy 3',
    status: 'Add more details to complete this policy',
    policyAvatar: 'http://www.buildingmobilebritain.org.uk/wp-content/uploads/2017/07/y4.png',
    type: 'Motor Vehicle',
    insurer: 'Admiral Insurer',
  },
];

export const insurers: IInsurer[] = [
    {
        id: 0,
        name: 'Insurer 0',
    },
    {
        id: 1,
        name: 'Insurer 1',
    },
    {
        id: 2,
        name: 'Insurer 2',
    },
    {
        id: 3,
        name: 'Insurer 3',
    }
]