import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME } from '../../cfg/globStyles'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    land_container: {
        display: 'flex',
        flexGrow: 20,
        backgroundColor: 'transparent',
    },
    title_container: {
        height: 395,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    land_title: {
        textAlign: 'center',
        color: WHITE,
        fontSize: 36,
        fontWeight: 'bold',
        zIndex: 10
    },
    land_title_divider: {
        width: 40,
        height: 3,
        backgroundColor: PINK,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    land_description: {
        textAlign: 'center',
        color: WHITE,
        fontSize: 18,
        fontWeight: '500'
    },
    land_add_policy_container: {
        height: 75,
        backgroundColor: PINK,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    land_add_policy_text: {
        textAlign: 'center',
        color: WHITE,
        fontSize: 18,
        fontWeight: '500'
    },
    land_add_right_arrow: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 10,

    },
    feature_list: {
        backgroundColor: CREME,
        paddingBottom: 50
    },
    feature_item: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 30
    },
    feature_img: {
        height: 100,
        width: 70,
        alignSelf: 'center'
    },
    feature_subtitle: {
        textAlign: 'center',
        color: PINK,
        fontWeight: 'bold',
        fontSize: 10
    },
    feature_title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    feature_description: {
        textAlign: 'center',
        marginTop: 10
    },
    title_bg_img: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        position: 'absolute'
    }

});

export default styles;