import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Chip} from 'react-native-paper'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {useGetLeadDetailsQuery} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {log} from '../../utils/helpers'
import Button from '../basic/Button'
import PDFView from '../basic/PDFView'
import RNFilerUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {H3, P1} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
import {FormProps} from './formTypes'

type FormComponentProps = {leadId: string | undefined; regNo?: string}
const UploadPickupDocuments = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {
    data: leadDetailsData,
    refetch,
    loading,
  } = useGetLeadDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      regNo: regNo,
    },
    onCompleted: ({getLead}) => {
      log('fetched documents at driver stage', getLead?.documents?.releaseOrder)
    },
  })

  function onAddingIndemnityBond(value?: string) {
    setLeadInput({
      ...leadInput,
      documents: {
        ...leadInput?.documents,
        indemnityBond: value,
      },
    })
  }
  function onAddingRealeaseOrder(value?: string) {
    setLeadInput({
      ...leadInput,
      documents: {
        ...leadInput?.documents,
        releaseOrder: value,
      },
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        {leadDetailsData?.getLead?.documents?.releaseOrder ? (
          <View style={commonStyle.centeredAlignItem}>
            <H3>Release Order</H3>
            <PDFView
              url={leadDetailsData?.getLead?.documents?.releaseOrder}
              variant="preview"
              style={styles.pdfViewStyle}
            />
          </View>
        ) : (
          <RNFilerUploader
            variant="docs"
            header="Release Order"
            title="Upload Document"
            saveDoc={onAddingRealeaseOrder}
            value={leadDetailsData?.getLead?.documents?.releaseOrder}
            isRequired
          />
        )}
        {leadDetailsData?.getLead?.documents?.indemnityBond ? (
          <View style={commonStyle.centeredAlignItem}>
            <H3>Indemnity Bond</H3>
            <PDFView
              url={leadDetailsData?.getLead?.documents?.indemnityBond}
              variant="preview"
              style={styles.pdfViewStyle}
            />
          </View>
        ) : (
          <RNFilerUploader
            variant="docs"
            header="Indemnity Bond"
            title="Upload Document"
            saveDoc={onAddingIndemnityBond}
            value={leadDetailsData?.getLead?.documents?.indemnityBond}
            isRequired
          />
        )}
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button
          variant="primary"
          title={desiredButtonText ? desiredButtonText : "Save and Continue"}
          type="enable"
        />
      </Row> */}
    </View>
  )
}

export default UploadPickupDocuments

const styles = StyleSheet.create({
  pdfViewStyle: {margin: Layout.baseSize * 0.3},
})
