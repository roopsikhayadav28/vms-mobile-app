import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {List, Surface} from 'react-native-paper'
import {H1, H3} from '../../basic/StyledText'
import {RefurbishmentRequest} from '../../../generated/hooks_and_more'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import TouchableLineItem from '../../basic/TouchableLineItem'
import {titleCaseToReadable} from '../../../utils/helpers'
import Separator from '../../basic/Separator'

type RefurbishmentRequestsProps = {
  refurbishmentRequests: Partial<RefurbishmentRequest>[]
  setRefurbishmentSerialNoSheet: React.Dispatch<React.SetStateAction<number>>
  raiseAnotherRequest: () => void
  showRefurbishmentBottomSheet: () => void
}

const RefurbishmentRequests = ({
  refurbishmentRequests,
  raiseAnotherRequest,
  setRefurbishmentSerialNoSheet,
  showRefurbishmentBottomSheet,
}: RefurbishmentRequestsProps) => {
  function showRequestDetail(requestNo: number) {
    setRefurbishmentSerialNoSheet(requestNo) //TODO: Add Item here
    showRefurbishmentBottomSheet()
  }
  console.log(refurbishmentRequests?.[0]?.items)
  return (
    <Surface style={styles.container}>
      <List.Accordion
        title={'Refurbishment Request Details'}
        titleStyle={{color: Colors.dark.background}}
        style={styles.accordianStyle}>
        {refurbishmentRequests?.map((request, index) => (
          <TouchableLineItem
            key={index}
            label={`Refurbishment Request ${index + 1}`}
            value={titleCaseToReadable(request?.requestStatus)}
            onPress={() => showRequestDetail(index)}
          />
        ))}
        <Separator />
        {/* FIXME:logic around visibility of that button is yet to be added with detail */}
        <TouchableOpacity
          style={{paddingHorizontal: Layout.baseSize * 2.5}}
          onPress={raiseAnotherRequest}>
          <H3 style={{color: Colors.light.primary}}>
            RAISE REFURBISHMENT REQUEST
          </H3>
        </TouchableOpacity>
        <Separator />
      </List.Accordion>
    </Surface>
  )
}

export default RefurbishmentRequests

const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordianStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
})
