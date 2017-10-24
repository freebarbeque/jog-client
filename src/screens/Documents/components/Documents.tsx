import * as React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import styles, {SCANNED_IMG} from '../DocumentsStyles';

interface Props {
    navigation: any
}

const scannedDocs = [
    {
        name: 'scanned_item1.jpg',
        img: SCANNED_IMG
    },{
        name: 'scanned_item2.jpg',
        img: SCANNED_IMG
    },{
        name: 'scanned_item3.jpg',
        img: SCANNED_IMG
    }
]

const renderScannedDocs = () => scannedDocs.map((doc, i) => (
    <View key={i} style={styles.scanned_doc_container}>
        <Image style={styles.scanned_doc_img} source={doc.img} />
        <Text style={styles.scanned_doc_name}>{doc.name}</Text>
    </View>
))

const Documents: React.StatelessComponent<Props> = ({navigation}) => {
    return (
        <ScrollView style={styles.documents_container}>
            <View style={styles.scanned_container}>
                <Text style={styles.scanned_title}>Scanned documents</Text>
                <View style={styles.list_of_scanned_container}>
                    { renderScannedDocs() }
                </View>
            </View>
        </ScrollView>
    )
}

export default Documents;
