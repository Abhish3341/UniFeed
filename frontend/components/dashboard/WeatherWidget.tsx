'use client';

import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WeatherWidget: React.FC = () => {
  // Mock data for demonstration - will be replaced with real API calls later
  const mockWeather = {
    location: 'London',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cloud className="mr-2 h-5 w-5" />
          Weather - {mockWeather.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{mockWeather.temperature}°C</span>
            <span className="text-gray-600">{mockWeather.condition}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Droplets className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-sm">Humidity: {mockWeather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">Wind: {mockWeather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};