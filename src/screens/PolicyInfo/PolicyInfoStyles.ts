import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, PURPLE } from '../../cfg/globStyles';

export const BACK_ARROW = require('../../../img/right_arrow.png');
export const LOGO_IMG = require('../../../img/logo.png');
export const SUB_HEADER_DROP_ARROW = require('../../../img/header_drop_arrow.png');

const styles = StyleSheet.create({
    policy_info_container: {
        height: '100%'
    },
    policy_info_scroll: {
        backgroundColor: CREME
    },
    header_container: {
        backgroundColor: PURPLE,
        paddingTop: 30,
        paddingLeft: 20,
        paddingBottom: 10
    },
    logo_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    back_touchable: {

    },
    back_arrow_icon: {
        transform: [{rotate: '180deg'}],
        width: 20,
        height: 35
    },
    logo_touchable: {
        marginLeft: 50
    },
    logo_img: {
        width: 60,
        height: 30,
        marginTop: 5
    },
    header_info_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: 10,
        paddingTop: 35,
        backgroundColor: PURPLE,
        paddingLeft: 30
    },
    header_title_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    policy_img_container: {
        
    },
    round_img_container: {
        width: 56,
        height: 56,
        borderRadius: 56,
        backgroundColor: WHITE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    round_img: {
        width: 38,
        height: 38,
        borderRadius: 19
    },
    header_title: {
        color: WHITE,
        fontSize: 24,
        marginLeft: 20
    },
    header_sub_title: {
        color: WHITE,
        fontSize: 16,
        marginLeft: 20
    },
    header_sub_title_started: {
        opacity: 0.6,
        zIndex: 10,
        fontSize: 12,
        marginBottom: 5,
        fontWeight: '600',
    },
    sub_header_drop_arrow: {
        position: 'absolute',
        height: 8,
        width: 12,
        top: 3,
        right: 10,
        zIndex: 2
    },
    tab_active_indicator: {
        height: 5,
        backgroundColor: PINK
    },
    tab_label: {
        color: WHITE,
        fontWeight: '500',
        fontSize: 16
    },
    tab_bar: {
        backgroundColor: PURPLE
    },
    get_quote_disabled: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    get_quote_text_disabled: {
        fontSize: 19,

    },
    get_quote_enabled: {
        backgroundColor: PINK
    },
    get_quote_text_enabled: {
        color: WHITE
    }
});

export default styles;