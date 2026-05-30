"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

type Props = {
    lat: number | null
    lng: number | null
    onChange: (lat: number, lng: number) => void
}

const ClickHandler = ({ onChange }: { onChange: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click(e) {
            onChange(e.latlng.lat, e.latlng.lng)
        },
    })
    return null
}

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap()
    useEffect(() => {
        map.setView([lat, lng], map.getZoom())
    }, [lat, lng, map])
    return null
}

const MapPicker = ({ lat, lng, onChange }: Props) => {
    const defaultCenter: [number, number] = [20.5937, 78.9629]

    return (
        <div className="rounded-xl overflow-hidden border border-zinc-800 h-64 w-full">
            <MapContainer
                center={lat && lng ? [lat, lng] : defaultCenter}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickHandler onChange={onChange} />
                {lat && lng && (
                    <>
                        <RecenterMap lat={lat} lng={lng} />
                        <Marker position={[lat, lng]} icon={markerIcon} />
                    </>
                )}
            </MapContainer>
        </div>
    )
}

export default MapPicker