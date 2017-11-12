import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, PURPLE, GREY } from '../../cfg/globStyles';

export const SCANNED_IMG = require('../../../../img/scanned.png');

const styles = StyleSheet.create({
    documents_container: {
        backgroundColor: CREME,
        flex: 1
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
    },
    upload_container: {
        backgroundColor: WHITE,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    camera_touch: {
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: LIGHT_GREY,
        height: 135,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    camera_label: {
        fontSize: 18,
        color: '#CCC'
    },
    browse_touch: {
        backgroundColor: '#E2E3E5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 65,
        marginBottom: 25
    },
    browse_label: {
        fontSize: 16,
        color: '#4D6077'
    }
});

export default styles;