import {ScrollView, StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import Layout from '../../../constants/Layout'
import {H2} from '../../basic/StyledText'
import {SegmentedButtons} from 'react-native-paper'
import {
  RefurbishmentPaymentDetails,
  RefurbishmentRequestDetails,
} from '../Refurbishment'
import {RefurbishmentRequest} from '../../../generated/hooks_and_more'
import Colors from '../../../constants/Colors'
import {Column} from '../../basic/StyledView'
import Icon from '../../basic/Icon'
import {commonStyle} from '../../../constants/style'

type RefurbishmentBottomSheetProps = {
  closeBottomSheet: () => void
  paymentAmount?: number
  requestNo?: number
  refurbishmentRequest: Partial<RefurbishmentRequest>
}

const RefurbishmentBottomSheet = ({
  requestNo,
  refurbishmentRequest,
  closeBottomSheet,
}: RefurbishmentBottomSheetProps) => {
  const [variant, setVariant] = useState<'Request' | 'Payment'>('Request')
  function changeDetailView(val) {
    setVariant(val)
  }
  const refurbishmentPaymentDetails = refurbishmentRequest?.purchase?.payment

  return (
    <View style={commonStyle.flex1}>
      <View style={styles.header}>
        <Column>
          <H2>
            {variant === 'Payment'
              ? `Refurbishment Payment ${requestNo}`
              : `Refurbishment Request ${requestNo}`}
          </H2>
          <View
            style={{
              height: Layout.baseSize / 9,
              width: Layout.baseSize * 4,
              marginTop: Layout.baseSize / 5,
              backgroundColor: Colors.light.tabIconSelected,
            }}
          />
        </Column>
        <Icon iconName="keyboard-arrow-down" onPress={closeBottomSheet} />
      </View>

      <View>
        <SegmentedButtons
          value={variant}
          theme={{backgroundColor: 'blue'}}
          onValueChange={value => changeDetailView(value)}
          style={{margin: Layout?.baseSize / 2}}
          buttons={[
            {
              value: 'Request',
              label: 'Request',
              style:
                variant === 'Request' ? styles.segmentedBtn : styles.basicStyle,
              checkedColor: 'white',
            },
            {
              value: 'Payment',
              label: 'Payment ',
              style:
                variant === 'Payment' ? styles.segmentedBtn : styles.basicStyle,
              checkedColor: 'white',
            },
          ]}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {variant === 'Request' && (
          <RefurbishmentRequestDetails items={refurbishmentRequest?.items} />
        )}
        {variant === 'Payment' && (
          <RefurbishmentPaymentDetails
            transportationCost={refurbishmentRequest?.transportationCharge}
            purchaseItems={refurbishmentRequest?.purchase?.items}
            paymentAmount={refurbishmentPaymentDetails?.amount}
            accountHolderName={
              refurbishmentPaymentDetails?.refurbishmentBeneficiary
                ?.accountHolderName
            }
            accountNumber={
              refurbishmentPaymentDetails?.refurbishmentBeneficiary
                ?.accountNumber
            }
            accountProof={
              refurbishmentPaymentDetails?.refurbishmentBeneficiary?.proofUrl
            }
            upiProofUrl={refurbishmentPaymentDetails?.proofUrl}
            bankName={
              refurbishmentPaymentDetails?.refurbishmentBeneficiary?.bankName
            }
            ifscCode={
              refurbishmentPaymentDetails?.refurbishmentBeneficiary?.ifscCode
            }
            paymentConfirmation={refurbishmentPaymentDetails?.receiptUrl}
            paymentDate={refurbishmentPaymentDetails?.paymentProcessedAt}
            paymentMode={refurbishmentPaymentDetails?.mode}
            paymentModeFM={refurbishmentPaymentDetails?.modeFM}
            paymentStatus={refurbishmentPaymentDetails?.status}
            paymentTo={refurbishmentPaymentDetails?.paymentTo}
            requestDate={refurbishmentPaymentDetails?.createdAt}
          />
        )}
      </ScrollView>
    </View>
  )
}

export default RefurbishmentBottomSheet

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Layout.baseSize / 2,
    paddingVertical: Layout.baseSize,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  segmentedBtn: {
    backgroundColor: Colors.light.tabIconSelected,
  },
  basicStyle: {},
  contentContainer: {
    paddingBottom: Layout.baseSize,
  },
})
