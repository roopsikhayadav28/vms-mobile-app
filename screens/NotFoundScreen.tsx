import {StyleSheet, TouchableOpacity} from 'react-native'

import {Text, View} from '../components/basic/Themed'
import {RootStackScreenProps} from '../navigation/navigationTypes'

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFoundScreen'>) {
  const handleNavigation = () => navigation.replace('Drawer')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={handleNavigation} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
