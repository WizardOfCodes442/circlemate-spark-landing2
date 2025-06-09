import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronUp, Calendar, Heart } from "lucide-react";

const PlatformOverview = () => {
  return (
    <>
      
      
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
                  <rect x="60" y="10" height="390" width="480"></rect>
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
                  x="60"
                  y="400"
                  class="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="60"
                  y1="400"
                  x2="540"
                  y2="400"
                ></line>
                <g class="recharts-cartesian-axis-ticks">
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="60"
                      y1="406"
                      x2="60"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="60"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="60" dy="0.71em">Jan</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="132"
                      y1="406"
                      x2="132"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="132"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="132" dy="0.71em">Feb</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="204"
                      y1="406"
                      x2="204"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="204"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="204" dy="0.71em">Mar</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="276"
                      y1="406"
                      x2="276"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="276"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="276" dy="0.71em">Apr</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="348"
                      y1="406"
                      x2="348"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="348"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="348" dy="0.71em">May</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="420"
                      y1="406"
                      x2="420"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="420"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="420" dy="0.71em">Jun</tspan>
                    </text>
                  </g>
                  <g class="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="400"
                      class="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="492"
                      y1="406"
                      x2="492"
                      y2="400"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="492"
                      y="408"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="492" dy="0.71em">Jul</tspan>
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
                  x1="60"
                  y1="10"
                  x2="60"
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
                      x1="54"
                      y1="400"
                      x2="60"
                      y2="400"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="52"
                      y="400"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">0</tspan>
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
                      x1="54"
                      y1="300"
                      x2="60"
                      y2="300"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="52"
                      y="300"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">2500</tspan>
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
                      x1="54"
                      y1="200"
                      x2="60"
                      y2="200"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="52"
                      y="200"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">5000</tspan>
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
                      x1="54"
                      y1="100"
                      x2="60"
                      y2="100"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="52"
                      y="100"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">7500</tspan>
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
                      x1="54"
                      y1="0"
                      x2="60"
                      y2="0"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="390"
                      stroke="none"
                      x="52"
                      y="0"
                      class="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">10000</tspan>
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
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="60"
                    y1="400"
                    x2="540"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="60"
                    y1="300"
                    x2="540"
                    y2="300"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="60"
                    y1="200"
                    x2="540"
                    y2="200"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="60"
                    y1="100"
                    x2="540"
                    y2="100"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="60"
                    y1="0"
                    x2="540"
                    y2="0"
                  ></line>
                </g>
                <g class="recharts-cartesian-grid-vertical">
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="60"
                    y1="10"
                    x2="60"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="132"
                    y1="10"
                    x2="132"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="204"
                    y1="10"
                    x2="204"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="276"
                    y1="10"
                    x2="276"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="348"
                    y1="10"
                    x2="348"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="420"
                    y1="10"
                    x2="420"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="492"
                    y1="10"
                    x2="492"
                    y2="400"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="390"
                    x1="540"
                    y1="10"
                    x2="540"
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
                    d="M60,249C109.333,235.667,158.667,222.333,208,209C257.333,195.667,306.667,182.333,356,169C405.333,155.667,454.667,142.333,504,129C553.333,115.667,602.667,102.333,652,89C701.333,75.667,750.667,62.333,800,49C848.333,35.667,896.667,22.333,945,9C993.333,-4.333,1041.667,-17.667,1090,10L1090,400C1041.667,400,993.333,400,945,400C896.667,400,848.333,400,800,400C750.667,400,701.333,400,652,400C602.667,400,553.333,400,504,400C454.667,400,405.333,400,356,400C306.667,400,257.333,400,208,400C158.667,400,109.333,400,60,400Z"
                  ></path>
                  <path
                    stroke="#1FBAB4"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="390"
                    class="recharts-curve recharts-area-curve"
                    d="M60,249C109.333,235.667,158.667,222.333,208,209C257.333,195.667,306.667,182.333,356,169C405.333,155.667,454.667,142.333,504,129C553.333,115.667,602.667,102.333,652,89C701.333,75.667,750.667,62.333,800,49C848.333,35.667,896.667,22.333,945,9C993.333,-4.333,1041.667,-17.667,1090,10"
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
                    d="M60,311.4C109.333,306.2,158.667,301,208,295.8C257.333,290.6,306.667,285.4,356,280.2C405.333,275,454.667,270.6,504,266.2C553.333,261.8,602.667,258.4,652,255C701.333,251.6,750.667,248.8,800,246C848.333,243.2,896.667,240.4,945,237.6C993.333,234.8,1041.667,232,1090,225L1090,400C1041.667,400,993.333,400,945,400C896.667,400,848.333,400,800,400C750.667,400,701.333,400,652,400C602.667,400,553.333,400,504,400C454.667,400,405.333,400,356,400C306.667,400,257.333,400,208,400C158.667,400,109.333,400,60,400Z"
                  ></path>
                  <path
                    stroke="#FF9500"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="390"
                    class="recharts-curve recharts-area-curve"
                    d="M60,311.4C109.333,306.2,158.667,301,208,295.8C257.333,290.6,306.667,285.4,356,280.2C405.333,275,454.667,270.6,504,266.2C553.333,261.8,602.667,258.4,652,255C701.333,251.6,750.667,248.8,800,246C848.333,243.2,896.667,240.4,945,237.6C993.333,234.8,1041.667,232,1090,225"
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
                    d="M60,373.8C109.333,372.5,158.667,371.2,208,369.9C257.333,368.6,306.667,367.3,356,366C405.333,364.7,454.667,363.8,504,362.5C553.333,361.2,602.667,359.9,652,358.6C701.333,357.3,750.667,356.3,800,355C848.333,353.7,896.667,352.4,945,351.1C993.333,349.8,1041.667,348.5,1090,347L1090,400C1041.667,400,993.333,400,945,400C896.667,400,848.333,400,800,400C750.667,400,701.333,400,652,400C602.667,400,553.333,400,504,400C454.667,400,405.333,400,356,400C306.667,400,257.333,400,208,400C158.667,400,109.333,400,60,400Z"
                  ></path>
                  <path
                    stroke="#f87171"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="390"
                    class="recharts-curve recharts-area-curve"
                    d="M60,373.8C109.333,372.5,158.667,371.2,208,369.9C257.333,368.6,306.667,367.3,356,366C405.333,364.7,454.667,363.8,504,362.5C553.333,361.2,602.667,359.9,652,358.6C701.333,357.3,750.667,356.3,800,355C848.333,353.7,896.667,352.4,945,351.1C993.333,349.8,1041.667,348.5,1090,347"
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
