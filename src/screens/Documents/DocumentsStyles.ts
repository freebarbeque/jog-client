import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, PURPLE } from '../../cfg/globStyles';

export const SCANNED_IMG = require('../../../img/scanned.png');

const styles = StyleSheet.create({
    documents_container: {

    },
    scanned_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    list_of_scanned_container: {
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 50
    },
    scanned_title: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20,
        color: PURPLE
    },
    scanned_doc_container: {
        paddingBottom: 30,
    },
    scanned_doc_img: {
        width: 96,
        height: 130,
        marginLeft: 5
    },
    scanned_doc_name: {
        fontSize: 12,
        textAlign: 'center'
    }
});

export default styles;