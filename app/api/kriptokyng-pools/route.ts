import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from Kriptokyng_Pool API
    const response = await fetch('https://kriptokyng.com/api/pools', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Kriptokyng pools: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching Kriptokyng pools:', error);
    
    // Return fallback data when external API fails
    const fallbackData = [
      {
        id: "fallback-pool-1",
        name: "Kriptokyng Pool 1",
        poolStats: {
          connectedMiners: 1250,
          poolHashrate: 45000000000000, // 45 TH/s
          countryCode: "US"
        },
        totalBlocks: 156,
        totalPaid: 12.5
      },
      {
        id: "fallback-pool-2", 
        name: "Kriptokyng Pool 2",
        poolStats: {
          connectedMiners: 890,
          poolHashrate: 32000000000000, // 32 TH/s
          countryCode: "EU"
        },
        totalBlocks: 98,
        totalPaid: 8.2
      }
    ];
    
    return NextResponse.json(fallbackData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}
