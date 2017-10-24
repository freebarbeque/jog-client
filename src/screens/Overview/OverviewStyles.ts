import { StyleSheet } from 'react-native';
import { PURPLE, WHITE, GREY, PINK, CREME, GREY_SETTINGS_BG } from '../../cfg/globStyles';

export const SIGNAL_ICO = require('../../../img/signal_icon.png');
export const BOLD_ARROW_ICO = require('../../../img/arrow_bold.png');
export const UPLOAD_ARROW = require('../../../img/drop_arrow.png')
export const GRAY_BG_COLOR = '#C0BEC3';


const styles = StyleSheet.create({
    gray_bg: {
        backgroundColor: '#F0F1F2'
    },
    left_border: {
        borderLeftWidth: 1,
        borderLeftColor: GRAY_BG_COLOR
    },
    overview_container: {
        flex: 1,
        backgroundColor: CREME
    },
    price_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        backgroundColor: WHITE
    },
    round_img_cover: {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    },
    policy_img: {
        width: 80,
        height: 80
    },
    text_price: {
        fontSize: 26,
        fontWeight: '800',
        marginLeft: 10
    },
    text_cents: {
        fontSize: 16,
        
    },
    text_policy_name: {
        fontSize: 12,
        fontWeight: 'normal',
        
        marginLeft: 30
    },
    bold_arrow_ico: {
        width: 7,
        height: 10,
        position: 'absolute',
        right: 20,
        top: 28
    },
    live_quote_container: {
        backgroundColor: PINK,
        display: 'flex',
        paddingLeft: 30,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: GRAY_BG_COLOR
    },
    live_quote_text: {
        color: WHITE,
        fontSize: 12,
    },
    live_quote_icon: {
        width: 30,
        height: 20,
    },
    policy_object_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 14,
        paddingTop: 14,
        paddingLeft: 30,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_BG_COLOR,
        backgroundColor: WHITE
    },
    policy_object_type: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
    },
    policy_object: {
        fontSize: 16,
        color: '#666'
    },
    expires_container: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: GRAY_BG_COLOR,
        paddingTop: 5,
        paddingBottom: 5
    },
    expires_sub_container: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6,
        paddingTop: 6
    },
    expires_title: {
        fontSize: 12
    },
    expires: {
        fontSize: 26,
        fontWeight: '800',
        marginTop: 5,
        marginBottom: 5
    },
    expires_subtitle: {
        fontSize: 12
    },
    policy_info_top_cover: {
        paddingBottom: 20
    },
    accordion_item_header: {
        backgroundColor: WHITE,
        padding: 20,
        paddingLeft: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    accordion_item_header_text: {
        fontSize: 18
    },
    accordion_item_header_drop_arrow: {
        width: 20,
        height: 20
    },
    drop_item_content_view: {

    },
    help_container: {
        backgroundColor: GREY_SETTINGS_BG,
        height: 110,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    upload_docs: {
        backgroundColor: PINK,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 30,
        borderTopWidth: 2,
        borderTopColor: '#D68E9A'
    },
    upload_docs_text: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 18
    },
    upload_docs_arrow: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20,
        top: 22,
        transform: [{rotate: '90deg'}]
    }
});

export default styles;