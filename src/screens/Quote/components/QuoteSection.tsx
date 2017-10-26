import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Pie from 'react-native-pie'
import LinearGradient from 'react-native-linear-gradient';

import styles, {ARROW, COMPLETE_ICON} from '../QuoteStyles';


interface Props {
    title: String;
    percent: Number, 
    questions: Number,
    image: {
        source: any,
        style: any
    }
}

const renderPie = (percent) => {
    const complete = <LinearGradient colors={['#78EF83', '#56CF63']} style={styles.complete}><Image style={styles.complete_icon} source={COMPLETE_ICON}/></LinearGradient>;
    const notComplete = <LinearGradient colors={['#F9F9F9', '#E7E7E7']}  style={styles.not_complete}><Text style={styles.no_complete_text}>{`${percent}%`}</Text></LinearGradient>;

    return (
        <View style={styles.percent}>
            <Pie
                radius={30}
                innerRadius={23}
                series={[percent]}
                colors={['#7CF286']}
                backgroundColor='#E2E2E2' />
            { percent === 100 ? complete : notComplete }
        </View> 
    )
}
    
const renderQuestionsProgress = (questions) => questions > 0 ? `${questions} MORE QUESTIONS TO ANSWER` : `COMPLETE! CLICK TO EDIT`

const QuoteSection: React.StatelessComponent<Props> = (props) => {
    const {title, percent, questions, image} = props
    return (
        <TouchableOpacity style={styles.section}>
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