import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/Site';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: blockchainId } = await params;
  
  try {
    // Generate mock extraction data for demonstration
    const mockExtraction = [
      {
        rank: 1,
        pool: "AntPool",
        last100: "8.25%",
        last1000: "8.12%"
      },
      {
        rank: 2,
        pool: "F2Pool",
        last100: "7.98%",
        last1000: "8.05%"
      },
      {
        rank: 3,
        pool: "Poolin",
        last100: "6.45%",
        last1000: "6.38%"
      },
      {
        rank: 4,
        pool: "BTC.com",
        last100: "5.72%",
        last1000: "5.81%"
      },
      {
        rank: 5,
        pool: "SlushPool",
        last100: "4.23%",
        last1000: "4.19%"
      }
    ];

    return NextResponse.json(mockExtraction, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API proxy error for extraction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch extraction data', id: blockchainId, extraction: [] },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}