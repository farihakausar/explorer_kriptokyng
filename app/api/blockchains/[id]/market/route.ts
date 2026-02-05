import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/Site';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: blockchainId } = await params;
  
  try {
    // Generate mock market data for demonstration
    const mockMarket = [
      {
        exchange: "Binance",
        pair: "BTC/USDT",
        price: "$67,834.12",
        volume: "$2,573,728,650",
        share: "11.80%"
      },
      {
        exchange: "Coinbase",
        pair: "BTC/USD",
        price: "$67,829.45",
        volume: "$1,845,321,450",
        share: "8.45%"
      },
      {
        exchange: "Kraken",
        pair: "BTC/USD",
        price: "$67,831.78",
        volume: "$1,234,567,890",
        share: "5.65%"
      },
      {
        exchange: "Bitfinex",
        pair: "BTC/USDT",
        price: "$67,833.21",
        volume: "$987,654,321",
        share: "4.52%"
      },
      {
        exchange: "Huobi",
        pair: "BTC/USDT",
        price: "$67,830.56",
        volume: "$876,543,210",
        share: "4.01%"
      }
    ];

    return NextResponse.json(mockMarket, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API proxy error for market:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data', id: blockchainId, market: [] },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}