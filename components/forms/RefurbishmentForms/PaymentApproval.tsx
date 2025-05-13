import React from 'react'

import {StyleSheet, View} from 'react-native'
import Colors from '../../../constants/Colors'
import ItemSelector from '../../composite/Refurbishment/ItemSelector'
import {titleCaseToReadable} from '../../../utils/helpers'
import {
  useGetCenterFormLeadQuery,
  useGetStocksDetailsQuery,
} from '../../../generated/hooks_and_more'

type PaymentApprovalProps = {
  leadId: string
  regNo: string
  requestId: string
}

const PaymentApproval = ({leadId, regNo, requestId}: PaymentApprovalProps) => {
  const {data: centerData} = useGetCenterFormLeadQuery({
    variables: {
      regNo: regNo,
    },
  })

  const centerId = centerData?.getLead?.centre?.id

  const {data: stockDetailData} = useGetStocksDetailsQuery({
    variables: {
      centreId: centerId,
    },
    skip: !centerId,
  })

  function getSparePartStockStatus(value: string) {
    const sparePartStockData = stockDetailData?.inventoryDetails?.items?.find(
      i =>
        i?.product?.name?.toUpperCase() ===
        titleCaseToReadable(value)?.toUpperCase(),
    )

    return {
      isInStock: sparePartStockData?.availableInStock > 0,
      avgUnitPrice: sparePartStockData?.avgUnitPrice,
    }
  }

  return (
    <View style={styles.container}>
      <ItemSelector
        regNo={regNo}
        leadId={leadId}
        requestId={requestId}
        getSparePartStockStatus={getSparePartStockStatus}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.light.background,
  },
})

export default PaymentApproval
