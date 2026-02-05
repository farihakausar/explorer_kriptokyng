import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/Site';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: blockchainId } = await params;
  
  try {
    // Generate mock network data for demonstration
    const mockNetwork = [
      {
        rank: 1,
        client: "Bitcoin Core",
        count: 12500,
        share: "65.2%"
      },
      {
        rank: 2,
        client: "btcd",
        count: 3200,
        share: "16.7%"
      },
      {
        rank: 3,
        client: "bcoin",
        count: 1800,
        share: "9.4%"
      },
      {
        rank: 4,
        client: "libbitcoin",
        count: 950,
        share: "5.0%"
      },
      {
        rank: 5,
        client: "Other",
        count: 700,
        share: "3.7%"
      }
    ];

    return NextResponse.json(mockNetwork, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API proxy error for network:', error);
    return NextResponse.json(
      { error: 'Failed to fetch network data', id: blockchainId, network: [] },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}