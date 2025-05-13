import {FlashList, ListRenderItem} from '@shopify/flash-list'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {SegmentedButtons} from 'react-native-paper'
import PDFView from '../components/basic/PDFView'
import Separator from '../components/basic/Separator'
import VideoCard from '../components/basic/VideoCard'
import Layout from '../constants/Layout'

export default function TrainingScreen() {
  type Videos = {
    id: number
    time: string
    title: string
    url: string
  }[]
  type Documents = {id: number; url: string; title: string}[]
  const [selectedButton, setSelectedButton] = useState<string>('video')
  const [videos, setVideos] = useState<Videos>([])
  const [documents, setDocuments] = useState<Documents>([])

  const dummyDataVideo = [
    {
      id: 1,
      time: '15-12-2022 12:25',
      title: 'How to Log into VMS',
      url: 'https://www.youtube.com/watch?v=LnsQLEBEo9g&list=PLiR0xy_Ck3h5XnFltucennrA7mf3il0JN&index=1',
    },
    {
      id: 2,
      time: '15-12-2022 12:25',
      title: 'How to create Bank Auction leads on VMS',
      url: 'https://www.youtube.com/watch?v=g6lYGlaJBzg&list=PLiR0xy_Ck3h5XnFltucennrA7mf3il0JN&index=2',
    },
    {
      id: 3,
      time: '15-12-2022 12:25',
      title: 'How to Create Dealership Sale leads on VMS',
      url: 'https://www.youtube.com/watch?v=2iwbVhY6PrE&list=PLiR0xy_Ck3h5XnFltucennrA7mf3il0JN&index=3',
    },
  ]

  const dummyDocumentsData = [
    {
      id: 1,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 2,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 3,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 4,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 5,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 6,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 7,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
    {
      id: 8,
      url: 'https://www.orimi.com/pdf-test.pdf',
      title: 'Learning Document',
    },
  ]

  useEffect(() => {
    setDocuments(dummyDocumentsData)
    setVideos(dummyDataVideo)
  }, [])

  function renderHeaderComponent() {
    return (
      <SegmentedButtons
        style={styles.container}
        value={selectedButton}
        onValueChange={setSelectedButton}
        buttons={[
          {
            value: 'video',
            label: 'Videos',
            showSelectedCheck: true,
            // style: {(selectedButton==='video') ? styles.selectedButton : styles.SegmentedButton}
          },
          {
            value: 'pdf',
            label: 'PDF',
            showSelectedCheck: true,
            // style: {(selectedButton==='pdf') ? styles.selectedButton : styles.SegmentedButton}
          },
        ]}
      />
    )
  }

  const renderItem: ListRenderItem<{
    id: number
    url: string
    title: string
  }> = ({item}) => {
    return (
      <>
        <VideoCard
          url={item.url}
          title={item.title}
          time={'11 July 2022, 02:30 PM'}
          style={styles.videoCardContainer}
        />
        {/* {selectedButton === 'video' ? (
          <VideoCard
            url={item.url}
            title={item.title}
            time={'11 July 2022, 02:30 PM'}
            style={styles.videoCardContainer}
          />
        ) : (
          <PDFView
            url={item.url}
            variant="preview"
            style={styles.pdfViewContainer}
          />
        )} */}
      </>
    )
  }

  const estimatedItemSize = Layout.baseSize * 12.5

  return (
    <View style={styles.screenContainer}>
      <FlashList
        // ListHeaderComponent={renderHeaderComponent}
        // data={selectedButton === 'video' ? videos : documents}
        data={videos}
        numColumns={selectedButton === 'video' ? 1 : 2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {margin: Layout.baseSize / 2},
  segmentedButton: {
    borderBottomColor: '#006DB7',
  },
  selectedButton: {borderBottomColor: 'yellow'},
  screenContainer: {justifyContent: 'center', flex: 1},
  videoCardContainer: {marginHorizontal: Layout.baseSize * 0.5},
  pdfViewContainer: {marginHorizontal: Layout.baseSize * 0.3},
})
