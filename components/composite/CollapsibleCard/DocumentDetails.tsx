import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import {StyleSheet, ToastAndroid, TouchableOpacity, View} from 'react-native'
import {List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {
  AddLeadDocumentsInput,
  LeadDocumentsDetailsFragmentDoc,
  LeadRef,
  LeadSource,
  UserRole,
  useVehicleDetailsQuery,
  useWriteLeadDocumentUrlsMutation,
} from '../../../generated/hooks_and_more'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import useUserToken from '../../../hooks/useUserToken'
import {RootStackScreenProps} from '../../../navigation/navigationTypes'
import {camelCaseToReadable, log} from '../../../utils/helpers'
import Icon from '../../basic/Icon'
import RNFileUploader from '../../basic/RNFileUploader'
import {H3, P1, P2} from '../../basic/StyledText'
import Button from '../../basic/Button'
import FollowUpModal from '../FollowUpModal'
import {Text} from 'react-native'

type DocumentDetailsProps = {
  documentsData: Pick<LeadRef, 'documentChecklist' | 'regNo'>
  bankNoc: string
  form26: string
  form28: string
  form29: string
  form30: string
  form35: string
  form36: string
  form60: string
  indemnityBond: string
  releaseOrder: string
  insuranceCertificate: string
  loanForeclosure: string
  registrationCertificate: string
  sellerAadharCard: string
  sellerPan: string
  leadId: string
  regNo: string
}
const DocumentDetails = ({
  documentsData,
  bankNoc,
  form26,
  form28,
  form29,
  form30,
  form35,
  form36,
  form60,
  indemnityBond,
  insuranceCertificate,
  loanForeclosure,
  registrationCertificate,
  releaseOrder,
  sellerAadharCard,
  sellerPan,
  leadId,
  regNo,
}: DocumentDetailsProps) => {
  const navigation =
    useNavigation<
      RootStackScreenProps<
        'ViewPdfScreen' | 'ViewImageScreen' | 'DocumentsCheckList'
      >['navigation']
    >()

  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)

  const [followUpDocument, setFollowUpDocument] = useState({
    open: false,
    type: '',
  })
  const [addLeadDocumentInput] = useWriteLeadDocumentUrlsMutation({
    // refetchQueries: [{query: GetLeadDealDetailsDocument}],
    update: (cache, {data}) => {
      // update documents field of the lead
      const newLeadDocumentsRef = cache.writeFragment({
        id: `LeadDocuments:${data?.addLeadDocuments?.leadDocuments?.[0]?.id}`,
        data: data?.addLeadDocuments?.leadDocuments?.[0],
        fragment: LeadDocumentsDetailsFragmentDoc,
        fragmentName: 'LeadDocumentsDetails',
      })
      cache.modify({
        id: `Lead:${leadId}`,
        fields: {
          documents() {
            return newLeadDocumentsRef
          },
        },
      })
    },
    onCompleted: ({addLeadDocuments}) => {
      log('uploading', addLeadDocuments)
    },
  })
  const {data} = useVehicleDetailsQuery({
    // fetchPolicy: 'network-only',
    variables: {
      regNo: regNo,
    },
  })
  // const isBankNoc = documentsData?.documentChecklist?.bankNOC
  // const isForm26 = documentsData?.documentChecklist?.form26
  // const isForm28 = documentsData?.documentChecklist?.form28
  // const isForm29 = documentsData?.documentChecklist?.form29
  // const isForm30 = documentsData?.documentChecklist?.form30
  // const isForm35 = documentsData?.documentChecklist?.form35
  // const isForm60 = documentsData?.documentChecklist?.form60
  // const isIndemnityBond = documentsData?.documentChecklist?.indemnityBond
  // const isInsuranceCertificate =
  //   documentsData?.documentChecklist?.insuranceCertificate
  // const isLoanForeclosure = documentsData?.documentChecklist?.loanForeclosure
  // const isOwnerAddressProof =
  //   documentsData?.documentChecklist?.ownerAddressProof
  // const isRegistrationCertificate =
  //   documentsData?.documentChecklist?.registrationCertificate
  // const isReleaseOrder = documentsData?.documentChecklist?.releaseOrder
  // const isSellerAadharCard = documentsData?.documentChecklist?.sellerAadharCard
  // const isSellerPan = documentsData?.documentChecklist?.sellerPAN

  //Document Values
  // const bankNoc = documentsData?.documents?.bankNOC
  // const form26 = documentsData?.documents?.form26
  // const form28 = documentsData?.documents?.form28
  // const form29 = documentsData?.documents?.form29
  // const form30 = documentsData?.documents?.form30
  // const form35 = documentsData?.documents?.form35
  // const form36 = documentsData?.documents?.form36
  // const form60 = documentsData?.documents?.form60
  // const indemnityBond = documentsData?.documents?.indemnityBond
  // const insuranceCertificate = documentsData?.documents?.insuranceCertificate
  // const loanForeclosure = documentsData?.documents?.loanForeclosure
  // const ownerAddressProof = documentsData?.documents?.ownerAddressProof
  // const registrationCertificate =
  //   documentsData?.documents?.registrationCertificate
  // const releaseOrder = documentsData?.documents?.releaseOrder
  // const sellerAadharCard = documentsData?.documents?.sellerAadharCard
  // const sellerPan = documentsData?.documents?.sellerPAN

  // const availableDocumentsUrls = Object.entries(documentsData?.documents ?? {})

  // const availableDocuments = Object.entries(
  //   documentsData?.documentChecklist ?? {},
  // )
  //   .filter(([k, v]) => !!v && k !== '__typename' && k !== 'id')
  //   .map(i => ({
  //     key: i[0].slice(0, i[0].length),
  //     value: availableDocumentsUrls?.find(
  //       item => item[0] === i[0].slice(0, i[0].length),
  //     )?.[1],
  //   }))

  /*   log(' documents:', documentsData?.documentChecklist)
  log('documents value', availableDocumentsUrls)
  log('available documents', availableDocuments) */

  const availableDocuments: {key: string; value: string; isHidden?: boolean}[] =
    [
      {
        key: 'bankNOC',
        value: bankNoc,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.bankNOC
            : true,
      },
      {
        key: 'form26',
        value: form26,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form26
            : true,
      },
      {
        key: 'form28',
        value: form28,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form28
            : true,
      },
      {
        key: 'form29',
        value: form29,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form29
            : true,
      },
      {
        key: 'form30',
        value: form30,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form30
            : true,
      },
      {
        key: 'form35',
        value: form35,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form35
            : true,
      },
      {
        key: 'form60',
        value: form60,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form60
            : true,
      },
      {
        key: 'indemnityBond',
        value: indemnityBond,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.indemnityBond
            : true,
      },
      {
        key: 'releaseOrder',
        value: releaseOrder,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.releaseOrder
            : true,
      },
      {
        key: 'insuranceCertificate',
        value: insuranceCertificate,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.insuranceCertificate
            : true,
      },
      {
        key: 'loanForeclosure',
        value: loanForeclosure,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.loanForeclosure
            : true,
      },
      {
        key: 'registrationCertificate',
        value: registrationCertificate,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.registrationCertificate
            : true,
      },
      {
        key: 'sellerAadharCard',
        value: sellerAadharCard,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.sellerAadharCard
            : true,
      },
      // {
      //   key: 'sellerPAN',
      //   value: sellerPan,
      //   isHidden:
      //     data?.getLead?.source === LeadSource.DealershipSale
      //       ? data?.getLead?.documentChecklist?.sellerPAN
      //       : true,
      // },
      {
        key: 'form36',
        value: form36,
        isHidden:
          data?.getLead?.source === LeadSource.DealershipSale
            ? data?.getLead?.documentChecklist?.form36
            : true,
      },
    ]

  const onAddingChecklistDocument = ({
    key,
    url,
  }: {
    key: string
    url: string
  }): void => {
    let value: AddLeadDocumentsInput = {
      regNo: documentsData?.regNo,
      lead: {regNo: documentsData?.regNo},
    }
    switch (key as keyof AddLeadDocumentsInput) {
      case 'bankAccountProofUrl':
        value.bankAccountProofUrl = url
        break
      case 'bankNOC':
        value.bankNOC = url
        break
      case 'dealPaymentProofUrl':
        value.dealPaymentProofUrl = url
        break
      case 'form26':
        value.form26 = url
        break
      case 'form28':
        value.form28 = url
        break
      case 'form29':
        value.form29 = url
        break
      case 'form30':
        value.form30 = url
        break
      case 'form36':
        value.form36 = url
        log('after set url', value?.form36)
        break
      case 'form60':
        value.form60 = url
        //TODO : With clarity, it'll improve
        break
      case 'form35':
        value.form35 = url
        break
      case 'indemnityBond':
        value.indemnityBond = url
        break
      case 'insuranceCertificate':
        value.insuranceCertificate = url
        break
      case 'loanForeclosure':
        value.loanForeclosure = url
        break
      case 'ownerAddressProof':
        value.ownerAddressProof = url
        break
      case 'parkingPaymentProofUrl':
        value.parkingPaymentProofUrl = url
        break
      case 'registrationCertificate':
        value.registrationCertificate = url
        break
      case 'releaseOrder':
        value.releaseOrder = url
        break
      case 'sellerAadharCard':
        value.sellerAadharCard = url
        break
      case 'sellerPAN':
        value.sellerPAN = url
        break

      default:
        break
    }

    log('variable for add lead document input', value)
    addLeadDocumentInput({
      variables: {
        value,
      },
    })
  }
  function navigateToDedicatedScreen(item) {
    log('document opened', item?.value)
    const itemValue = item?.value
      ?.toString()
      ?.split('?')?.[0]
      ?.split('/')
      ?.reverse()?.[0]
      ?.split('.')
      ?.reverse()?.[0]
    if (itemValue === 'jpg' || itemValue === 'jpeg' || itemValue === 'png') {
      navigation.navigate('ViewImageScreen', {
        imageUrl: item?.value?.toString(),
        title: item?.isDoc && item?.key,
      })
    } else if (itemValue === 'pdf') {
      navigation.navigate('ViewPdfScreen', {
        pdfUrl: item?.value,
        title: item?.isDoc && item?.key,
        regNo: documentsData?.regNo,
      })
    } else {
      ToastAndroid.showWithGravity('Added Document is not right!', 30, 30)
    }
    log('clicked to View Document', item?.value)
  }

  const onFolloUpDateClicked = () => {
    navigation.navigate('DocumentsCheckList', {
      regNo: documentsData?.regNo,
    })
  }

  const hideModal = () => {
    setFollowUpDocument({
      open: false,
      type: '',
    })
  }

  const handleOpen = (key: string) => {
    setFollowUpDocument({
      ...followUpDocument,
      open: true,
      type: key,
    })
  }

  return (
    <Surface style={styles.container} elevation={1}>
      {followUpDocument.open && (
        <FollowUpModal
          hidePopup={hideModal}
          isVisble={followUpDocument.open}
          docType={followUpDocument.type}
          regNo={documentsData?.regNo}
        />
      )}
      <List.Accordion
        style={styles.accordionStyle}
        title={'Document Details'}
        titleStyle={{color: Colors.dark.background}}>
        {availableDocuments
          .filter(i => i?.isHidden)
          .map((item, index) => {
            return (
              <View key={index} style={styles.mainItemView}>
                <></>
                <View style={styles.keyText}>
                  <P2 numberOfLines={1} style={{color: 'grey'}}>
                    {camelCaseToReadable(item.key)}
                  </P2>
                </View>
                <View style={styles.valueText}>
                  <View style={styles.row}>
                    {!!item.value ? (
                      <Icon
                        onPress={() => navigateToDedicatedScreen(item)}
                        iconName="picture-as-pdf"
                        style={
                          (loggedInUser?.role === UserRole.LogisticsManager ||
                            loggedInUser?.role ===
                              UserRole.OperationsManager) &&
                          styles.icon
                        }
                      />
                    ) : (
                      <>
                        {loggedInUser?.role === UserRole.LogisticsManager ||
                        loggedInUser?.role === UserRole.OperationsManager ? (
                          <TouchableOpacity
                            style={styles.btnContainer}
                            onPress={() => {
                              handleOpen(item.key)
                            }}>
                            <Icon
                              iconName="access-time"
                              size={Layout.baseSize * 1.35}
                              //  style={styles.iconStyle}
                            />
                          </TouchableOpacity>
                        ) : (
                          <Text>-</Text>
                        )}
                      </>
                    )}
                    {(loggedInUser?.role === UserRole.OperationsManager ||
                      (loggedInUser?.role === UserRole.LogisticsManager &&
                        (item.key === 'releaseOrder' ||
                          item.key === 'indemnityBond'))) && (
                      <RNFileUploader
                        isRequired
                        title={item.key}
                        variant="docs"
                        isDocUploaderIcon
                        key={item?.key}
                        value={item?.value}
                        onSaveDoc={onAddingChecklistDocument}
                      />
                    )}
                  </View>
                </View>
              </View>
            )
          })}

        {data?.getLead?.source === LeadSource.DealershipSale &&
          (loggedInUser?.role === UserRole.LogisticsManager ||
            loggedInUser?.role === UserRole.OperationsManager) && (
            <TouchableOpacity
              style={styles.checkListButtons}
              onPress={onFolloUpDateClicked}>
              <H3 style={{color: Colors.light.primary}}>
                Edit Documents Checklist
              </H3>
            </TouchableOpacity>
          )}
      </List.Accordion>
    </Surface>
  )
}

export default DocumentDetails

const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordionStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
  mainItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 1.5,
    paddingHorizontal: Layout.baseSize,
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: Layout.baseSize / 2,
  },
  checkListButtons: {
    paddingVertical: Layout.baseSize,
    alignItems: 'center',
  },
  icon: {
    // marginRight: Layout.baseSize,
  },
  keyText: {
    flex: 1,
  },

  valueText: {
    flex: 1,
  },
})
