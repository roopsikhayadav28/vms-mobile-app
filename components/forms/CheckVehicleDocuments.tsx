import {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import Card from '../basic/Card'
import RNRadioButton from '../basic/RNRadioButton'
import Separator from '../basic/Separator'
import {P1} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
const {baseSize} = Layout

type FormComponentProps = {leadId: string | undefined}

const CheckVehicleDocuments = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  useEffect(() => {
    // log('in useLayoutEffect', leadInput?.documentChecklist)
    setLeadInput({
      documentChecklist: {
        registrationCertificate: false,
        form26: false,
        bankNOC: false,
        form28: false,
        form29: false,
        form30: false,
        form35: false,
        form36: false,
        form60: false,
        sellerAadharCard: false,
        // sellerPAN: false,
        loanForeclosure: false,
        insuranceCertificate: false,
        ownerAddressProof: false,
      },
    })
    // return () =>
    //   log('check vehcle documents unmounted', leadInput?.documentChecklist)
  }, [])

  // useEffect(() => {
  //   return () => log('unmounted')
  // }, [])

  const registrationCertificate =
    leadInput?.documentChecklist?.registrationCertificate
  const [formThirtyFive, setFormThirtyFive] = useState('second')
  const [insuranceCertificate, setInsuranceCertificate] = useState('second')
  const [formTwentyEight, setFormTwentyEight] = useState('second')
  const [formTwentyNine, setFormTwentyNine] = useState('second')
  const [formThirty, setFormThirty] = useState('second')
  const [form60, setForm60] = useState('second')
  const [sellerAadharCard, setSellerAadharCard] = useState('second')
  const [ownerAddressProof, setOwnerAddressProof] = useState('second')
  // const [sellerPanCard, setSellerPanCard] = useState('second')
  const [releaseOrder, setReleaseOrder] = useState('second')
  const [indemnityBond, setIndemnityBond] = useState('second')
  const [formThirtySix, setFormThirtySix] = useState('second')
  const [regCertRadioButtonValue, setRegCertRadioButtonValue] =
    useState('second')
  const [form26RadioButtonValue, setForm26RadioButtonValue] = useState('second')
  const [loanForeClosureRadioButtonValue, setLoanForeClosureRadioButtonValue] =
    useState('second')
  const [bankNOCRadioButtonValue, setBankNOCRadioButtonValue] =
    useState('second')

  //As per product requirement, //TODO: The radio button should be able to populate just w.r.t to leadInput
  // FIXME: Ask Ketan on how to setLeadInput on first render.

  // const formThirtyFive = leadInput?.documentChecklist?.form35
  // const insuranceCertificate =
  //   leadInput?.documentChecklist?.insuranceCertificate
  // const formTwentyEight = leadInput?.documentChecklist?.form28
  // const formTwentyNine = leadInput?.documentChecklist?.form29
  // const formThirty = leadInput?.documentChecklist?.form30
  // const form60 = leadInput?.documentChecklist?.form60
  // const sellerAadharCard = leadInput?.documentChecklist?.sellerAadharCard
  // const ownerAddressProof = leadInput?.documentChecklist?.ownerAddressProof
  // const sellerPanCard = leadInput?.documentChecklist?.sellerPAN
  // const releaseOrder = leadInput?.documentChecklist?.releaseOrder
  // const indemnityBond = leadInput?.documentChecklist?.indemnityBond
  // const form26 = leadInput?.documentChecklist?.form26
  // const loanForeClosure = leadInput?.documentChecklist?.loanForeclosure
  // const bankNoc = leadInput?.documentChecklist?.bankNOC
  // const {data, loading} = useGetDocumentsCheckListFromLeadQuery({
  //   variables: {leadId},
  //   onCompleted: ({queryLead}) => {
  //     console.log(
  //       '..............data...............',
  //       data?.queryLead?.[0]?.vehicle?.financingDetails?.isLoanClosed,
  //       registrationCertificate,
  //     )
  //   },
  // })

  function onRegCertificateChange(value?: string) {
    setRegCertRadioButtonValue(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        registrationCertificate: value === 'first',
      },
    })
  }

  function onForm26Change(value?: string) {
    setForm26RadioButtonValue(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form26: value === 'first',
      },
    })
  }
  function onFormThirtySixChange(value?: string) {
    setFormThirtySix(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form36: value === 'first',
      },
    })
  }
  function onLoanForceClosureChange(value?: string) {
    setLoanForeClosureRadioButtonValue(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        loanForeclosure: value === 'first',
      },
    })
  }

  function onBankNOCChange(value?: string) {
    setBankNOCRadioButtonValue(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        bankNOC: value === 'first',
      },
    })
  }

  function onForm35Change(value?: string) {
    setFormThirtyFive(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form35: value === 'first',
      },
    })
  }

  function onInsuranceCertificateChange(value?: string) {
    setInsuranceCertificate(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        insuranceCertificate: value === 'first',
      },
    })
  }

  function onForm28Change(value?: string) {
    setFormTwentyEight(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form28: value === 'first',
      },
    })
  }

  function onForm29Change(value?: string) {
    setFormTwentyNine(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form29: value === 'first',
      },
    })
  }

  function onForm30Change(value?: string) {
    setFormThirty(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form30: value === 'first',
      },
    })
  }

  function onForm60Change(value?: string) {
    setForm60(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        form60: value === 'first',
      },
    })
  }

  function onSellerAadharCardChange(value?: string) {
    setSellerAadharCard(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        sellerAadharCard: value === 'first',
      },
    })
  }

  function onOwnerAddressProofChange(value?: string) {
    setOwnerAddressProof(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        ownerAddressProof: value === 'first',
      },
    })
  }

  function onReleaseOrderChange(value?: string) {
    setReleaseOrder(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        releaseOrder: value === 'first',
      },
    })
  }

  function onIndemnityBondChange(value?: string) {
    setIndemnityBond(value)
    setLeadInput({
      ...leadInput,
      documentChecklist: {
        ...leadInput?.documentChecklist,
        indemnityBond: value === 'first',
      },
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <Separator size={1} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.cardStyle}>
          <Row>
            <P1>Document Name</P1>
            <P1>Required</P1>
          </Row>
        </Card>
        <RNRadioButton
          variant={'doc_check'}
          title={'Registration certificate *'}
          value={regCertRadioButtonValue}
          onValueChange={onRegCertificateChange}
        />

        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Form 26 *'}
          value={form26RadioButtonValue}
          onValueChange={onForm26Change}
        />

        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Loan foreclosure *'}
          value={loanForeClosureRadioButtonValue}
          onValueChange={onLoanForceClosureChange}
        />

        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Bank NOC *'}
          value={bankNOCRadioButtonValue}
          onValueChange={onBankNOCChange}
        />

        <Separator size={0.1} bgColor />

        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Form 35 *'}
          value={formThirtyFive}
          onValueChange={onForm35Change}
        />
        <RNRadioButton
          variant={'doc_check'}
          title={'Insurance Certificate *'}
          value={insuranceCertificate}
          onValueChange={onInsuranceCertificateChange}
        />

        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Form 28 *'}
          value={formTwentyEight}
          onValueChange={onForm28Change}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Form 29 *'}
          value={formTwentyNine}
          onValueChange={onForm29Change}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Form 30 *'}
          value={formThirty}
          onValueChange={onForm30Change}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Seller PAN / Form 60 *'}
          value={form60}
          onValueChange={onForm60Change}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Seller Aadhar Card *'}
          value={sellerAadharCard}
          onValueChange={onSellerAadharCardChange}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Owner Address Proof *'}
          value={ownerAddressProof}
          onValueChange={onOwnerAddressProofChange}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Form 36 *'}
          value={formThirtySix}
          onValueChange={onFormThirtySixChange}
        />
        {/* <RNRadioButton
          variant={'doc_check'}
          title={'Release Order'}
          value={releaseOrder}
          onValueChange={onReleaseOrderChange}
        />
        <Separator size={0.1} bgColor />
        <RNRadioButton
          variant={'doc_check'}
          title={'Indemnity Bond'}
          value={indemnityBond}
          onValueChange={onIndemnityBondChange}
        /> */}
        <Separator size={0.1} bgColor />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button
          variant="primary"
          title="UPDATE LEAD"
          type="enable"
          onPress={() => {}}
        />
      </Row> */}
    </View>
    // <View style={commonStyle.mainAppContainer}>
    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <Card style={styles.cardStyle}>
    //       <Row>
    //         <P1>Document Name</P1>
    //         <P1>Availability Status</P1>
    //       </Row>
    //     </Card>
    //     {data?.queryLead?.[0].vehicle?.isRcAvailable && (
    //       <RNRadioButton
    //         variant={'doc_check'}
    //         title={'Registration certificate'}
    //         value={regCertRadioButtonValue}
    //         onValueChange={onRegCertificateChange}
    //       />
    //     )}

    //     <Separator size={0.1} bgColor />
    //     {(data?.queryLead?.[0].vehicle?.isRcAvailable === false ||
    //       data?.queryLead?.[0].vehicle?.isRcAvailable === null) && (
    //       <RNRadioButton
    //         variant={'doc_check'}
    //         title={'Form 26'}
    //         value={form26RadioButtonValue}
    //         onValueChange={onForm26Change}
    //       />
    //     )}

    //     <Separator size={0.1} bgColor />
    //     {data?.queryLead?.[0]?.vehicle?.financingDetails?.isLoanClosed && (
    //       <RNRadioButton
    //         variant={'doc_check'}
    //         title={'Loan foreclosure'}
    //         value={loanForeClosureRadioButtonValue}
    //         onValueChange={onLoanForceClosureChange}
    //       />
    //     )}

    //     <Separator size={0.1} bgColor />
    //     {data?.queryLead?.[0]?.vehicle?.isVehicleFinanced && (
    //       <RNRadioButton
    //         variant={'doc_check'}
    //         title={'Bank NOC'}
    //         value={bankNOCRadioButtonValue}
    //         onValueChange={onBankNOCChange}
    //       />
    //     )}

    //     <Separator size={0.1} bgColor />

    //     <Separator size={0.1} bgColor />
    //     {data?.queryLead?.[0].vehicle?.isVehicleInsured && (
    //       <>
    //         <RNRadioButton
    //           variant={'doc_check'}
    //           title={'Form 35'}
    //           value={formThirtyFive ? 'first' : 'second'}
    //           onValueChange={onForm35Change}
    //         />
    //         <RNRadioButton
    //           variant={'doc_check'}
    //           title={'Insurance Certificate'}
    //           value={insuranceCertificate ? 'first' : 'second'}
    //           onValueChange={onInsuranceCertificateChange}
    //         />
    //       </>
    //     )}

    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Form 28'}
    //       value={formTwentyEight ? 'first' : 'second'}
    //       onValueChange={onForm28Change}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Form 29'}
    //       value={formTwentyNine ? 'first' : 'second'}
    //       onValueChange={onForm29Change}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Form 30'}
    //       value={formThirty ? 'first' : 'second'}
    //       onValueChange={onForm30Change}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Seller PAN / Form 60'}
    //       value={form60 ? 'first' : 'second'}
    //       onValueChange={onForm60Change}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Seller Aadhar Card'}
    //       value={sellerAadharCard ? 'first' : 'second'}
    //       onValueChange={onSellerAadharCardChange}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Owner Address Proof'}
    //       value={ownerAddressProof ? 'first' : 'second'}
    //       onValueChange={onOwnerAddressProofChange}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Release Order'}
    //       value={releaseOrder ? 'first' : 'second'}
    //       onValueChange={onReleaseOrderChange}
    //     />
    //     <Separator size={0.1} bgColor />
    //     <RNRadioButton
    //       variant={'doc_check'}
    //       title={'Indemnity Bond'}
    //       value={indemnityBond ? 'first' : 'second'}
    //       onValueChange={onIndemnityBondChange}
    //     />
    //     <Separator size={0.1} bgColor />
    //   </ScrollView>
    //   {/* <Row style={commonStyle.buttonView}>
    //     <Button
    //       variant="primary"
    //       title="UPDATE LEAD"
    //       type="enable"
    //       onPress={() => {}}
    //     />
    //   </Row> */}
    // </View>
  )
}

export default CheckVehicleDocuments

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: baseSize,
  },
  buttonContainer: {
    padding: Layout.baseSize,
    elevation: 2,
  },
  cardStyle: {padding: Layout.baseSize * 0.5},
})
