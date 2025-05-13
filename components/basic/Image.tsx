import {useState} from 'react'
import {
  Platform,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {getParameterizedImageUrl} from '../../utils/helpers'
import Icon from './Icon'

type ImageProps = {
  variant:
    | 'preview'
    | 'full_screen'
    | 'avatar'
    | 'small_preview'
    | 'gallery'
    | 'parent'
    | 'zoom-view'
  sourceUri: string
  isVideo?: boolean
  isDetailView?: boolean
  onPress?: (uri?: string) => void
  onPressClose?: (uri?: string) => void
}

export default function Image({
  variant,
  sourceUri,
  isVideo = false,
  isDetailView,
  onPress,
  onPressClose,
}: ImageProps) {
  const [hasError, setHasError] = useState<boolean>(false)
  function getStuffForVariant() {
    switch (variant) {
      case 'avatar':
        return {
          style: styles.avatar,
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 3,
              height: Layout.baseSize * 3,
            },
          ),
        }
      case 'full_screen':
        return {
          style: styles.full_screen,
          url: sourceUri,
        }
      case 'preview':
        return {
          style: styles.preview,
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri?.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 8,
              height: Layout.baseSize * 8,
            },
          ),
        }
      case 'small_preview':
        return {
          style: styles.small_preview,
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri?.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 5,
              height: Layout.baseSize * 5,
            },
          ),
        }
      case 'gallery':
        return {
          style: styles.gallery,
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri?.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 21,
              height: Layout.baseSize * 21,
            },
          ),
        }
      case 'parent':
        return {
          style: styles.parent,
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri?.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 21,
              height: Layout.baseSize * 21,
            },
          ),
        }
      case 'zoom-view':
        return {
          style: styles.zoomView,
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri?.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 21,
              height: Layout.baseSize * 21,
            },
          ),
        }
      default:
        return {
          style: {},
          url: getParameterizedImageUrl(
            hasError
              ? sourceUri?.replace(
                  'https://vms-assets.tractorjunction.in',
                  'https://vms-app-assets.s3.ap-south-1.amazonaws.com',
                )
              : sourceUri,
            {
              width: Layout.baseSize * 21,
              height: Layout.baseSize * 21,
            },
          ),
        }
    }
  }
  // console.log('uri inside image component', getStuffForVariant().url)

  if (variant === 'small_preview') {
    return Platform.OS === 'android' || Platform.OS === 'ios' ? (
      <View style={styles.small_preview_view}>
        <TouchableOpacity onPress={() => onPress()}>
          <FastImage
            source={{uri: getStuffForVariant().url}}
            style={getStuffForVariant().style}
            resizeMode={'cover'}
            onError={() => setHasError(true)}
          />
        </TouchableOpacity>
        {!!onPressClose && (
          <Icon
            iconName="cancel"
            color={Colors.light.red}
            size={25}
            style={styles.cancel}
            onPress={onPressClose}
          />
        )}
      </View>
    ) : (
      <RNImage
        source={{uri: getStuffForVariant().url}}
        style={getStuffForVariant().style}
        resizeMode={'cover'}
        onError={() => setHasError(true)}
      />
    )
  }
  if (variant === 'preview' && isDetailView) {
    return Platform.OS === 'android' || Platform.OS === 'ios' ? (
      <TouchableOpacity onPress={onPress}>
        {/* FIXME : type gone bad for this function */}
        <FastImage
          source={{uri: getStuffForVariant().url}}
          style={getStuffForVariant().style}
          resizeMode={'cover'}
          onError={() => setHasError(true)}
        />
      </TouchableOpacity>
    ) : (
      <RNImage
        source={{uri: getStuffForVariant().url}}
        style={getStuffForVariant().style}
        resizeMode={'cover'}
        onError={() => setHasError(true)}
      />
    )
  }

  if (variant === 'zoom-view') {
    return Platform.OS === 'android' || Platform.OS === 'ios' ? (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!onPress}
        onPress={() => onPress()}>
        <FastImage
          source={{uri: getStuffForVariant().url}}
          style={getStuffForVariant().style}
          resizeMode={'cover'}
          onError={() => setHasError(true)}
        />
      </TouchableOpacity>
    ) : (
      <RNImage
        source={{uri: getStuffForVariant().url}}
        style={getStuffForVariant().style}
        resizeMode={'cover'}
        onError={() => setHasError(true)}
      />
    )
  }

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <FastImage
      source={{uri: getStuffForVariant().url}}
      style={getStuffForVariant().style}
      resizeMode={variant === 'full_screen' ? 'contain' : 'cover'}
      onError={() => setHasError(true)}
    />
  ) : (
    <RNImage
      source={{uri: getStuffForVariant().url}}
      style={getStuffForVariant().style}
      resizeMode={variant === 'full_screen' ? 'contain' : 'cover'}
      onError={() => setHasError(true)}
    />
  )
}

const styles = StyleSheet.create({
  preview: {
    height: Layout.baseSize * 8,
    borderRadius: Layout.baseSize * 0.25,
  },

  full_screen: {
    height: Layout.window.height,
    width: Layout.window.width,
  },
  avatar: {
    height: Layout.baseSize * 3,
    width: Layout.baseSize * 3,
    borderRadius: Layout.baseSize * 1.5,
  },
  cancel: {
    position: 'absolute',
    top: -Layout.baseSize * 0.65,
    right: -Layout.baseSize * 0.55,
    zIndex: 100,
  },
  small_preview_view: {
    width: Layout.baseSize * 5,
    height: Layout.baseSize * 5,

    borderRadius: Layout.baseSize / 4,
    // marginBottom: Layout.baseSize * 0.5,
  },
  small_preview: {
    width: Layout.baseSize * 5,
    height: Layout.baseSize * 5,
    borderRadius: Layout.baseSize / 4,
    // marginBottom: Layout.baseSize * 0.5,
  },
  gallery: {
    height: Layout.window.height / 2,
    width: Layout.window.width,
  },
  parent: {
    height: Layout.baseSize * 5,
    width: '100%',
    borderRadius: Layout.baseSize / 4,
  },
  zoomView: {
    height: Layout.window.height / 2,
    width: Layout.window.width,
  },
})
