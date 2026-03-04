'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import { WorldMap } from '@/components/location/world-map';

interface MinerLocation {
    ip: string;
    country: string;
    countryCode: string;
    city: string;
    lat: number;
    lon: number;
    minerCount: number;
}

interface LocationStats {
    totalIps: number;
    locatedIps: number;
    countries: number;
    totalMiners: number;
}

interface LocationData {
    locations: MinerLocation[];
    stats: LocationStats;
}

interface MinerMapSectionProps {
    title?: string;
    subtitle?: string;
}

export function MinerMapSection({
    title = "Global Mining Network",
    subtitle = "Real-time view of miners connected worldwide"
}: MinerMapSectionProps) {
    const [data, setData] = useState<LocationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/miner-locations');

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (err) {
                console.error('Failed to fetch miner locations:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return (
        <section className="w-full py-12 bg-background/80">
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div
                            className="p-2.5 rounded-xl"
                            style={{
                                background: 'linear-gradient(135deg, #fba721 0%, #e6951a 100%)',
                                boxShadow: '0 4px 15px rgba(251, 167, 33, 0.3)'
                            }}
                        >
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                        {subtitle}
                    </p>
                </motion.div>

                {data && data.stats && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 mb-6"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">{data.stats.locatedIps}</span> locations
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border">
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">{data.stats.countries}</span> countries
                            </span>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full"
                >
                    <WorldMap
                        locations={data?.locations ?? []}
                        isLoading={isLoading}
                    />
                </motion.div>
            </div>
        </section>
    );
}
