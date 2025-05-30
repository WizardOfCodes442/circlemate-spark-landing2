
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Heart, TrendingUp } from 'lucide-react';

const mockData = {
  stats: {
    communities: 287,
    users: 12458,
    matches: 3842,
    events: 162
  },
  growth: {
    communities: 12,
    users: 8,
    matches: 15,
    events: 5
  },
  chartData: [
    { name: 'Jan', users: 4000, matches: 2400, events: 800 },
    { name: 'Feb', users: 5000, matches: 2800, events: 900 },
    { name: 'Mar', users: 6000, matches: 3200, events: 1000 },
    { name: 'Apr', users: 7000, matches: 3600, events: 1100 },
    { name: 'May', users: 8000, matches: 3800, events: 1200 },
    { name: 'Jun', users: 9000, matches: 4000, events: 1400 },
    { name: 'Jul', users: 10000, matches: 4300, events: 1500 },
  ]
};

const config = {
  users: {
    label: "Users",
    theme: {
      light: "#1FBAB4",
      dark: "#1FBAB4"
    }
  },
  matches: {
    label: "Matches",
    theme: {
      light: "#FF9500",
      dark: "#FF9500"
    }
  },
  events: {
    label: "Events",
    theme: {
      light: "#f87171",
      dark: "#f87171"
    }
  }
};

const PlatformOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Communities" 
          value={mockData.stats.communities} 
          growth={mockData.growth.communities}
          icon={<Users className="h-5 w-5 text-teal" />}
        />
        <StatCard 
          title="Verified Users" 
          value={mockData.stats.users} 
          growth={mockData.growth.users}
          icon={<Users className="h-5 w-5 text-teal" />}
        />
        <StatCard 
          title="Successful Matches" 
          value={mockData.stats.matches} 
          growth={mockData.growth.matches}
          icon={<Heart className="h-5 w-5 text-teal" />}
        />
        <StatCard 
          title="Active Events" 
          value={mockData.stats.events} 
          growth={mockData.growth.events}
          icon={<Calendar className="h-5 w-5 text-teal" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={config} className="aspect-auto h-full">
              <AreaChart data={mockData.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1FBAB4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1FBAB4" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9500" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF9500" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#1FBAB4" fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="matches" stroke="#FF9500" fillOpacity={1} fill="url(#colorMatches)" />
                <Area type="monotone" dataKey="events" stroke="#f87171" fillOpacity={1} fill="url(#colorEvents)" />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ title, value, growth, icon }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold">{value.toLocaleString()}</h4>
          </div>
          <div className="bg-teal/10 p-2 rounded-full">
            {icon}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium">+{growth}% this month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformOverview;
