import React from 'react'
import {PointRef} from '../../generated/hooks_and_more'
import Map from '../composite/Map'

type MapProps = {
  locations: PointRef[]
  regNo: string
}

export default function TripMap({locations, regNo}: MapProps) {
  return <Map regNo={regNo} />
}
