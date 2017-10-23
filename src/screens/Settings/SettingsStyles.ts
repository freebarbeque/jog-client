import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG } from '../../cfg/globStyles'

const styles = StyleSheet.create({
    settings_container: {
        backgroundColor: CREME,
        height: '100%'
    },
    list_cover: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        flexGrow: 1,
        paddingTop: 20
    },
    item_header: {
        backgroundColor: WHITE,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        marginHorizontal: 20
    },
    top_border: {
        borderTopWidth: 1,
        borderTopColor: '#CCC',
    },
    border_none: {
        borderBottomWidth: 0
    },
    item_header_text: {
        fontSize: 18
    },
    drop_arrow: {
        width: 20,
        height: 20
    },
    drop_item_content_view: {
        marginHorizontal: 20
    },
    my_profile_container: {
        marginBottom: 20
    },
    avatar_img_cover: {
        backgroundColor: WHITE,
        paddingLeft: 20,
        paddingBottom: 10
    },
    avatar_img: {
        width: 90,
        height: 90
    },
    info_container: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: LIGHT_GREY
    },
    info_subtitle: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 12
    },
    info: {
        fontSize: 18,
        marginTop: 5
    },
    change_email_view: {
        backgroundColor: PINK,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15
    },
    change_email_subtitle: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 12
    },
    info_email: {
        color: WHITE,
        fontSize: 16
    },
    arrow_right: {
        transform: [{rotate: '90deg'}],
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20,
        top: 23
    },
    help_container: {
        backgroundColor: GREY_SETTINGS_BG,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    help_rect: {
        height: 44,
        width: 100,
        marginTop: 25,
        marginRight: 25,
        overflow: 'visible'
    },
    help_rect_left: {
        backgroundColor: '#E2E2E2',
        height: 44,
        width: 44,
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 88
    },
    help_rect_center: {
        height: 44,
        width: 60,
        backgroundColor: '#E2E2E2',
        position: 'absolute',
        left: 20,
        
    },
    help_rect_right: {
        backgroundColor: '#E2E2E2',
        height: 44,
        width: 44,
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 88
    },
    help_rect_img: {
        width: 28,
        height: 28,
        position: 'absolute',
        top: 8,
        left: 10
        
    },
    help_rect_text: {
        position: 'absolute',
        right: 18,
        top: 11,
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#666'
    }
});

export default styles;