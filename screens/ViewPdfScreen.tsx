import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import PDFView from '../components/basic/PDFView'
import {log} from '../utils/helpers'
import {ActivityIndicator} from 'react-native-paper'
import {P1} from '../components/basic/StyledText'
import Layout from '../constants/Layout'

type ViewPdfScreenProps = RootStackScreenProps<'ViewPdfScreen'>

const ViewPdfScreen = ({navigation, route}: ViewPdfScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [documentUrl, setDocumentUrl] = useState<string>(undefined)

  log('view pdf screen', route?.params?.pdfUrl)

  navigation.setOptions({headerTitle: route?.params?.title})

  useEffect(() => {
    setIsLoading(true)
    setDocumentUrl(route?.params?.pdfUrl)
    setIsLoading(false)
  }, [route?.params?.pdfUrl, route?.params?.regNo])

  if (!isLoading && !documentUrl)
    return (
      <View style={styles.container}>
        <P1 style={styles.textContainer}>
          This document is not uploaded yet !
        </P1>
      </View>
    )

  return (
    <>
      {isLoading ? (
        <ActivityIndicator accessibilityLabel="Loading Document..." />
      ) : (
        <PDFView url={route.params.pdfUrl} variant="full_screen" />
      )}
    </>
  )
}

export default ViewPdfScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {alignItems: 'center', justifyContent: 'center'},
})
