import * as React from 'react';
import {  Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import TabNavigation from './TabNavigation';
import { addNavigationHelpers } from 'react-navigation';
import InfoHeader from './InfoHeader';
import styles, { SUB_HEADER_DROP_ARROW } from '../PolicyInfoStyles';
import styles_upl, { UPLOAD_ARROW } from '../../Overview/OverviewStyles';
import { policy } from '../__mocks';
import { GETTING_QUOTES_ROUTE } from '../../../nav/main/routes';

interface Props {
    dispatch: Function;
    navigation: any;
    localState: any;
    currentTab: string;
    carCompletedPercent: number;
}

const renderHeaderInfo = (navigation, currentTab) => {
    switch (currentTab) {
        case 'Quote':
            return (
                <View style={styles.header_info_container}>
                    <View style={styles.policy_img_container}>
                        <View style={styles.round_img_container}>
                        <Image style={styles.round_img} source={policy.seller_img}/>
                        </View>
                    </View>
                    <View style={styles.header_title_container}>
                        <Image style={styles.sub_header_drop_arrow} source={SUB_HEADER_DROP_ARROW}/>
                        <Text style={[styles.header_sub_title, styles.header_sub_title_started]}>{'POLICY STARTED'}</Text>
                        <Text style={styles.header_title}>{`25 May 2017`}</Text>
                    </View>
                </View>
            );
        default:
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
}

const renderBottomSection = (currentTab, navigation, carCompletedPercent) => {
    switch (currentTab) {
        case 'Overview':
            return (
                <TouchableOpacity style={styles_upl.upload_docs}>
                    <Text style={styles_upl.upload_docs_text}>{`Please upload your policy\ndocumentation for complete profile`}</Text>
                    <Image style={styles_upl.upload_docs_arrow} source={UPLOAD_ARROW}/>
                </TouchableOpacity>
            );
        case 'Quote':
            return (
                <TouchableOpacity disabled={carCompletedPercent < 80}
                style={[styles.get_quote_disabled, carCompletedPercent > 80 && styles.get_quote_enabled]} onPress={() => navigation.navigate(GETTING_QUOTES_ROUTE)}>
                    <Text style={[styles.get_quote_text_disabled, carCompletedPercent > 50 && styles.get_quote_text_enabled]}>{`Get a quote`}</Text>
                </TouchableOpacity>
            );
        default:
            return null
    }
}


const PolicyInfo:React.StatelessComponent<Props> = (props) => {
    const {dispatch, navigation, localState, currentTab, carCompletedPercent} = props;
    const tabNavProps: any = {dispatch, state: localState};
    return (
        <View style={styles.policy_info_container}>
            <InfoHeader navigation={navigation}/>
            <ScrollView bounces={false} style={styles.policy_info_scroll}>
                { renderHeaderInfo(navigation, currentTab) }
                <TabNavigation navigation={addNavigationHelpers(tabNavProps)} />
            </ScrollView>
            { renderBottomSection(currentTab, navigation, carCompletedPercent) }
        </View>
    )
};

export default PolicyInfo;
