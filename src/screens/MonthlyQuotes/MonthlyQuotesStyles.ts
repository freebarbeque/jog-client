import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME } from '../../cfg/globStyles';

export const ARROW_BOLD = require('../../../img/arrow_bold.png');
export const ARROW_THIN = require('../../../img/back_thin_arrow.png');
export const QUOTE_FEATURE_ICON = require('../../../img/quote_feature_icon.png');
export const SELLERS_LOGOS = {
    Admiral: {source: require('../../../img/logo_admiral.png'), style: {}},
    Alianz: {source: require('../../../img/logo_alianz.png'), style: {}},
    seller123: {source: require('../../../img/logo_123.png'), style: {}},
    Aviva: {source: require('../../../img/logo_aviva.png'), style: {}},
}

const styles = StyleSheet.create({
    annual_quotes_container: {
        backgroundColor: WHITE,
        flex: 1
    },
    sort_section: {
        height: 50,
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: CREME
    },
    sort_title: {
        fontWeight: '500',
        fontSize: 16,
    },
    sort_arrow: {
        position: 'absolute',
        width: 7,
        height: 10,
        right: 20,
        top: 21,
        transform: [{rotate: '90deg'}]
    },
    annual_list_of_quotes: {
        paddingBottom: 100
    },
    see_more: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingRight: 20
    },
    see_more_text: {

    },
    quote: {

    },
    quote_info: {
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        paddingLeft: 20
    },
    seller_logo: {
        width: 40,
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        marginRight: 10
    },
    seller_logo_img: {
        width: 35,
        height: 35,
        borderRadius: 20,
    },
    price_container: {
        marginTop: 10
    },
    price_pound: {
        fontWeight: '900',
        fontSize: 24
    },
    price_cent: {
        fontWeight: '900',
        fontSize: 12
    },
    divider: {
        width: 1,
        height: '40%',
        backgroundColor: 'red',
        marginRight: 10,
        marginLeft: 15,

    },
    excess_conainer: {
        marginTop: 10
    },
    excess_amount: {
        fontSize: 16,
        color: '#999',
        marginRight: 5
    },
    excess_amount_label: {
        fontSize: 10,
        color: '#999',
        position: 'absolute',
        top: -15
    },
    arrow_right: {
        width: 8,
        height: 10,
        position: 'absolute',
        right: 20
    },
    quote_bottom: {
        backgroundColor: '#E2E2E2',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#CCC',
        height: 30,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    bottom_text: {
        fontSize: 12,
        fontWeight: '500'
    },
    feature: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        height: 50,
        paddingLeft: 80
    },
    first_feature: {
        borderTopColor: '#CCC',
        borderTopWidth: 1,
    },
    feature_icon: {
        position: 'absolute',
        width: 15,
        height: 10,
        left: 40
    },
    feature_text: {
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    curent_quote_container: {
        height: '100%',
        paddingBottom: 20
    },
    current_back: {
        backgroundColor: '#FFF',
        borderBottomColor: CREME,
        borderBottomWidth: 6,
        height: 58,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 50,
        paddingTop: 2
    },
    arrow_thin: {
        width: 15,
        height: 20,
        position: 'absolute',
        left: 25,
        top: 16
    },
    current_back_text: {
        color: '#CCC',
        fontSize: 12
    },
    current_info_container: {
        backgroundColor: WHITE,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
    },
    current_seller_logo: {
        width: 66,
        height: 66,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 33,
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        marginRight: 10,
        position: 'absolute',
        left: 20,
        top: 20
    },
    current_seller_logo_img: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    current_seller_name: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        marginLeft: 80,
        paddingBottom: 5,
        marginBottom: 10
    },
    current_price_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 80
    },
    current_annually_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 23
    },
    current_price_pound: {
        fontWeight: '900',
        fontSize: 24
    },
    current_price_cent: {
        fontWeight: '900',
        fontSize: 12,
        marginBottom: 3
    },
    current_amount_label: {
        fontSize: 11,
        fontWeight: 'normal',
        color: '#CCC',
        position: 'absolute',
        top: -14,
        left: 0
    },
    excess_upfront_container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2
    },
    current_excess_conainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 2,
    },
    horizontal_divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#E2E2E2',
    },
    current_excess_label: {
        fontSize: 11,
        fontWeight: 'normal',
        color: '#CCC',
        position: 'absolute',
        left: 10,
        top: 10
    },
    current_upfront_label: {
        fontSize: 11,
        fontWeight: 'normal',
        color: '#CCC',
        position: 'absolute',
        left: 10,
        top: 10
    },
    current_excess_amount: {
        fontSize: 20,
        color: '#999'
    },
    features_list: {
        marginTop: 12
    },
    current_seller_name_text: {
        fontSize: 20,
    }
});

export default styles;