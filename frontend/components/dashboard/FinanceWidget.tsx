'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FinanceWidget: React.FC = () => {
  // Mock data for demonstration - will be replaced with real API calls later
  const mockStocks = [
    { symbol: 'AAPL', price: 175.43, change: 2.31, changePercent: 1.34 },
    { symbol: 'GOOGL', price: 127.85, change: -1.22, changePercent: -0.94 },
    { symbol: 'MSFT', price: 378.85, change: 5.67, changePercent: 1.52 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockStocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-sm text-gray-600 ml-2">${stock.price}</span>
              </div>
              <div className={`flex items-center ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {stock.change > 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};