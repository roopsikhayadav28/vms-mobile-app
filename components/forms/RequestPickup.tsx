import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {useGetDriverQuery} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import Button from '../basic/Button'
import {P1} from '../basic/StyledText'
import Map from '../composite/Map'

type FormComponentProps = {leadId: string | undefined; regNo?: string}

const RequestPickup = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const registrationNumber = leadInput && leadInput.regNo
  const {data: getDriverQuery} = useGetDriverQuery({
    fetchPolicy: 'network-only',
    variables: {
      regNo: regNo as string,
    },
    onCompleted: getDriverQuery => {
      // log('Requesting Driver', getDriverQuery?.getLead?.pickup?.by?.name)
    },
  })
  const url = getDriverQuery?.getLead?.yard?.locationUrl

  return <Map regNo={regNo} />
}

export default RequestPickup

const styles = StyleSheet.create({
  buttonStyle: {
    width: Layout.baseSize * 15,
    alignSelf: 'center',
    marginTop: Layout.baseSize * 21,
  },
})
