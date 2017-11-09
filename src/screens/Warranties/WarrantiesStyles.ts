import { StyleSheet } from 'react-native';
import { WHITE, GREY, CREME, GREY_SETTINGS_BG } from '../../cfg/globStyles';

export const APPLE_LOGO = require('../../../img/apple_logo.png');
export const PHILIPS_LOGO = require('../../../img/philips_logo.png');
export const WARR_ITEM_COVER = require('../../../img/warr_item_cover.png');

const styles = StyleSheet.create({
    warr_container: {
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
        height: 151
    },
    item_cover_container: {
        backgroundColor: WHITE,
        width: '100%',
        height: 140
    },
    item_info_container: {
        backgroundColor: '#EEEFF0',
        height: 140,
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
    item_logo_img: {
        backgroundColor: 'transparent'
    },
    warr_type_text: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: .8,
        marginTop: 50
    },
    product_text: {
        fontSize: 20,
        fontWeight: '300',
        color: '#333'
    },
    help_container: {
        backgroundColor: GREY_SETTINGS_BG,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }

});

export default styles;