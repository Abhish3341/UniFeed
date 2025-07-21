'use client';

import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const NewsWidget: React.FC = () => {
  // Mock data for demonstration - will be replaced with real API calls later
  const mockNews = [
    {
      id: '1',
      title: 'Global Market Trends Show Positive Growth',
      description: 'Financial markets continue to show resilience amid global economic changes.',
      source: 'Financial Times',
      publishedAt: '2 hours ago',
      sentiment: 'positive' as const,
    },
    {
      id: '2',
      title: 'Weather Patterns Shift Across Europe',
      description: 'Meteorologists report significant weather changes affecting multiple regions.',
      source: 'Weather Channel',
      publishedAt: '4 hours ago',
      sentiment: 'neutral' as const,
    },
    {
      id: '3',
      title: 'Technology Sector Sees Innovation Surge',
      description: 'Major tech companies announce breakthrough developments in AI and computing.',
      source: 'Tech Today',
      publishedAt: '6 hours ago',
      sentiment: 'positive' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Newspaper className="mr-2 h-5 w-5" />
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNews.map((article) => (
            <div key={article.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.source}</span>
                    <span className="text-xs text-gray-500">{article.publishedAt}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};