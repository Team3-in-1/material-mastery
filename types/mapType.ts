export type Pos = {
  lat: number
  lng: number
}
export type LeafletMapProps = {
  pos: Pos
  zoom: number
  changePos: Function
}
