import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('location') || 'london';
  
  try {
    // Forward request to backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/api/weather?location=${location}`);
    const data = await response.json();
    
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { 
        data: [], 
        success: false, 
        message: 'Failed to fetch weather data',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}