import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME } from '../../cfg/globStyles';

export const ARROW_BOLD = require('../../../img/arrow_bold.png');
export const SELLERS_LOGOS = {
    Admiral: {source: require('../../../img/logo_admiral.png'), style: {}},
    Alianz: {source: require('../../../img/logo_alianz.png'), style: {}},
    seller123: {source: require('../../../img/logo_123.png'), style: {}},
    Aviva: {source: require('../../../img/logo_aviva.png'), style: {}},
}


const styles = StyleSheet.create({
    annual_quotes_container: {
        backgroundColor: CREME,
        flex: 1
    },
    fake_tabs: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: WHITE
    },
    fake_tab: {
        flexGrow: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    active_tab: {
        borderBottomWidth: 5,
        borderBottomColor: PINK
    },
    fake_tab_title: {
        fontSize: 12
    },
    active_title: {
        fontWeight: '500'
    },
    sort_section: {
        height: 50,
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'center',

        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    sort_title: {
        fontWeight: '500',
        fontSize: 16
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

    },
    quote: {
        
    }

});

export default styles;