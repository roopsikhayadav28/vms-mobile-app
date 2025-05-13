import {StyleProp, View, ViewStyle} from 'react-native'
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view'

import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import Image from '../basic/Image'

type ImageZoomViewerProps = {
  imageUrl: string
  style?: StyleProp<ViewStyle>
}

const ImageZoomViewer = ({imageUrl, style}: ImageZoomViewerProps) => {
  const {width} = Layout.window

  return (
    <View style={[style, commonStyle.flex1]}>
      <ReactNativeZoomableView
        maxZoom={6}
        minZoom={0.8}
        contentWidth={width}
        contentHeight={width}>
        <Image variant="full_screen" sourceUri={imageUrl} />
      </ReactNativeZoomableView>
    </View>
  )
}

export default ImageZoomViewer
