import { StyleSheet } from 'react-native';
import { PURPLE, WHITE, GREY, PINK } from '../../cfg/globStyles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: PURPLE,
        width: '100%',
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'space-between'
    },
    logo_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo_touchable: {
        marginTop: 30,

    },
    logo_img: {
        width: 70,
        height: 35,
        
    },
    signout_touchable: {
        marginTop: 40
    },
    singout_text: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '500'

    },
    links_container: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 7
    },
    policies_btn_text: {
        color: GREY,
        fontWeight: 'bold',
        fontSize: 14
    },
    settings_btn_text: {
        color: GREY,
        fontWeight: 'bold',
        fontSize: 14
    },
    policies_btn_touchable: {
        marginRight: 25
    },
    red_btn: {
        color: PINK
    }
});

export default styles;