import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Calendar } from "lucide-react";

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
        <CardHeader className="p-4 pl-4">
          <h3 className="text-lg font-semibold text-left">Platform Growth</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="w-full" style={{ position: 'relative', paddingBottom: '40%' }}>
            <svg
              className="recharts-surface absolute top-0 left-0"
              width="100%"
              height="100%"
              viewBox="0 0 600 400" // Increased viewBox width for desktop, height for mobile
              preserveAspectRatio="xMidYMid meet"
            >
              <title></title>
              <desc></desc>
              <defs>
                <clipPath id="recharts51-clip">
                  <rect x="60" y="10" height="360" width="480"></rect> {/* Adjusted for larger SVG */}
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
              <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                <line
                  orientation="bottom"
                  width="480"
                  height="30"
                  x="60"
                  y="370"
                  className="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="60"
                  y1="370"
                  x2="540"
                  y2="370"
                ></line>
                <g className="recharts-cartesian-axis-ticks">
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="60"
                      y1="376"
                      x2="60"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="60"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="60" dy="0.71em">Jan</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="132"
                      y1="376"
                      x2="132"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="132"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="132" dy="0.71em">Feb</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="204"
                      y1="376"
                      x2="204"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="204"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="204" dy="0.71em">Mar</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="276"
                      y1="376"
                      x2="276"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="276"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="276" dy="0.71em">Apr</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="348"
                      y1="376"
                      x2="348"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="348"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="348" dy="0.71em">May</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="420"
                      y1="376"
                      x2="420"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="420"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="420" dy="0.71em">Jun</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="480"
                      height="30"
                      x="60"
                      y="370"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="492"
                      y1="376"
                      x2="492"
                      y2="370"
                    ></line>
                    <text
                      orientation="bottom"
                      width="480"
                      height="30"
                      stroke="none"
                      x="492"
                      y="378"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="492" dy="0.71em">Jul</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                <line
                  orientation="left"
                  width="60"
                  height="360"
                  x="0"
                  y="10"
                  className="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="60"
                  y1="10"
                  x2="60"
                  y2="370"
                ></line>
                <g className="recharts-cartesian-axis-ticks">
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="360"
                      x="0"
                      y="10"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="54"
                      y1="370"
                      x2="60"
                      y2="370"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="360"
                      stroke="none"
                      x="52"
                      y="370"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">0</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="360"
                      x="0"
                      y="10"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="54"
                      y1="280"
                      x2="60"
                      y2="280"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="360"
                      stroke="none"
                      x="52"
                      y="280"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">2500</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="360"
                      x="0"
                      y="10"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="54"
                      y1="190"
                      x2="60"
                      y2="190"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="360"
                      stroke="none"
                      x="52"
                      y="190"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">5000</tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="360"
                      x="0"
                      y="10"
                      className="recharts-cartesian-axis-tick-line"
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
                      height="360"
                      stroke="none"
                      x="52"
                      y="100"
                      className="recharts-text recharts-cartesian！

                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="60"
                      height="360"
                      x="0"
                      y="10"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="54"
                      y1="10"
                      x2="60"
                      y2="10"
                    ></line>
                    <text
                      orientation="left"
                      width="60"
                      height="360"
                      stroke="none"
                      x="52"
                      y="10"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="52" dy="0.355em">10000</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g className="recharts-cartesian-grid">
                <g className="recharts-cartesian-grid-horizontal">
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="60"
                    y1="370"
                    x2="540"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="60"
                    y1="280"
                    x2="540"
                    y2="280"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="60"
                    y1="190"
                    x2="540"
                    y2="190"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
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
                    height="360"
                    x1="60"
                    y1="10"
                    x2="540"
                    y2="10"
                  ></line>
                </g>
                <g className="recharts-cartesian-grid-vertical">
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="60"
                    y1="10"
                    x2="60"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="132"
                    y1="10"
                    x2="132"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="204"
                    y1="10"
                    x2="204"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="276"
                    y1="10"
                    x2="276"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="348"
                    y1="10"
                    x2="348"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="420"
                    y1="10"
                    x2="420"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="492"
                    y1="10"
                    x2="492"
                    y2="370"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="60"
                    y="10"
                    width="480"
                    height="360"
                    x1="540"
                    y1="10"
                    x2="540"
                    y2="370"
                  ></line>
                </g>
              </g>
              <g className="recharts-layer recharts-area">
                <g className="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorUsers)"
                    width="480"
                    height="360"
                    stroke="none"
                    className="recharts-curve recharts-area-area"
                    d="M60,230C80,220,100,210,132,200C164,190,196,180,228,170C260,160,292,150,324,140C356,130,388,120,420,110C452,100,484,90,516,80C548,70,580,60,600,50L600,370C580,370,548,370,516,370C484,370,452,370,420,370C388,370,356,370,324,370C292,370,260,370,228,370C196,370,164,370,132,370C100,370,80,370,60,370Z"
                  ></path>
                  <path
                    stroke="#1FBAB4"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="360"
                    className="recharts-curve recharts-area-curve"
                    d="M60,230C80,220,100,210,132,200C164,190,196,180,228,170C260,160,292,150,324,140C356,130,388,120,420,110C452,100,484,90,516,80C548,70,580,60,600,50"
                  ></path>
                </g>
              </g>
              <g className="recharts-layer recharts-area">
                <g className="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorMatches)"
                    width="480"
                    height="360"
                    stroke="none"
                    className="recharts-curve recharts-area-area"
                    d="M60,280C80,275,100,270,132,265C164,260,196,255,228,250C260,245,292,240,324,235C356,230,388,225,420,220C452,215,484,210,516,205C548,200,580,195,600,190L600,370C580,370,548,370,516,370C484,370,452,370,420,370C388,370,356,370,324,370C292,370,260,370,228,370C196,370,164,370,132,370C100,370,80,370,60,370Z"
                  ></path>
                  <path
                    stroke="#FF9500"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="360"
                    className="recharts-curve recharts-area-curve"
                    d="M60,280C80,275,100,270,132,265C164,260,196,255,228,250C260,245,292,240,324,235C356,230,388,225,420,220C452,215,484,210,516,205C548,200,580,195,600,190"
                  ></path>
                </g>
              </g>
              <g className="recharts-layer recharts-area">
                <g className="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorEvents)"
                    width="480"
                    height="360"
                    stroke="none"
                    className="recharts-curve recharts-area-area"
                    d="M60,340C80,338,100,336,132,334C164,332,196,330,228,328C260,326,292,324,324,322C356,320,388,318,420,316C452,314,484,312,516,310C548,308,580,306,600,304L600,370C580,370,548,370,516,370C484,370,452,370,420,370C388,370,356,370,324,370C292,370,260,370,228,370C196,370,164,370,132,370C100,370,80,370,60,370Z"
                  ></path>
                  <path
                    stroke="#f87171"
                    fill-opacity="1"
                    fill="none"
                    width="480"
                    height="360"
                    className="recharts-curve recharts-area-curve"
                    d="M60,340C80,338,100,336,132,334C164,332,196,330,228,328C260,326,292,324,324,322C356,320,388,318,420,316C452,314,484,312,516,310C548,308,580,306,600,304"
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