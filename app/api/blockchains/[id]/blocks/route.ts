import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/Site';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: blockchainId } = await params;
  try {
    
    // Construct the API URL to fetch blocks data for the specific blockchain
    const apiUrl = `${siteConfig.api.baseUrl}/pools/${blockchainId}/blocks`;
    
    // Pass along any query parameters
    const searchParams = new URL(request.url).searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : '';
    const fullUrl = `${apiUrl}${queryString}`;
    
    // Fetch data from the API
    const response = await fetch(fullUrl, {
      headers: {
        'Accept': request.headers.get('accept') || 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });
    
    // Check if the response is OK
    if (!response.ok) {
      // If the specific blockchain blocks aren't found, return an appropriate response
      if (response.status === 404) {
        return new NextResponse(
          JSON.stringify({ error: 'Blocks not found for blockchain', id: blockchainId }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // For other errors, return the error response from the API
      const errorData = await response.json().catch(() => ({ error: 'API request failed', id: blockchainId, blocks: [] }));
      return NextResponse.json(errorData, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if the response is empty
    const responseText = await response.text();
    if (!responseText.trim()) {
      return NextResponse.json(
        { error: 'Empty response from upstream API', id: blockchainId, blocks: [] },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Try to parse the response data
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse API response:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON response from upstream API', id: blockchainId, blocks: [] },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create a new response with the API data and status
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API proxy error for blockchain blocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blockchain blocks from API', id: blockchainId, blocks: [] },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}