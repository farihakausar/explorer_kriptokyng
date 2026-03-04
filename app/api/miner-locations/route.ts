import { NextResponse } from 'next/server';

interface GeoLocation {
    ip: string;
    country: string;
    countryCode: string;
    city: string;
    lat: number;
    lon: number;
    minerCount: number;
}

interface IpApiResponse {
    status: string;
    country: string;
    countryCode: string;
    city: string;
    lat: number;
    lon: number;
    query: string;
}

const locationCache = new Map<string, { data: GeoLocation; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60;

// Sample miner locations for demonstration - in production this would come from your database
const sampleMinerLocations: GeoLocation[] = [
    {
        ip: "192.168.1.1",
        country: "United States",
        countryCode: "US",
        city: "New York",
        lat: 40.7128,
        lon: -74.0060,
        minerCount: 15
    },
    {
        ip: "192.168.1.2",
        country: "China",
        countryCode: "CN",
        city: "Beijing",
        lat: 39.9042,
        lon: 116.4074,
        minerCount: 23
    },
    {
        ip: "192.168.1.3",
        country: "Germany",
        countryCode: "DE",
        city: "Frankfurt",
        lat: 50.1109,
        lon: 8.6821,
        minerCount: 8
    },
    {
        ip: "192.168.1.4",
        country: "Russia",
        countryCode: "RU",
        city: "Moscow",
        lat: 55.7558,
        lon: 37.6173,
        minerCount: 12
    },
    {
        ip: "192.168.1.5",
        country: "Canada",
        countryCode: "CA",
        city: "Toronto",
        lat: 43.6532,
        lon: -79.3832,
        minerCount: 6
    },
    {
        ip: "192.168.1.6",
        country: "United Kingdom",
        countryCode: "GB",
        city: "London",
        lat: 51.5074,
        lon: -0.1278,
        minerCount: 9
    },
    {
        ip: "192.168.1.7",
        country: "Japan",
        countryCode: "JP",
        city: "Tokyo",
        lat: 35.6762,
        lon: 139.6503,
        minerCount: 18
    },
    {
        ip: "192.168.1.8",
        country: "Australia",
        countryCode: "AU",
        city: "Sydney",
        lat: -33.8688,
        lon: 151.2093,
        minerCount: 4
    },
    {
        ip: "192.168.1.9",
        country: "France",
        countryCode: "FR",
        city: "Paris",
        lat: 48.8566,
        lon: 2.3522,
        minerCount: 7
    },
    {
        ip: "192.168.1.10",
        country: "South Korea",
        countryCode: "KR",
        city: "Seoul",
        lat: 37.5665,
        lon: 126.9780,
        minerCount: 11
    }
];

async function getGeoLocation(ip: string, minerCount: number): Promise<GeoLocation | null> {
    const cached = locationCache.get(ip);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return { ...cached.data, minerCount };
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,lat,lon,query`);
        const data: IpApiResponse = await response.json();

        if (data.status === 'success') {
            const location: GeoLocation = {
                ip: data.query,
                country: data.country,
                countryCode: data.countryCode,
                city: data.city || 'Unknown',
                lat: data.lat,
                lon: data.lon,
                minerCount
            };

            locationCache.set(ip, { data: location, timestamp: Date.now() });
            return location;
        }
    } catch (error) {
        console.error(`Failed to get location for IP ${ip}:`, error);
    }

    return null;
}

export async function GET() {
    try {
        // For now, return sample data
        // In production, you would fetch real miner IPs from your database
        // const minerIps = await getMinerIpAddresses(24);
        
        const locations = sampleMinerLocations;
        const uniqueCountries = new Set(locations.map(l => l.countryCode));

        return NextResponse.json({
            locations: locations,
            stats: {
                totalIps: locations.length,
                locatedIps: locations.length,
                countries: uniqueCountries.size,
                totalMiners: locations.reduce((sum, l) => sum + l.minerCount, 0)
            }
        });
    } catch (error) {
        console.error('Error fetching miner locations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch miner locations' },
            { status: 500 }
        );
    }
}
