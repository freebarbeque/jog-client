import { StyleSheet } from 'react-native';
import { PURPLE, WHITE, GREY, PINK, CREME } from '../../cfg/globStyles';

export const TYPE_IMG = require('../../../../img/type.png');
export const EMAIL_IMG = require('../../../../img/email.png');
export const PHOTO_IMG = require('../../../../img/photo.png');
export const TITLE_BG = require('../../../../img/landing_bg.png');

const styles = StyleSheet.create({
    motor_policies_container: {
        backgroundColor: CREME,
        flex: 1
    },
    title_container: {
        height: 147,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title_img: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    title: {
        zIndex: 10,
        backgroundColor: 'transparent',
        color: WHITE,
        fontSize: 26,
        paddingLeft: 30,
    },
    sub_title: {
        zIndex: 10,
        backgroundColor: 'transparent',
        color: WHITE,
        fontSize: 18,
        paddingLeft: 30
    },
    options_container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: WHITE,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    option: {
        height: 75,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20
    },
    border_option: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#EFEFEF'
    },
    recomended: {
        color: PINK,
        fontSize: 12
    },
    opt_title: {
        fontSize: 18
    },
    opt_img: {
        position: 'absolute',
        right: 20,
    },
    email_img: {
        width: 42,
        height: 26,
        top: 25
    },
    photo_img: {
        width: 42,
        height: 32,
        top: 20
    },
    type_img: {
        width: 42,
        height: 28,
        top: 23
    }
});

export default styles;
