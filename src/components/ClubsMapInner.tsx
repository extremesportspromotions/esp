"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { Club } from "@/data/clubs";
import { sports } from "@/data/sports";
import "leaflet/dist/leaflet.css";

const sportName = (id: string) =>
  sports.find((s) => s.id === id)?.name ?? id;

// Fix default marker icons under Next/webpack bundling
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const UK_CENTER: [number, number] = [54.5, -2.5];
const UK_BOUNDS: L.LatLngBoundsExpression = [
  [49.5, -8.5],
  [61.0, 2.0],
];

function FitClubs({ clubs }: { clubs: Club[] }) {
  const map = useMap();
  useEffect(() => {
    if (!clubs.length) {
      map.setView(UK_CENTER, 6);
      return;
    }
    if (clubs.length === 1) {
      map.setView([clubs[0].lat, clubs[0].lng], 10);
      return;
    }
    const bounds = L.latLngBounds(clubs.map((c) => [c.lat, c.lng] as [number, number]));
    map.fitBounds(bounds.pad(0.15), { maxZoom: 10 });
  }, [clubs, map]);
  return null;
}

export default function ClubsMapInner({ clubs }: { clubs: Club[] }) {
  return (
    <MapContainer
      center={UK_CENTER}
      zoom={6}
      minZoom={5}
      maxBounds={UK_BOUNDS}
      maxBoundsViscosity={0.8}
      scrollWheelZoom
      className="h-full w-full rounded-xl"
      style={{ background: "#070b14" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitClubs clubs={clubs} />
      {clubs.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]}>
          <Popup>
            <div className="min-w-[160px] text-sm text-ink">
              <p className="font-semibold">{c.name}</p>
              <p className="mt-0.5 text-xs opacity-80">{sportName(c.sportId)}</p>
              <p className="text-xs opacity-70">
                {c.town}
                {c.region ? `, ${c.region}` : ""}
              </p>
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-medium text-blue-700 underline"
                >
                  Website
                </a>
              ) : null}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
