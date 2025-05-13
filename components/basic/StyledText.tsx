import {StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {Text, TextProps} from './Themed'

export function H1(props: TextProps) {
  return <Text {...props} style={[props.style, styles.h1]} />
}
export function H2(props: TextProps) {
  return <Text {...props} style={[props.style, styles.h2]} />
}

export function H3(props: TextProps) {
  return <Text {...props} style={[props.style, styles.h3]} />
}

export function P1(props: TextProps) {
  return <Text {...props} style={[props.style, styles.p1]} />
}

export function P2(props: TextProps) {
  return <Text {...props} style={[props.style, styles.p2]} />
}

export function LinkText(props: TextProps) {
  return <P2 {...props} style={[props.style, styles.link]} />
}

const styles = StyleSheet.create({
  link: {
    fontFamily: 'Lato_700Bold',
    fontSize: Layout.baseSize,
    lineHeight: Layout.baseSize,
    color: Colors.light.primary,
  },
  p2: {
    fontFamily: 'Lato_400Regular',
    fontSize: Layout.baseSize * 0.75,
    lineHeight: Layout.baseSize,
  },
  p1: {fontFamily: 'Lato_400Regular', fontSize: Layout.baseSize},
  h3: {
    fontFamily: 'Lato_700Bold',
    fontSize: Layout.baseSize,
    lineHeight: Layout.baseSize * 1.5,
  },
  h2: {
    fontFamily: 'Lato_700Bold',
    fontSize: Layout.baseSize * 1.25,
  },
  h1: {fontFamily: 'Lato_700Bold', fontSize: Layout.baseSize * 1.5},
})
