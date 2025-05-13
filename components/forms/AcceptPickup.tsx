import * as React from 'react'
import {useMemo} from 'react'
import {Text, View, StyleSheet, Linking, Platform} from 'react-native'
import Layout from '../../constants/Layout'
import {useGetDriverQuery} from '../../generated/hooks_and_more'
import {log} from '../../utils/helpers'
import Button from '../basic/Button'
import Map from '../composite/Map'

interface AcceptPickupProps {
  leadId?: string
  regNo?: string
}

const AcceptPickup = ({leadId = 'new', regNo}: AcceptPickupProps) => {
  return <Map regNo={regNo} />
}

export default AcceptPickup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {flexDirection: 'row', margin: Layout.baseSize},
  pickupLocationStyle: {marginBottom: 15, fontSize: Layout.baseSize},
})
