'use client'

import { Map, Source, Layer, GeolocateControl } from '@vis.gl/react-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect } from 'react'
import type { CircleLayer } from '@vis.gl/react-maplibre'
import type { FeatureCollection } from 'geojson'
import { cwd } from 'process'
import { log } from 'console'

export default function DeliveryPage() {
  return (
    <div>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle='https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
      >
        <GeolocateControl position='top-left' />
      </Map>
    </div>
  )
}
