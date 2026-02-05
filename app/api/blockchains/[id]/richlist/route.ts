import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/Site';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: blockchainId } = await params;
  
  try {
    // For now, we'll generate mock data since there's no specific API endpoint
    // In a real implementation, this would fetch from a dedicated rich list API
    const mockRichList = [
      {
        rank: 1,
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        amount: "1,000,000 BTC",
        pct: "5.00%",
        last: "2 hours ago"
      },
      {
        rank: 2,
        address: "3D2oetDk4oZ2u2D4oZ2u2D4oZ2u2D4oZ2u",
        amount: "500,000 BTC",
        pct: "2.50%",
        last: "1 day ago"
      },
      {
        rank: 3,
        address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
        amount: "250,000 BTC",
        pct: "1.25%",
        last: "3 days ago"
      },
      {
        rank: 4,
        address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        amount: "125,000 BTC",
        pct: "0.63%",
        last: "1 week ago"
      },
      {
        rank: 5,
        address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
        amount: "62,500 BTC",
        pct: "0.31%",
        last: "2 weeks ago"
      }
    ];

    return NextResponse.json(mockRichList, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API proxy error for rich list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rich list data', id: blockchainId, richlist: [] },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}