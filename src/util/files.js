/*
Provides a common interface to android & iOS files, camera & images

@flow
 */
import { Platform, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ImagePicker from 'react-native-image-picker'

const DocumentPicker = NativeModules.RNDocumentPicker

export function pickFile(
  fileTypes: string[] = ['public.image', 'com.adobe.pdf']
) : Promise<string> {
  // TODO: Android support
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      DocumentPicker.show({
        filetype: fileTypes,
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

export type FileMetaData = {
  path: string,
  uri: string,
  fileName: string,
  extension: string,
}

export function getFileMetadataFromURI(uri: string) : FileMetaData {
  const split = uri.split('file:///')
  const path = split[1]
  const fileName = path.split('/').pop()
  const extension = fileName.split('.').pop()
  return {
    path,
    uri,
    fileName,
    extension
  }
}
