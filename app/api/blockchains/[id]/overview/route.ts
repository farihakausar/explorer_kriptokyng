import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/Site';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: blockchainId } = await params;
  
  try {
    // Generate mock overview data for demonstration
    const mockOverview = [
      {
        date: "2024-01-15",
        blocks: 144,
        height: 810907,
        interval: "10 min",
        tx: 2145,
        value: "12,345.67 BTC",
        difficulty: "81.97 T",
        generated: "900 BTC"
      },
      {
        date: "2024-01-14",
        blocks: 142,
        height: 810763,
        interval: "10.2 min",
        tx: 1987,
        value: "11,234.56 BTC",
        difficulty: "81.85 T",
        generated: "885 BTC"
      },
      {
        date: "2024-01-13",
        blocks: 145,
        height: 810621,
        interval: "9.9 min",
        tx: 2312,
        value: "13,456.78 BTC",
        difficulty: "81.72 T",
        generated: "910 BTC"
      },
      {
        date: "2024-01-12",
        blocks: 143,
        height: 810476,
        interval: "10.1 min",
        tx: 2056,
        value: "11,890.12 BTC",
        difficulty: "81.60 T",
        generated: "895 BTC"
      },
      {
        date: "2024-01-11",
        blocks: 141,
        height: 810333,
        interval: "10.3 min",
        tx: 1876,
        value: "10,789.34 BTC",
        difficulty: "81.48 T",
        generated: "880 BTC"
      }
    ];

    return NextResponse.json(mockOverview, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API proxy error for overview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overview data', id: blockchainId, overview: [] },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}