import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Forward request to backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/api/finance/overview`);
    const data = await response.json();
    
    return Response.json(data, { status: response.status });
  } catch (error) {
    // Fallback mock data
    const mockData = [
      {
        id: '1',
        symbol: 'AAPL',
        price: 175.43,
        change: 2.31,
        changePercent: 1.34,
        volume: 45678900,
        marketCap: 2800000000000,
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        symbol: 'GOOGL',
        price: 127.85,
        change: -1.22,
        changePercent: -0.94,
        volume: 23456789,
        marketCap: 1600000000000,
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        symbol: 'MSFT',
        price: 378.85,
        change: 5.67,
        changePercent: 1.52,
        volume: 34567890,
        marketCap: 2900000000000,
        timestamp: new Date().toISOString(),
      },
    ];
    
    return Response.json(
      { 
        data: mockData, 
        success: false, 
        message: 'Using fallback data',
        timestamp: new Date().toISOString()
      }, 
      { status: 200 }
    );
  }
}