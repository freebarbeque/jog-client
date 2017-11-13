import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { policy } from '../../PolicyInfo/__mocks';
import styles, { SIGNAL_ICO, BOLD_ARROW_ICO, UPLOAD_ARROW } from '../OverviewStyles';
import { DROP_ARROW } from '../../../cfg/globStyles';
import Accordion from 'react-native-collapsible/Accordion';
import { HelpElement } from '../../Settings/components/Settings';

interface IProps {
    navigation: any
}

const renderAccordionHeader = (header) => {
    return (
        <View style={styles.accordion_item_header}>
            <Text style={styles.accordion_item_header_text}>{header.title}</Text>
            <Image style={styles.accordion_item_header_drop_arrow} source={DROP_ARROW} />
        </View>
    )
}

const renderAccordionContent = (inner) => {
    return (
        <View style={styles.drop_item_content_view}> 
            {inner.renderer ? inner.renderer() : <Text>{inner.content}</Text>}
        </View>
    )
}

const renderDropPolicySection = () => {
    return (
        <View style={styles.policy_info_top_cover}>
            <View style={[styles.policy_object_container, styles.gray_bg]}>
                <Text style={styles.policy_object_type}>Level Of Cover</Text>
                <Text style={styles.policy_object}>{policy.level}</Text>
            </View>
            <View style={[styles.policy_object_container, styles.gray_bg]}>
                <Text style={styles.policy_object_type}>Excess</Text>
                <Text style={styles.policy_object}>{policy.excess}</Text>
            </View>
            <View style={[styles.policy_object_container, styles.gray_bg]}>
                <Text style={styles.policy_object_type}>Drivers</Text>
                <Text style={styles.policy_object}>{policy.drivers.toString()}</Text>
            </View>
            <View style={[styles.policy_object_container, styles.gray_bg]}>
                <Text style={styles.policy_object_type}>No Claims Bonus</Text>
                <Text style={styles.policy_object}>{policy.bonus}</Text>
            </View>
        </View>
    )
}

const policySections = [{title: 'Policy', content: 'Policy', renderer: renderDropPolicySection}];

const Overview: React.StatelessComponent<IProps> = (props) => {
    const {navigation: {state: {key}, navigate}} = props;
    
    return (
        <View style={styles.overview_container}>
            <View>
                <View style={styles.price_container}>
                    <View style={styles.round_img_cover}>
                        <Image style={styles.policy_img} source={policy.policy_img} />
                    </View>
                    <Text style={styles.text_price}>
                        {policy.policy_price.split('.')[0]}
                        <Text style={styles.text_cents}>{'.' + policy.policy_price.split('.')[1]}</Text>
                        <Text style={styles.text_policy_name}>{policy.policy_name}</Text>
                    </Text>
                    <Image style={styles.bold_arrow_ico} source={BOLD_ARROW_ICO} />
                </View>
                <View style={styles.live_quote_container}>
                    <Text style={styles.live_quote_text}>LIVE QUOTE</Text>
                    <Image style={styles.live_quote_icon} source={SIGNAL_ICO} />
                </View>
                <View style={[styles.policy_object_container, styles.gray_bg]}>
                    <Text style={styles.policy_object_type}>Vehicle</Text>
                    <Text style={styles.policy_object}>{policy.vehicle}</Text>
                </View>
                <View style={[styles.expires_container, styles.gray_bg]}>
                    <View style={styles.expires_sub_container}>
                        <Text style={styles.expires_title}>EXPIRES</Text>
                        <Text style={styles.expires}>{policy.expiration_day}</Text>
                        <Text style={styles.expires_subtitle}>{policy.expiration_year}</Text>
                    </View>
                    <View style={[styles.expires_sub_container, styles.left_border]}>
                        <Text style={styles.expires_title}>COVERAGE</Text>
                        <Text style={styles.expires}>{policy.expiration_left + ' Days'}</Text>
                        <Text style={styles.expires_subtitle}>REMAINING</Text>
                    </View>
                </View>
                <View style={styles.policy_info_top_cover}>
                    <View style={styles.policy_object_container}>
                        <Text style={styles.policy_object_type}>Insurance Company</Text>
                        <Text style={styles.policy_object}>{policy.policy_seller_short}</Text>
                    </View>
                    <View style={styles.policy_object_container}>
                        <Text style={styles.policy_object_type}>Policy No.</Text>
                        <Text style={styles.policy_object}>{policy.vehicle}</Text>
                    </View>
                    <View style={styles.policy_object_container}>
                        <Text style={styles.policy_object_type}>Cost</Text>
                        <Text style={styles.policy_object}>{policy.policy_number}</Text>
                    </View>
                    <View style={styles.policy_object_container}>
                        <Text style={styles.policy_object_type}>Insurance Company</Text>
                        <Text style={styles.policy_object}>{policy.cost}</Text>
                    </View>
                </View>

                <Accordion
                    sections={policySections}
                    initiallyActiveSection={0}
                    renderHeader={renderAccordionHeader}
                    renderContent={renderAccordionContent}
                />
                
                <View style={styles.help_container}>
                    {HelpElement()}
                </View>

            </View>
        </View>
    )
}

export default Overview;
