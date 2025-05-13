import {useNavigation} from '@react-navigation/native'
import {format} from 'date-fns'
import React from 'react'
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native'
import {Divider} from 'react-native-paper'
import Layout from '../../../constants/Layout'
import {
  BankName,
  PaymentMethod,
  PaymentStatus,
  PaymentTo,
  PurchaseItem,
} from '../../../generated/hooks_and_more'
import {RootStackScreenProps} from '../../../navigation/navigationTypes'
import {log, titleCaseToReadable} from '../../../utils/helpers'
import DataRowItem from '../../basic/DataRowItem'
import Separator from '../../basic/Separator'
import {H3, P2} from '../../basic/StyledText'

type RefurbishmentPaymentDetailsProps = {
  requestDate: Date
  paymentTo: PaymentTo
  paymentMode: PaymentMethod
  bankName: BankName
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  accountProof: string
  upiProofUrl: string
  paymentDate: Date
  paymentStatus: PaymentStatus
  paymentAmount: number
  paymentModeFM: PaymentMethod
  paymentConfirmation: string
  purchaseItems: Partial<PurchaseItem>[]
  transportationCost: number
}

const RefurbishmentPaymentDetails = ({
  paymentAmount,
  accountHolderName,
  accountNumber,
  accountProof,
  bankName,
  ifscCode,
  paymentConfirmation,
  paymentDate,
  paymentMode,
  paymentModeFM,
  paymentStatus,
  paymentTo,
  requestDate,
  purchaseItems,
  transportationCost,
  upiProofUrl,
}: RefurbishmentPaymentDetailsProps) => {
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewPdfScreen' | 'ViewImageScreen'>['navigation']
    >()

  function navigateToDedicatedScreen(itemVal, label) {
    log('document opened', itemVal)
    const itemValue = itemVal
      ?.toString()
      ?.split('?')?.[0]
      ?.split('/')
      ?.reverse()?.[0]
      ?.split('.')
      ?.reverse()?.[0]
    if (itemValue === 'jpg' || itemValue === 'jpeg' || itemValue === 'png') {
      navigation.navigate('ViewImageScreen', {
        imageUrl: itemVal?.toString(),
        title: label?.toString(),
      })
    } else if (itemValue === 'pdf') {
      navigation.navigate('ViewPdfScreen', {
        pdfUrl: itemVal,
        title: label?.toString(),
      })
    } else {
      ToastAndroid.showWithGravity('Added Document is not right!', 30, 30)
    }
    log('clicked to View Document', itemVal)
  }
  return (
    <ScrollView>
      <View style={{marginBottom: Layout.baseSize * 8}}>
        <DataRowItem
          label="Request Date"
          value={
            !!requestDate ? format(new Date(requestDate), 'dd MMM yyyy') : '-'
          }
        />
        <DataRowItem
          label="Payment To"
          value={!!paymentTo ? titleCaseToReadable(paymentTo) : '-'}
        />
        <DataRowItem
          label="Payment Mode"
          value={!!paymentMode ? titleCaseToReadable(paymentMode) : '-'}
        />
        <DataRowItem label="Payment Amount" value={paymentAmount ?? '-'} />
        <DataRowItem
          label="Bank Name"
          value={!!bankName ? titleCaseToReadable(bankName) : '-'}
        />
        <DataRowItem
          label="Account Holder name"
          value={accountHolderName ?? '-'}
        />
        <DataRowItem label="Account Number" value={accountNumber ?? '-'} />

        <DataRowItem label="IFSC Code" value={ifscCode ?? '-'} />
        <DataRowItem
          label="Account Proof"
          value={paymentMode === PaymentMethod.Upi ? upiProofUrl : accountProof}
          isDoc
        />

        <Separator />

        {purchaseItems?.length > 0 && (
          <>
            <Divider />
            <Separator />
            <H3 style={{paddingLeft: Layout.baseSize}}>
              Payment amount breakdown
            </H3>

            {purchaseItems?.map((i, index) => {
              const price = i?.price ? `Rs ${i?.price?.toLocaleString()}` : '-'
              return (
                <DataRowItem
                  isDoc
                  key={i?.id + index?.toString()}
                  label={titleCaseToReadable(i?.product?.name)}
                  value={price}
                  document={i?.purchaseProofUrl}
                  variant="3"
                />
              )
            })}

            {/* Custom design req */}
            <View
              style={{
                flex: 1,
                marginHorizontal: Layout.baseSize,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Layout.baseSize * 0.5,
              }}>
              <Text style={{color: 'grey', flex: 1.2}}>
                Transportation Cost
              </Text>
              <View style={{flex: 1, alignItems: 'center'}}>
                <P2 numberOfLines={1}>
                  {`${
                    transportationCost
                      ? `Rs ${transportationCost?.toLocaleString()}`
                      : '-'
                  }`}
                </P2>
              </View>
              <View style={{flex: 1}} />
            </View>
          </>
        )}

        <Separator />
        <Divider />
        <Separator />

        <DataRowItem
          label="Payment Date"
          value={
            !!paymentDate ? format(new Date(paymentDate), 'dd MMM yyyy') : '-'
          }
        />
        <DataRowItem
          label="Payment Status"
          value={!!paymentStatus ? titleCaseToReadable(paymentStatus) : '-'}
        />
        <DataRowItem label="Payment Amount" value={paymentAmount ?? '-'} />
        <DataRowItem
          label="Payment Mode"
          value={!!paymentModeFM ? titleCaseToReadable(paymentModeFM) : '-'}
        />
        <DataRowItem
          label="Payment Confirmation"
          value={paymentConfirmation}
          isDoc
        />
      </View>
    </ScrollView>
  )
}

export default RefurbishmentPaymentDetails

const styles = StyleSheet.create({})
