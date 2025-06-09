import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronUp, Calendar, Heart, ArrowUp } from "lucide-react";

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
            <p className="text-2xl font-bold text-navy-700">287</p>
            <p className="text-sm text-light-green-500 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> +12% this month
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Verified Users</p>
            <p className="text-2xl font-bold text-navy-700">12,458</p>
            <p className="text-sm text-light-green-500 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> +8% this month
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Heart className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Successful Matches</p>
            <p className="text-2xl font-bold text-navy-700">3,842</p>
            <p className="text-sm text-light-green-500 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> +15% this month
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Calendar className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Active Events</p>
            <p className="text-2xl font-bold text-navy-700">162</p>
            <p className="text-sm text-light-green-500 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> +5% this month
            </p>
          </div>
        </Card>
      </div>
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
        <CardHeader className="p-4 pl-2">
          <h3 className="text-lg font-semibold">Platform Growth</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="w-full" style={{ position: 'relative', paddingBottom: '50%' }}>
            <svg
              className="recharts-surface absolute top-0 left-0"
              width="100%"
              height="100%"
              viewBox="0 0 600 450"
              preserveAspectRatio="xMidYMid meet"
            >
              <title></title>
              <desc></desc>
              <defs>
                <clipPath id="recharts51-clip">
                  <rect x="40" y="10" height="390" width="480"></rect>
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
                <line
                  orientation="bottom"
                  width="480"
                  height="30"
                  x="40"
                  y="400"
                  class="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="40"
                  y1="400"
                  x2="520"
                  y2="400"
                ></line>
                <g class="recharts-cartesian-axis-ticks">
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="40"
                      y1="406"
                      x2="40"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="40"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="40" dy="0.71em">Jan</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="112"
                      y1="406"
                      x2="112"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="112"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="112" dy="0.71em">Feb</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="184"
                      y1="406"
                      x2="184"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="184"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="184" dy="0.71em">Mar</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="256"
                      y1="406"
                      x2="256"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="256"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="256" dy="0.71em">Apr</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="328"
                      y1="406"
                      x2="328"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="328"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="328" dy="0.71em">May</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="400"
                      y1="406"
                      x2="400"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="400"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="400" dy="0.71em">Jun</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="40"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="472"
                      y1="406"
                      x2="472"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="472"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="472" dy="0.71em">Jul</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                <line
                  orientation="left"
                  width="60"
                  height="390"
                  x="0"
                  y="10"
                  class="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="40"
                  y1="10"
                  x2="40"
                  y2="400"
                ></line>
                <g class="recharts-cartesian-axis-ticks">
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="390"
                      x="0"
                      y="10"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="34"
                      y1="400"
                      x2="40"
                      y2="400"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="32"
                      y="400"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="32" dy="0.355em">0</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="390"
                      x="0"
                      y="10"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="34"
                      y1="300"
                      x2="40"
                      y2="300"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="32"
                      y="300"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="32" dy="0.355em">2500</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="390"
                      x="0"
                      y="10"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="34"
                      y1="200"
                      x2="40"
                      y2="200"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="32"
                      y="200"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="32" dy="0.355em">5000</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="390"
                      x="0"
                      y="10"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="34"
                      y1="100"
                      x2="40"
                      y2="100"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="32"
                      y="100"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="32" dy="0.355em">7500</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="390"
                      x="0"
                      y="10"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="34"
                      y1="0"
                      x2="40"
                      y2="0"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="32"
                      y="0"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="32" dy="0.355em">10000</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g class="recharts-cartesian-grid">
                <g class="recharts-cartesian-grid-horizontal">
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="40"
                    y1="400"
                    x2="520"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="40"
                    y1="300"
                    x2="520"
                    y2="300"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="40"
                    y1="200"
                    x2="520"
                    y2="200"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="40"
                    y1="100"
                    x2="520"
                    y2="100"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="40"
                    y1="0"
                    x2="520"
                    y2="0"
                  ></line>
                </g>
                <g class="recharts-cartesian-grid-vertical">
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="40"
                    y1="10"
                    x2="40"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="112"
                    y1="10"
                    x2="112"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="184"
                    y1="10"
                    x2="184"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="256"
                    y1="10"
                    x2="256"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="328"
                    y1="10"
                    x2="328"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="400"
                    y1="10"
                    x2="400"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="472"
                    y1="10"
                    x2="472"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="40"
                    y="10"
                    width="480"
                    height="390"
                    x1="520"
                    y1="10"
                    x2="520"
                    y2="400"
                  ></line>
                </g>
              </g>
              <g class="recharts-layer recharts-area">
                <g class="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorUsers)"
                    width="480"
                    height="390"
                    stroke="none"
                    class="recharts-curve recharts-area-area"
                    d="M40,249C89.333,235.667,138.667,222.333,188,209C237.333,195.667,286.667,182.333,336,169C385.333,155.667,434.667,142.333,484,129C533.333,115.667,582.667,102.333,632,89C681.333,75.667,730.667,62.333,780,49C828.333,35.667,876.667,22.333,925,9C973.333,-4.333,1021.667,-17.667,1070,10L1070,400C1021.667,400,973.333,400,925,400C876.667,400,828.333,400,780,400C730.667,400,681.333,400,632,400C582.667,400,533.333,400,484,400C434.667,400,385.333,400,336,400C286.667,400,237.333,400,188,400C138.667,400,89.333,400,40,400Z"
                  ></path>
                  <path
                    stroke="#1FBAB4"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="390"
                    class="recharts-curve recharts-area-curve"
                    d="M40,249C89.333,235.667,138.667,222.333,188,209C237.333,195.667,286.667,182.333,336,169C385.333,155.667,434.667,142.333,484,129C533.333,115.667,582.667,102.333,632,89C681.333,75.667,730.667,62.333,780,49C828.333,35.667,876.667,22.333,925,9C973.333,-4.333,1021.667,-17.667,1070,10"
                  ></path>
                </g>
              </g>
              <g class="recharts-layer recharts-area">
                <g class="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorMatches)"
                    width="480"
                    height="390"
                    stroke="none"
                    class="recharts-curve recharts-area-area"
                    d="M40,311.4C89.333,306.2,138.667,301,188,295.8C237.333,290.6,286.667,285.4,336,280.2C385.333,275,434.667,270.6,484,266.2C533.333,261.8,582.667,258.4,632,255C681.333,251.6,730.667,248.8,780,246C828.333,243.2,876.667,240.4,925,237.6C973.333,234.8,1021.667,232,1070,225L1070,400C1021.667,400,973.333,400,925,400C876.667,400,828.333,400,780,400C730.667,400,681.333,400,632,400C582.667,400,533.333,400,484,400C434.667,400,385.333,400,336,400C286.667,400,237.333,400,188,400C138.667,400,89.333,400,40,400Z"
                  ></path>
                  <path
                    stroke="#FF9500"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="390"
                    class="recharts-curve recharts-area-curve"
                    d="M40,311.4C89.333,306.2,138.667,301,188,295.8C237.333,290.6,286.667,285.4,336,280.2C385.333,275,434.667,270.6,484,266.2C533.333,261.8,582.667,258.4,632,255C681.333,251.6,730.667,248.8,780,246C828.333,243.2,876.667,240.4,925,237.6C973.333,234.8,1021.667,232,1070,225"
                  ></path>
                </g>
              </g>
              <g class="recharts-layer recharts-area">
                <g class="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorEvents)"
                    width="480"
                    height="390"
                    stroke="none"
                    class="recharts-curve recharts-area-area"
                    d="M40,373.8C89.333,372.5,138.667,371.2,188,369.9C237.333,368.6,286.667,367.3,336,366C385.333,364.7,434.667,363.8,484,362.5C533.333,361.2,582.667,359.9,632,358.6C681.333,357.3,730.667,356.3,780,355C828.333,353.7,876.667,352.4,925,351.1C973.333,349.8,1021.667,348.5,1070,347L1070,400C1021.667,400,973.333,400,925,400C876.667,400,828.333,400,780,400C730.667,400,681.333,400,632,400C582.667,400,533.333,400,484,400C434.667,400,385.333,400,336,400C286.667,400,237.333,400,188,400C138.667,400,89.333,400,40,400Z"
                  ></path>
                  <path
                    stroke="#f87171"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="390"
                    class="recharts-curve recharts-area-curve"
                    d="M40,373.8C89.333,372.5,138.667,371.2,188,369.9C237.333,368.6,286.667,367.3,336,366C385.333,364.7,434.667,363.8,484,362.5C533.333,361.2,582.667,359.9,632,358.6C681.333,357.3,730.667,356.3,780,355C828.333,353.7,876.667,352.4,925,351.1C973.333,349.8,1021.667,348.5,1070,347"
                  ></path>
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
