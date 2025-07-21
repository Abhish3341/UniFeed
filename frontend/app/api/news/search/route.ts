import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q') || '';
  
  try {
    // Forward request to backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/api/news/search?q=${q}`);
    const data = await response.json();
    
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { 
        data: [], 
        success: false, 
        message: 'Failed to search news',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}