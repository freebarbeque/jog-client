import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import {CAR_QUESTIONS_ROUTE} from '../../../nav/main/routes';

import styles, {ARROW, COMPLETE_ICON} from '../QuoteStyles';

interface Props {
    title: String;
    key: Number;
    percent: Number;
    questions: Number;
    carQuestions: [any];
    route: any;
    navigation: {
        navigate: Function;
        goBack: Function;
    }
    image: {
        source: any;
        style: any;
    },
}

const renderPie = (percent) => {
    const complete = <LinearGradient colors={['#78EF83', '#56CF63']} style={styles.complete}><Image style={styles.complete_icon} source={COMPLETE_ICON}/></LinearGradient>;
    const notComplete = <LinearGradient colors={['#F9F9F9', '#E7E7E7']}  style={styles.not_complete}><Text style={styles.no_complete_text}>{`${percent}%`}</Text></LinearGradient>;
    return (
        <View style={styles.percent}>
            <PieChart
                chart_wh={62}
                series={[percent, 100 - percent]}
                sliceColor={['#7CF286', '#E2E2E2']}
                doughnut={false}
                coverRadius={0.9}
                coverFill={'#E2E2E2'}
            />
            { percent === 100 ? complete : notComplete }
        </View> 
    )
}
    
const renderQuestionsProgress = (questions) => questions > 0 ? `${questions} MORE QUESTIONS TO ANSWER` : `COMPLETE! CLICK TO EDIT`

const QuoteSection: React.StatelessComponent<Props> = (props) => {
    const {title, percent, questions, image, route, navigation, carQuestions } = props;
    return (
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate(route)}>
            <View style={styles.sub_section}>
                <View style={styles.title_section}>
                    <Image style={image.style} source={image.source} />
                    <Text style={styles.section_title}>{title}</Text>
                </View>
                { renderPie(percent) }
                <Image style={styles.arrow_right} source={ARROW} />
            </View>
            <Text style={styles.questions}>{ renderQuestionsProgress(questions) }</Text>
        </TouchableOpacity>
    )
}

export default QuoteSection