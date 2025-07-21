'use client';

import React from 'react';
import { 
  BarChart3, 
  Cloud, 
  DollarSign, 
  Newspaper,
  Home,
  Settings,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Weather', href: '/weather', icon: Cloud },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              UniFeed
            </span>
          </div>
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  "hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};