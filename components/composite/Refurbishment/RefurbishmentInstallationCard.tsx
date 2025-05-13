import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {H2} from '../../basic/StyledText'
import {
  RefurbishmentDetails,
  RefurbishmentItem,
  RefurbishmentRequest,
} from '../../../generated/hooks_and_more'
import DataRowItem from '../../basic/DataRowItem'

type RefurbishmentInstallationCardProps = {
  refurbishmentItems: Partial<RefurbishmentItem>[]
}
const RefurbishmentInstallationCard = ({
  refurbishmentItems,
}: RefurbishmentInstallationCardProps) => {
  return (
    <View>
      <H2>RefurbishmentInstallation</H2>
      {refurbishmentItems?.map(i => (
        <DataRowItem
          isDoc
          value={i?.installationProofUrl}
          label={i?.product?.name}
        />
      ))}
    </View>
  )
}

export default RefurbishmentInstallationCard

const styles = StyleSheet.create({})
