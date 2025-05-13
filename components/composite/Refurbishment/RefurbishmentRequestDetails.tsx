import {StyleSheet, View} from 'react-native'
import React from 'react'
import {Divider} from 'react-native-paper'
import {RefurbishmentItem} from '../../../generated/hooks_and_more'
import DataRowItem from '../../basic/DataRowItem'
import {log, titleCaseToReadable} from '../../../utils/helpers'
import Layout from '../../../constants/Layout'
import {H3} from '../../basic/StyledText'

type temporaryProps = {
  items: Partial<RefurbishmentItem>[]
}

const RefurbishmentRequestDetails = ({items}: temporaryProps) => {
  return (
    <View>
      {items?.map(i => (
        <DataRowItem
          key={i?.id}
          label={titleCaseToReadable(i?.product?.name)}
          value={!!i?.price ? `₹ ${i?.price}` : '-'}
          document={i?.refurbishmentProofUrl}
          isDoc
          variant="variant4WithStatusIcon"
          status={i?.status}
        />
      ))}

      <Divider />

      {/*  Installation Confirmation Images */}
      {items?.some(i => i?.installationProofUrl) && (
        <>
          <H3 style={styles.headerTextStyle}>Installation Confirmation</H3>
          {items?.map((i, index) => (
            <DataRowItem
              isDoc
              key={i?.id + index?.toString()}
              label={titleCaseToReadable(i?.product?.name)}
              value={i?.installationProofUrl}
            />
          ))}
        </>
      )}
    </View>
  )
}

export default RefurbishmentRequestDetails

const styles = StyleSheet.create({
  headerTextStyle: {
    padding: Layout.baseSize,
  },
})
