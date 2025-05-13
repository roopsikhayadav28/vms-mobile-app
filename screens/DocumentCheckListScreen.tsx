import {View, Text, StyleSheet, ScrollView, ToastAndroid} from 'react-native'
import React, {useEffect, useState} from 'react'
import Colors from '../constants/Colors'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {P1} from '../components/basic/StyledText'
import Layout from '../constants/Layout'
import Separator from '../components/basic/Separator'
import RNRadioButton from '../components/basic/RNRadioButton'
import {camelCaseToReadable} from '../utils/helpers'
import Button from '../components/basic/Button'
import {
  DocumentChecklistPatch,
  GetDocumentsCheckListDocument,
  UpdateDocumentsCheckListDocument,
  useGetDocumentsCheckListQuery,
  useUpdateDocumentsCheckListMutation,
} from '../generated/hooks_and_more'
import {ActivityIndicator} from 'react-native-paper'

type DocumentCheckListScreenProps = RootStackScreenProps<'DocumentsCheckList'>

type CheckListValueType = {key: string; value?: string; isHidden?: boolean}

const DocumentCheckListScreen = ({
  navigation,
  route: {params},
}: DocumentCheckListScreenProps) => {
  const {data, loading, error, refetch} = useGetDocumentsCheckListQuery({
    skip: !params?.regNo,
    fetchPolicy: 'no-cache',

    variables: {
      regNo: params?.regNo,
    },
    onCompleted(data) {
      console.log(JSON.stringify(data, null, 2))
    },
    onError(error) {
      console.log('grapql error', error)
    },
  })

  const [updateCheckList, {loading: checkListLoading}] =
    useUpdateDocumentsCheckListMutation()

  const handleUpdateChecklist = () => {
    let documentCheckListPatch: DocumentChecklistPatch = {}

    checkList?.map(item => {
      console.log(item?.key)
      documentCheckListPatch = {
        ...documentCheckListPatch,
        [item.key]: item?.value === 'second' ? false : true,
      }
    })

    console.log(documentCheckListPatch)

    updateCheckList({
      variables: {
        ...documentCheckListPatch,
        regNo: params?.regNo,
        documentCheckListPatch: documentCheckListPatch,
      },
      // refetchQueries: [GetDocumentsCheckListDocument],
      onCompleted() {
        ToastAndroid.show(
          'Check list updated successfully!!',
          ToastAndroid.LONG,
        )
        navigation.goBack()
      },
    })
  }

  const documentCheckList: CheckListValueType[] = [
    {
      key: 'bankNOC',
      value: 'second',
    },
    {
      key: 'form26',
      value: 'second',
    },
    {
      key: 'form28',
      value: 'second',
    },
    {
      key: 'form29',
      value: 'second',
    },
    {
      key: 'form30',
      value: 'second',
    },
    {
      key: 'form35',
      value: 'second',
    },
    {
      key: 'form60',
      value: 'second',
    },
    {
      key: 'indemnityBond',
      value: 'second',
    },
    {
      key: 'releaseOrder',
      value: 'second',
    },
    {
      key: 'insuranceCertificate',
      value: 'second',
    },
    {
      key: 'loanForeclosure',
      value: 'second',
    },
    {
      key: 'registrationCertificate',
      value: 'second',
    },
    {
      key: 'sellerAadharCard',
      value: 'second',
    },
    // {
    //   key: 'sellerPAN',
    //   value: 'second',
    // },
    {
      key: 'form36',
      value: 'second',
    },
  ]
  useEffect(() => {
    if (data?.getLead) {
      const arr = [...documentCheckList]
      documentCheckList?.map((item, index) => {
        arr[index].value = data?.getLead?.documentChecklist?.[item.key]
          ? 'first'
          : 'second' ?? ''
      })

      setCheckList([...arr])
    }
  }, [data])

  const [checkList, setCheckList] = useState<CheckListValueType[]>([
    ...documentCheckList,
  ])

  const onValueChange = (e: string, index: number) => {
    const arr = [...checkList]
    const obj = arr[index]
    obj.value = e
    arr[index] = {...obj}

    setCheckList([...arr])
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleWrapper}>
          <P1>Document Name</P1>
          <P1>Availability Status</P1>
        </View>

        <Separator />
        {checkList.map((item, index) => {
          return (
            <RNRadioButton
              variant={'doc_check'}
              key={item.key}
              title={camelCaseToReadable(item.key)}
              value={item.value}
              onValueChange={value => {
                onValueChange(value, index)
              }}
            />
          )
        })}
        <View style={styles.btnContainer}>
          <Button
            title={'Update Checklist'}
            variant="primary"
            onPress={handleUpdateChecklist}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: Layout.baseSize / 2,
    paddingTop: Layout.baseSize,
  },
  btnContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    paddingVertical: Layout.baseSize,
    marginTop: Layout.baseSize,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.baseSize / 2,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DocumentCheckListScreen
