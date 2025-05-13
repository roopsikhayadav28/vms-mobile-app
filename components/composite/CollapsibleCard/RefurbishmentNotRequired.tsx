import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {ProcurementCostBreakupCard} from '../Refurbishment'
import {LeadSource, UserRole} from '../../../generated/hooks_and_more'
import BookingPriceCard from '../Refurbishment/BookingPriceCard'
import useUserToken from '../../../hooks/useUserToken'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import {log} from '../../../utils/helpers'

type RefurbishmentNotRequiredProps = {
  dealAmount: number
  parking: number
  expenses: number
  tokenAmount: number
  dealDelivery: number
  holdbackAmount: number
  loanAmount: number
  sellingPrice: number
  listingPrice: number
  refCost: number
  transportationCharges: number
  source: LeadSource
  documentCharges?: number
  isPurchaseOrderRequestApproved: boolean
}

const RefurbishmentNotRequired = ({
  dealAmount,
  dealDelivery,
  expenses,
  holdbackAmount,
  loanAmount,
  parking,
  refCost,
  listingPrice,
  sellingPrice,
  source,
  tokenAmount,
  transportationCharges,
  isPurchaseOrderRequestApproved,
  documentCharges,
}: RefurbishmentNotRequiredProps) => {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)

  return (
    <Surface style={styles.container}>
      <List.Accordion
        style={styles.accordianStyle}
        title={'Refurbishment Details'}
        // onPress={onExpand}
        titleStyle={{color: Colors.dark.background}}>

        {loggedInUser.role !== UserRole.CentreManager && (
          <ProcurementCostBreakupCard
            isPrApproved={isPurchaseOrderRequestApproved}
            dealAmount={dealAmount}
            expenses={expenses}
            parking={parking}
            dealDelivery={dealDelivery}
            holdbackAmount={holdbackAmount}
            loanAmount={loanAmount}
            tokenAmount={tokenAmount}
            source={source}
            documentCharges={documentCharges}
            refCost={
              !!transportationCharges
                ? transportationCharges + refCost
                : refCost
            }
          />
        )}

        <BookingPriceCard
          listingPrice={listingPrice}
          sellingPrice={sellingPrice}
        />
      </List.Accordion>
    </Surface>
  )
}

export default RefurbishmentNotRequired

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
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
  boldText: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
})
