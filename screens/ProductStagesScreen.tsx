import {ScrollView, StyleSheet, View} from 'react-native'
import Button from '../components/basic/Button'
import ImageView from '../components/basic/ImageView'
import Separator from '../components/basic/Separator'
import {P2} from '../components/basic/StyledText'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default function ProductStagesScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScreenView}>
        <View>
          <P2 style={styles.partsTitle}>Body Images</P2>
          <Separator />
          <View style={styles.imageSection}>
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
          </View>
        </View>
        <Separator />
        <View>
          <P2 style={styles.partsTitle}>Tyre Images</P2>
          <Separator />
          <View style={styles.imageSection}>
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
          </View>
        </View>
        <Separator />
        <View>
          <P2 style={styles.partsTitle}>Engine Hood</P2>
          <Separator />
          <View style={styles.imageSection}>
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <ImageView
              variant="extra_small_preview"
              image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
          </View>
        </View>
        <Separator />
        <View>
          <P2 style={styles.partsTitle}>Procurement Videos</P2>
          <Separator />
          <ImageView
            variant="Video"
            image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            isVideo={true}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <Button variant="action" type="disable" title="Back" />
        <Button variant="action" type="enable" title="Next" />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.light.background},
  partsTitle: {
    color: Colors.light.text,
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ScreenView: {
    margin: Layout.baseSize,
  },
  bottomButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: Layout.baseSize - 6,
  },
})
