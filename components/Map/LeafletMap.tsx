'use client'

import React, { useRef, useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'

import L, { marker } from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import '@/styles/map.css'
import { LeafletMapProps } from '@/types/mapType'

function Map({ pos, zoom, changePos }: LeafletMapProps) {
  const mapContainer = useRef<any>(null)
  const map = useRef<any>(null)
  const [zoomState] = useState(zoom)

  useEffect(() => {
    if (!pos) return
    if (map.current) return

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(pos.lat, pos.lng),
      zoom: zoomState,
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.current)
  }, [])

  useEffect(() => {
    map.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        layer.remove()
      }
    })
    const marker = L.marker(L.latLng(pos.lat, pos.lng), {
      draggable: true,
    }).addTo(map.current)
    marker.on('dragend', function (event) {
      const newPosition = marker.getLatLng() // Lấy vị trí mới
      changePos(newPosition)
    })
    map.current.flyTo(L.latLng(pos.lat, pos.lng), zoom)
  }, [pos, zoom])

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  )
}

export default Map
