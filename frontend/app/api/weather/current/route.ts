import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('location') || 'london';
  
  try {
    // Forward request to backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/api/weather/current?location=${location}`);
    const data = await response.json();
    
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { 
        data: {
          id: '1',
          location: 'London',
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          icon: 'partly-cloudy',
          timestamp: new Date().toISOString(),
        }, 
        success: false, 
        message: 'Using fallback data',
        timestamp: new Date().toISOString()
      }, 
      { status: 200 }
    );
  }
}