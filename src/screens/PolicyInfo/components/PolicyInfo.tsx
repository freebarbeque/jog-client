import * as React from 'react';
import {  Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import TabNavigation from './TabNavigation';
import { addNavigationHelpers } from 'react-navigation';
import InfoHeader from './InfoHeader';
import styles from '../PolicyInfoStyles';
import styles_upl, {UPLOAD_ARROW} from '../../Overview/OverviewStyles';
import {policy} from '../__mocks';

interface Props {
    dispatch: Function;
    navigation: any;
    tabNav: any
}

const renderHeaderInfo = (navigation) => {
    return (
        <View style={styles.header_info_container}>
            <View style={styles.policy_img_container}>
                <View style={styles.round_img_container}>
                <Image style={styles.round_img} source={policy.seller_img}/>
                </View>
            </View>
            <View style={styles.header_title_container}>
                <Text style={styles.header_title}>{policy.name}</Text>
                <Text style={styles.header_sub_title}>{policy.policy_seller}</Text>
            </View>
        </View>
    )
}


const PolicyInfo:React.StatelessComponent<Props> = (props) => {
    const {dispatch, navigation, tabNav} = props;
    console.log('PolicyInfo', props);
    
    return (
        <View style={styles.policy_info_container}>
            <InfoHeader navigation={navigation}/>
            <ScrollView bounces={false} style={styles.policy_info_scroll}>
                { renderHeaderInfo(navigation) }
                <TabNavigation navigationOptions={addNavigationHelpers({dispatch, state: tabNav})} />
            </ScrollView>
            <TouchableOpacity style={styles_upl.upload_docs}>
                <Text style={styles_upl.upload_docs_text}>{`Please upload your policy\ndocumentation for complete profile`}</Text>
                <Image style={styles_upl.upload_docs_arrow} source={UPLOAD_ARROW}/>
            </TouchableOpacity>
        </View>
    )
};

export default PolicyInfo;