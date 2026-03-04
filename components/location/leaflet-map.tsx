'use client';

import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

interface MinerLocation {
    ip: string;
    country: string;
    countryCode: string;
    city: string;
    lat: number;
    lon: number;
    minerCount: number;
}

interface LeafletMapProps {
    locations: MinerLocation[];
    isLoading?: boolean;
}

function getFlagUrl(countryCode: string): string {
    if (!countryCode) {
        return 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/un.svg';
    }
    return `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${countryCode.toLowerCase()}.svg`;
}

export default function LeafletMap({ locations, isLoading = false }: LeafletMapProps) {
    return (
        <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(251, 167, 33, 0.2)' }}>
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-[1000] backdrop-blur-sm">
                    <motion.div
                        className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-primary/80 font-medium">Loading miner locations...</p>
                </div>
            )}


            <style jsx global>{`
        .leaflet-container {
          background: #0a0f1e !important;
          font-family: inherit;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(15, 15, 25, 0.95) !important;
          color: #fba721 !important;
          border: 1px solid rgba(251, 167, 33, 0.3) !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(251, 167, 33, 0.2) !important;
          color: #fba721 !important;
        }
        .leaflet-control-zoom-in {
          border-radius: 8px 8px 0 0 !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 0 8px 8px !important;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(15, 15, 25, 0.95) !important;
          border: 1px solid rgba(251, 167, 33, 0.4) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
        }
        .leaflet-popup-content {
          margin: 12px 16px !important;
          color: #e2e8f0 !important;
        }
        .leaflet-popup-tip {
          background: rgba(15, 15, 25, 0.95) !important;
          border: 1px solid rgba(251, 167, 33, 0.4) !important;
        }
        .leaflet-control-attribution {
          background: rgba(0, 0, 0, 0.6) !important;
          color: #64748b !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: #94a3b8 !important;
        }
      `}</style>

            <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={12}
                zoomControl={false}
                style={{ height: '600px', width: '100%' }}
                worldCopyJump={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <ZoomControl position="bottomright" />

                {locations.map((location, index) => {
                    const radius = Math.min(6 + location.minerCount * 3, 20);

                    return (
                        <CircleMarker
                            key={`${location.lat}-${location.lon}-${index}`}
                            center={[location.lat, location.lon]}
                            radius={radius}
                            pathOptions={{
                                fillColor: '#fba721',
                                fillOpacity: 0.8,
                                color: '#ffffff',
                                weight: 2,
                                opacity: 1
                            }}
                        >
                            <Popup>
                                <div className="text-center min-w-[140px]">
                                    <div className="flex justify-center mb-2">
                                        <img
                                            src={getFlagUrl(location.countryCode)}
                                            alt={location.country}
                                            className="w-12 h-9 rounded shadow-md object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/un.svg';
                                            }}
                                        />
                                    </div>
                                    <div className="text-primary font-bold text-base mb-1">{location.city}</div>
                                    <div className="text-muted-foreground text-sm mb-2">{location.country}</div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                                        style={{ background: 'rgba(251, 167, 33, 0.2)', color: '#fba721' }}>
                                        <span>⛏</span>
                                        <span>{location.minerCount} miner{location.minerCount > 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>

            <div className="absolute bottom-4 left-4 z-[1000]">
                <div className="px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-primary/20">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" style={{ boxShadow: '0 0 10px rgba(251, 167, 33, 0.8)' }} />
                            <span className="font-medium">Active Miners</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <span className="text-foreground font-semibold">{locations.length} locations</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
