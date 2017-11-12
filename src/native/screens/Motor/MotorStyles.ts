import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, GREY, GREY_SETTINGS_BG } from '../../cfg/globStyles'

export const ADMIRAL_LOGO = require('../../../../img/admiral_logo.png');
export const MOTOR_COVER_IMG = require('../../../../img/motor_cover_img.png');
export const ADD_ICON = require('../../../../img/add_icon.png');

const styles = StyleSheet.create({
    motor_container: {
        backgroundColor: CREME,
        height: '100%'
    },
    sub_header: {
        backgroundColor: GREY,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
    },
    sub_header_text: {
        color: WHITE,
        fontSize: 15,
        fontWeight: '500'
    },
    list: {},
    item_container: {
        marginBottom: 20,  
        paddingLeft: 20,
        paddingRight: 20,   
    },
    first_container: {
        marginTop: 20
    },
    item_cover: {
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    item_img_cover: {
        width: '100%',
        height: 190,
        backgroundColor: WHITE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_img: {
        width: 274,
        height: 120
    },
    item_cover_container: {
        backgroundColor: WHITE,
        width: '100%',
        height: 140
    },
    item_info_container: {
        backgroundColor: '#EEEFF0',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo_round: {
        height: 90,
        width: 90,
        borderRadius: 60,
        position: 'absolute',
        zIndex: 10,
        backgroundColor: WHITE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        top: 145,
        left: '36%'
    },
    add_icon: {
        position: 'absolute',
        width: 32,
        height: 32,
        bottom: 20,
        right: 20
    },
    item_logo_img: {
        backgroundColor: 'transparent',
        borderRadius: 40
    },
    warr_type_text: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: .8,
        marginTop: 90
    },
    product_text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    help_container: {
        backgroundColor: GREY_SETTINGS_BG,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    round_add_icon: {
        position: 'absolute',
        width: 32,
        height: 32,
    }

});

export default styles;