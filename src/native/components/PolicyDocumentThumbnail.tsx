import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { BLUE, DARK_GRAY } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { IPolicyDocument } from '~/common/types'

import FileIcon from './FileIcon/index'
import Text from './Text'

interface IPolicyDocumentThumbnailProps {
  document: IPolicyDocument
  style?: any
  onPress?: () => void
}

export default class PolicyDocumentThumbnail extends React.Component<
  IPolicyDocumentThumbnailProps
> {
  public render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style || {}]}
        onPress={this.props.onPress}
      >
        <View style={styles.thumbnail}>
          <View style={styles.iconContainer}>
            <FileIcon extension={this.props.document.extension} />
          </View>
        </View>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {this.props.document.name}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    height: 97,
    width: 77,
    marginBottom: MARGIN.base,
    backgroundColor: 'rgb(246,246,246)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  name: {
    color: BLUE,
    overflow: 'hidden',
    fontSize: 11,
    marginLeft: 20,
    marginRight: 20,
  },
  iconContainer: {
    height: '50%',
    width: '50%',
  },
})
