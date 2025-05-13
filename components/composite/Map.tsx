import {Dimensions, StyleSheet, Text, ToastAndroid, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import {useGetDriverQuery} from '../../generated/hooks_and_more'
import {getCoordinatesFromUrl, log} from '../../utils/helpers'
import {H3, P1} from '../basic/StyledText'

const Map = ({regNo}) => {
  const {data: getDriverQuery} = useGetDriverQuery({
    fetchPolicy: 'network-only',
    variables: {
      regNo: regNo as string,
    },

    onCompleted: getDriverQuery => {
      log('Requesting Driver', getDriverQuery?.getLead?.pickup?.by?.name)
    },
  })

  const {width, height} = Dimensions.get('window')
  const ASPECT_RATIO = width / height
  const LATITUDE = 20.5937
  const LONGITUDE = 78.9629
  const LATITUDE_DELTA = 0.0922
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  const dummyRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }
  const [region, setRegion] = useState<Region>(dummyRegion)
  const yardUrl = getDriverQuery?.getLead?.yard?.locationUrl

  const {latitude: yardLat, longitude: yardLong} =
    getCoordinatesFromUrl(yardUrl)
  const yardDesc = getDriverQuery?.getLead?.yard?.name
  const centreDesc = getDriverQuery?.getLead?.centre?.name

  const centreLat = getDriverQuery?.getLead?.centre?.location?.latitude
  const centreLong = getDriverQuery?.getLead?.centre?.location?.longitude // const centreUrl = centreLat && centreLong && getUrl(centreLat, centreLong)
  // const yardLatLong: PointRef = {latitude: yardLat, longitude: yardLong}
  // const centreLatLong: PointRef = {latitude: centreLat, longitude: centreLong}

  useEffect(() => {
    if (!yardLat || !yardLong || !centreLat || !centreLong || !yardUrl) return
    const latDelta: number =
      yardLat && centreLat ? Math.abs(yardLat - centreLat) * 2 : null
    const longDelta: number =
      yardLong && centreLong ? Math.abs(yardLong - centreLong) * 1.5 : null

    const mapRegion: Region = {
      latitude: yardLat,
      latitudeDelta: latDelta,
      longitude: yardLong,
      longitudeDelta: longDelta,
    }
    log('region inside use effect', region)
    setRegion(mapRegion)
  }, [yardLat, yardLong, centreLat, centreLong])

  return (
    <View style={styles.mainAppContainer}>
      <View style={styles.driverContainer}>
        <H3
          style={{
            textAlign: 'center',
            marginVertical: Layout.baseSize,
            zIndex: 10000,
          }}>
          {getDriverQuery?.getLead?.pickup?.by?.name + ' expected to pickup'}
        </H3>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={dummyRegion}
        region={region}
        // onRegionChange={() => setRegion(mapRegion)}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        moveOnMarkerPress>
        {centreLat && centreLong && (
          <Marker
            coordinate={{latitude: centreLat, longitude: centreLong}}
            pinColor="green"
            title={'Drop Location'}
            description={centreDesc}
            key={getDriverQuery?.getLead?.centre?.id}
            onPress={() => {
              // log('yard Coordinates', {yardLatLong})
            }}
          />
        )}
        {yardLat && yardLong && (
          <Marker
            coordinate={{latitude: yardLat, longitude: yardLong}}
            pinColor="red"
            title={'Pickup Location'}
            description={yardDesc}
            key={getDriverQuery?.getLead?.yard?.id}
            onPress={() => {
              // log('centre Coordinates', {centreLatLong})
            }}
          />
        )}
      </MapView>
      {(!yardLat || !yardLong) && (
        <View style={styles.driverContainer}>
          <P1
            style={{
              textAlign: 'center',
              marginVertical: Layout.baseSize,
              zIndex: 10000,
            }}>
            {'Yard location is invalid'}
          </P1>
        </View>
      )}
      <View style={styles.container}></View>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
    paddingTop: Layout.baseSize,
    // alignContent: 'space-between',
  },
  driverContainer: {
    backgroundColor: Colors.light.background,
    zIndex: 10000,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonStyle: {
    width: Layout.baseSize * 12,
    marginVertical: Layout.baseSize,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: Layout.baseSize,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Layout.baseSize * 8,
    // backgroundColor: 'pink',
    backgroundColor: Colors.light.background,
  },
})
