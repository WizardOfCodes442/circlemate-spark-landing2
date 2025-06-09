import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronUp, Calendar, Heart } from "lucide-react";

const PlatformOverview = () => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="ghost" className="bg-teal-500 text-white rounded-full px-4 py-1 text-sm">
          <Users className="h-4 w-4 mr-2" /> View Accepted Connections
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Total Communities</p>
            <p className="text-2xl font-bold text-navy-700">
              287 <span className="text-sm text-navy-700">+12% this month</span>
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Verified Users</p>
            <p className="text-2xl font-bold text-navy-700">
              12,458 <span className="text-sm text-navy-700">+8% this month</span>
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Heart className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Successful Matches</p>
            <p className="text-2xl font-bold text-navy-700">
              3,842 <span className="text-sm text-navy-700">+15% this month</span>
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Calendar className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Active Events</p>
            <p className="text-2xl font-bold text-navy-700">
              162 <span className="text-sm text-navy-700">+5% this month</span>
            </p>
          </div>
        </Card>
      </div>
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
        <CardHeader className="p-4 pl-0">
          <h3 className="text-lg font-semibold ml-4">Platform Growth</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="w-full" style={{ position: 'relative', paddingBottom: '20%' }}>
            <svg className="recharts-surface absolute top-0 left-0" width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
              <title></title>
              <desc></desc>
              <defs>
                <clipPath id="recharts51-clip">
                  <rect x="60" y="10" height="260" width="280"></rect>
                </clipPath>
              </defs>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#1FBAB4" stop-opacity="0.8"></stop>
                  <stop offset="95%" stop-color="#1FBAB4" stop-opacity="0.1"></stop>
                </linearGradient>
                <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#FF9500" stop-opacity="0.8"></stop>
                  <stop offset="95%" stop-color="#FF9500" stop-opacity="0.1"></stop>
                </linearGradient>
                <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#f87171" stop-opacity="0.8"></stop>
                  <stop offset="95%" stop-color="#f87171" stop-opacity="0.1"></stop>
                </linearGradient>
              </defs>
              <g class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-line" stroke="#666" fill="none" x1="60" y1="270" x2="340" y2="270"></line>
                <g class="recharts-cartesian-axis-ticks">
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="60" y1="276" x2="60" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="60" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="60" dy="0.71em">Jan</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="100" y1="276" x2="100" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="100" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="100" dy="0.71em">Feb</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="140" y1="276" x2="140" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="140" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="140" dy="0.71em">Mar</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="180" y1="276" x2="180" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="180" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="180" dy="0.71em">Apr</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="220" y1="276" x2="220" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="220" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="220" dy="0.71em">May</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="260" y1="276" x2="260" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="260" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="260" dy="0.71em">Jun</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="bottom" width="280" height="30" x="60" y="270" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="300" y1="276" x2="300" y2="270"></line>
                    <text orientation="bottom" width="280" height="30" stroke="none" x="300" y="278" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                      <tspan x="300" dy="0.71em">Jul</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                <line orientation="left" width="60" height="260" x="0" y="10" class="recharts-cartesian-axis-line" stroke="#666" fill="none" x1="60" y1="10" x2="60" y2="270"></line>
                <g class="recharts-cartesian-axis-ticks">
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="left" width="60" height="260" x="0" y="10" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="54" y1="270" x2="60" y2="270"></line>
                    <text orientation="left" width="60" height="260" stroke="none" x="52" y="270" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                      <tspan x="52" dy="0.355em">0</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="left" width="60" height="260" x="0" y="10" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="54" y1="205" x2="60" y2="205"></line>
                    <text orientation="left" width="60" height="260" stroke="none" x="52" y="205" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                      <tspan x="52" dy="0.355em">2500</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="left" width="60" height="260" x="0" y="10" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="54" y1="140" x2="60" y2="140"></line>
                    <text orientation="left" width="60" height="260" stroke="none" x="52" y="140" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                      <tspan x="52" dy="0.355em">5000</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="left" width="60" height="260" x="0" y="10" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="54" y1="75" x2="60" y2="75"></line>
                    <text orientation="left" width="60" height="260" stroke="none" x="52" y="75" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                      <tspan x="52" dy="0.355em">7500</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line orientation="left" width="60" height="260" x="0" y="10" class="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="54" y1="10" x2="60" y2="10"></line>
                    <text orientation="left" width="60" height="260" stroke="none" x="52" y="10" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                      <tspan x="52" dy="0.355em">10000</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g class="recharts-cartesian-grid">
                <g class="recharts-cartesian-grid-horizontal">
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="60" y1="270" x2="340" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="60" y1="205" x2="340" y2="205"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="60" y1="140" x2="340" y2="140"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="60" y1="75" x2="340" y2="75"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="60" y1="10" x2="340" y2="10"></line>
                </g>
                <g class="recharts-cartesian-grid-vertical">
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="60" y1="10" x2="60" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="100" y1="10" x2="100" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="140" y1="10" x2="140" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="180" y1="10" x2="180" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="220" y1="10" x2="220" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="260" y1="10" x2="260" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="300" y1="10" x2="300" y2="270"></line>
                  <line stroke-dasharray="3 3" stroke="#ccc" fill="none" x="60" y="10" width="280" height="260" x1="340" y1="10" x2="340" y2="270"></line>
                </g>
              </g>
              <g class="recharts-layer recharts-area">
                <g class="recharts-layer">
                  <path fill-opacity="1" fill="url(#colorUsers)" width="280" height="260" stroke="none" class="recharts-curve recharts-area-area" d="M60,166C73.333,157.333,86.667,148.667,100,140C113.333,131.333,126.667,122.667,140,114C153.333,105.333,166.667,96.667,180,88C193.333,79.333,206.667,70.667,220,62C233.333,53.333,246.667,44.667,260,36C273.333,27.333,286.667,18.667,300,10C313.333,1.667,326.667,-5,340,10L340,270C326.667,270,313.333,270,300,270C286.667,270,273.333,270,260,270C246.667,270,233.333,270,220,270C206.667,270,193.333,270,180,270C166.667,270,153.333,270,140,270C126.667,270,113.333,270,100,270C86.667,270,73.333,270,60,270Z"></path>
                  <path stroke="#1FBAB4" fill-opacity="1" fill="none" width="280" height="260" class="recharts-curve recharts-area-curve" d="M60,166C73.333,157.333,86.667,148.667,100,140C113.333,131.333,126.667,122.667,140,114C153.333,105.333,166.667,96.667,180,88C193.333,79.333,206.667,70.667,220,62C233.333,53.333,246.667,44.667,260,36C273.333,27.333,286.667,18.667,300,10C313.333,1.667,326.667,-5,340,10"></path>
                </g>
              </g>
              <g class="recharts-layer recharts-area">
                <g class="recharts-layer">
                  <path fill-opacity="1" fill="url(#colorMatches)" width="280" height="260" stroke="none" class="recharts-curve recharts-area-area" d="M60,207.6C73.333,204.133,86.667,200.667,100,197.2C113.333,193.733,126.667,190.267,140,186.8C153.333,183.333,166.667,179,180,176.4C193.333,173.8,206.667,172.933,220,171.2C233.333,169.467,246.667,168.167,260,166C273.333,163.833,286.667,161.017,300,158.2C313.333,155.383,326.667,152.567,340,150L340,270C326.667,270,313.333,270,300,270C286.667,270,273.333,270,260,270C246.667,270,233.333,270,220,270C206.667,270,193.333,270,180,270C166.667,270,153.333,270,140,270C126.667,270,113.333,270,100,270C86.667,270,73.333,270,60,270Z"></path>
                  <path stroke="#FF9500" fill-opacity="1" fill="none" width="280" height="260" class="recharts-curve recharts-area-curve" d="M60,207.6C73.333,204.133,86.667,200.667,100,197.2C113.333,193.733,126.667,190.267,140,186.8C153.333,183.333,166.667,179,180,176.4C193.333,173.8,206.667,172.933,220,171.2C233.333,169.467,246.667,168.167,260,166C273.333,163.833,286.667,161.017,300,158.2C313.333,155.383,326.667,152.567,340,150"></path>
                </g>
              </g>
              <g class="recharts-layer recharts-area">
                <g class="recharts-layer">
                  <path fill-opacity="1" fill="url(#colorEvents)" width="280" height="260" stroke="none" class="recharts-curve recharts-area-area" d="M60,249.2C73.333,248.333,86.667,247.467,100,246.6C113.333,245.733,126.667,244.867,140,244C153.333,243.133,166.667,242.267,180,241.4C193.333,240.533,206.667,240.1,220,238.8C233.333,237.5,246.667,234.9,260,233.6C273.333,232.3,286.667,231.65,300,231C313.333,230.35,326.667,229.7,340,229L340,270C326.667,270,313.333,270,300,270C286.667,270,273.333,270,260,270C246.667,270,233.333,270,220,270C206.667,270,193.333,270,180,270C166.667,270,153.333,270,140,270C126.667,270,113.333,270,100,270C86.667,270,73.333,270,60,270Z"></path>
                  <path stroke="#f87171" fill-opacity="1" fill="none" width="280" height="260" class="recharts-curve recharts-area-curve" d="M60,249.2C73.333,248.333,86.667,247.467,100,246.6C113.333,245.733,126.667,244.867,140,244C153.333,243.133,166.667,242.267,180,241.4C193.333,240.533,206.667,240.1,220,238.8C233.333,237.5,246.667,234.9,260,233.6C273.333,232.3,286.667,231.65,300,231C313.333,230.35,326.667,229.7,340,229"></path>
                </g>
              </g>
            </svg>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PlatformOverview;