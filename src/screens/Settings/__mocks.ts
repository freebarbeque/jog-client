import MyProfile from './components/MyProfile';

export const SETTINGS_SECTIONS = [
    {
        title: 'My profile',
        content: 'My profile',
        renderer: MyProfile
    },
    {
        title: 'About us',
        content: 'About us',
        renderer: null
    },
    {
        title: 'Terms and conditions',
        content: 'Terms and conditions',
        renderer: null
    },
    {
        title: 'Cookies policy',
        content: 'Cookies policy',
        renderer: null
    },
    {
        title: 'Privacy policy',
        content: 'Privacy policy',
        renderer: null
    }
];

export default SETTINGS_SECTIONS;