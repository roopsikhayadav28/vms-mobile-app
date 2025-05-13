import {StyleSheet} from 'react-native'
import Pdf from 'react-native-pdf'
import Layout from '../../constants/Layout'

type PDFViewProps = {
  variant: 'full_screen' | 'preview'
  url: string
  style?: {}
}

export default function PDFView(props: PDFViewProps) {
  const {variant, url, style} = props
  return (
    <Pdf
      source={{uri: url, cache: true}}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`)
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`Current page: ${page}`)
      }}
      onError={error => {
        console.log(error)
      }}
      onPressLink={uri => {
        console.log(`Link pressed: ${uri}`)
      }}
      trustAllCerts={false}
      style={[
        style,
        variant === 'full_screen' ? styles.full_screen : styles.preview,
      ]}
      fitPolicy={1}
    />
  )
}

const styles = StyleSheet.create({
  full_screen: {
    // flex: 1,
    height: Layout.window.height,
    width: Layout.window.width,
  },
  preview: {
    height: Layout.baseSize * 13,
    width: Layout.window.width * 0.47,
    borderRadius: Layout.baseSize * 0.5,
    // backgroundColor: 'pink'
  },
})
