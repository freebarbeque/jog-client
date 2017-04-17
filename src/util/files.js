// @flow

import { Platform, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ImagePicker from 'react-native-image-picker'

const DocumentPicker = NativeModules.RNDocumentPicker

export function pickFile() : Promise<string> {
  // TODO: Android support
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      DocumentPicker.show({
        filetype: [
          'com.adobe.pdf',
        ],
      }, (error, url) => {
        if (error) reject(error)
        else resolve(url)
      })
    } else {
      reject(new Error(`${Platform.OS} not yet supported`))
    }
  })
}

export function useCamera() : Promise<string> {
  return new Promise((resolve, reject) => {
    const isSimulator = DeviceInfo.getModel() === 'Simulator'
    // The simulator has no camera access so use image library instead for testing
    if (isSimulator) {
      ImagePicker.launchImageLibrary({ noData: true }, (response) => {
        if (response.error) reject(response.error)
        else resolve(response.uri)
      })
    } else {
      ImagePicker.launchCamera({ noData: true }, (response) => {
        if (response.error) reject(response.error)
        else resolve(response.uri)
      })
    }
  })
}
