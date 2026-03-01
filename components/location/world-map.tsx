'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

interface MinerLocation {
    ip: string;
    country: string;
    countryCode: string;
    city: string;
    lat: number;
    lon: number;
    minerCount: number;
}

interface WorldMapProps {
    locations: MinerLocation[];
    isLoading?: boolean;
}

const LeafletMap = dynamic(() => import('./leaflet-map'), {
    ssr: false,
    loading: () => (
        <div
            className="w-full aspect-[2/1] rounded-2xl flex items-center justify-center"
            style={{
                background: 'linear-gradient(160deg, rgba(10, 15, 30, 0.98) 0%, rgba(5, 10, 25, 0.99) 50%, rgba(15, 20, 40, 0.98) 100%)',
                border: '1px solid rgba(251, 167, 33, 0.15)'
            }}
        >
            <motion.div
                className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
});

export function WorldMap({ locations, isLoading = false }: WorldMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div
                className="w-full aspect-[2/1] rounded-2xl flex items-center justify-center"
                style={{
                    background: 'linear-gradient(160deg, rgba(10, 15, 30, 0.98) 0%, rgba(5, 10, 25, 0.99) 50%, rgba(15, 20, 40, 0.98) 100%)',
                    border: '1px solid rgba(251, 167, 33, 0.15)'
                }}
            >
                <motion.div
                    className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return <LeafletMap locations={locations} isLoading={isLoading} />;
}
