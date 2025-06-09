import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Calendar } from "lucide-react";

const PlatformOverview = () => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          className="bg-teal-500 text-white rounded-full px-4 py-1 text-sm"
        >
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
          <h3 className="text-lg font-semibold text-left pl-4">Platform Growth</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div
            className="w-full"
            style={{
              position: "relative",
              paddingBottom: "50%", // Increased for mobile visibility
            }}
          >
            <svg
              className="recharts-surface absolute top-0 left-0 w-full h-full"
              viewBox="0 0 600 450" // Increased viewBox for mobile
              preserveAspectRatio="xMidYMid meet"
            >
              <title></title>
              <desc></desc>
              <defs>
                <clipPath id="recharts51-clip">
                  <rect x="80" y="15" height="390" width="460"></rect>
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
                  width="460"
                  height="45"
                  x="80"
                  y="405"
                  className="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="80"
                  y1="405"
                  x2="540"
                  y2="405"
                ></line>
                <g className="recharts-cartesian-axis-ticks">
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="80"
                      y1="414"
                      x2="80"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="80"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="80" dy="0.71em">
                        Jan
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="152.857"
                      y1="414"
                      x2="152.857"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="152.857"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="152.857" dy="0.71em">
                        Feb
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="225.714"
                      y1="414"
                      x2="225.714"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="225.714"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="225.714" dy="0.71em">
                        Mar
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="298.571"
                      y1="414"
                      x2="298.571"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="298.571"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="298.571" dy="0.71em">
                        Apr
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="371.429"
                      y1="414"
                      x2="371.429"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="371.429"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="371.429" dy="0.71em">
                        May
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="444.286"
                      y1="414"
                      x2="444.286"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="444.286"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="444.286" dy="0.71em">
                        Jun
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="bottom"
                      width="460"
                      height="45"
                      x="80"
                      y="405"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="517.143"
                      y1="414"
                      x2="517.143"
                      y2="405"
                    ></line>
                    <text
                      orientation="bottom"
                      width="460"
                      height="45"
                      stroke="none"
                      x="517.143"
                      y="417"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="middle"
                      fill="#666"
                    >
                      <tspan x="517.143" dy="0.71em">
                        Jul
                      </tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                <line
                  orientation="left"
                  width="80"
                  height="390"
                  x="0"
                  y="15"
                  className="recharts-cartesian-axis-line"
                  stroke="#666"
                  fill="none"
                  x1="80"
                  y1="15"
                  x2="80"
                  y2="405"
                ></line>
                <g className="recharts-cartesian-axis-ticks">
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="80"
                      height="390"
                      x="0"
                      y="15"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="71"
                      y1="405"
                      x2="80"
                      y2="405"
                    ></line>
                    <text
                      orientation="left"
                      width="80"
                      height="390"
                      stroke="none"
                      x="68"
                      y="405"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="68" dy="0.355em">
                        0
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="80"
                      height="390"
                      x="0"
                      y="15"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="71"
                      y1="307.5"
                      x2="80"
                      y2="307.5"
                    ></line>
                    <text
                      orientation="left"
                      width="80"
                      height="390"
                      stroke="none"
                      x="68"
                      y="307.5"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="68" dy="0.355em">
                        2500
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="80"
                      height="390"
                      x="0"
                      y="15"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="71"
                      y1="210"
                      x2="80"
                      y2="210"
                    ></line>
                    <text
                      orientation="left"
                      width="80"
                      height="390"
                      stroke="none"
                      x="68"
                      y="210"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="68" dy="0.355em">
                        5000
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="80"
                      height="390"
                      x="0"
                      y="15"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="71"
                      y1="112.5"
                      x2="80"
                      y2="112.5"
                    ></line>
                    <text
                      orientation="left"
                      width="80"
                      height="390"
                      stroke="none"
                      x="68"
                      y="112.5"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="68" dy="0.355em">
                        7500
                      </tspan>
                    </text>
                  </g>
                  <g className="recharts-layer recharts-cartesian-axis-tick">
                    <line
                      orientation="left"
                      width="80"
                      height="390"
                      x="0"
                      y="15"
                      className="recharts-cartesian-axis-tick-line"
                      stroke="#666"
                      fill="none"
                      x1="71"
                      y1="15"
                      x2="80"
                      y2="15"
                    ></line>
                    <text
                      orientation="left"
                      width="80"
                      height="390"
                      stroke="none"
                      x="68"
                      y="15"
                      className="recharts-text recharts-cartesian-axis-tick-value"
                      text-anchor="end"
                      fill="#666"
                    >
                      <tspan x="68" dy="0.355em">
                        10000
                      </tspan>
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
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="80"
                    y1="405"
                    x2="540"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="80"
                    y1="307.5"
                    x2="540"
                    y2="307.5"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="80"
                    y1="210"
                    x2="540"
                    y2="210"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="80"
                    y1="112.5"
                    x2="540"
                    y2="112.5"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="80"
                    y1="15"
                    x2="540"
                    y2="15"
                  ></line>
                </g>
                <g className="recharts-cartesian-grid-vertical">
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="80"
                    y1="15"
                    x2="80"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="152.857"
                    y1="15"
                    x2="152.857"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="225.714"
                    y1="15"
                    x2="225.714"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="298.571"
                    y1="15"
                    x2="298.571"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="371.429"
                    y1="15"
                    x2="371.429"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="444.286"
                    y1="15"
                    x2="444.286"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="517.143"
                    y1="15"
                    x2="517.143"
                    y2="405"
                  ></line>
                  <line
                    stroke-dasharray="3 3"
                    stroke="#ccc"
                    fill="none"
                    x="80"
                    y="15"
                    width="460"
                    height="390"
                    x1="540"
                    y1="15"
                    x2="540"
                    y2="405"
                  ></line>
                </g>
              </g>
              <g className="recharts-layer recharts-area">
                <g className="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorUsers)"
                    width="460"
                    height="390"
                    stroke="none"
                    className="recharts-curve recharts-area-area"
                    d="M80,249C99.143,236,118.286,223,137.429,210C156.572,197,175.714,184,194.857,171C214,158,233.143,145,252.286,132C271.429,119,290.571,106,309.714,93C328.857,80,348,67,367.143,54C386.286,41,405.429,28,424.571,15C443.714,2,462.857,-11,482,15L482,405C462.857,405,443.714,405,424.571,405C405.429,405,386.286,405,367.143,405C348,405,328.857,405,309.714,405C290.571,405,271.429,405,252.286,405C233.143,405,214,405,194.857,405C175.714,405,156.572,405,137.429,405C118.286,405,99.143,405,80,405Z"
                  ></path>
                  <path
                    stroke="#1FBAB4"
                    fill-opacity="1"
                    fill="none"
                    width="460"
                    height="390"
                    className="recharts-curve recharts-area-curve"
                    d="M80,249C99.143,236,118.286,223,137.429,210C156.572,197,175.714,184,194.857,171C214,158,233.143,145,252.286,132C271.429,119,290.571,106,309.714,93C328.857,80,348,67,367.143,54C386.286,41,405.429,28,424.571,15C443.714,2,462.857,-11,482,15"
                  ></path>
                </g>
              </g>
              <g className="recharts-layer recharts-area">
                <g className="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorMatches)"
                    width="460"
                    height="390"
                    stroke="none"
                    className="recharts-curve recharts-area-area"
                    d="M80,311.4C99.143,306.2,118.286,301,137.429,295.8C156.572,290.6,175.714,285.4,194.857,280.2C214,275,233.143,269.5,252.286,264.6C271.429,259.7,290.571,256.4,309.714,253.2C328.857,250,348,247.525,367.143,244.8C386.286,242.075,405.429,239.35,424.571,236.7C443.714,234.05,462.857,231.4,482,225L482,405C462.857,405,443.714,405,424.571,405C405.429,405,386.286,405,367.143,405C348,405,328.857,405,309.714,405C290.571,405,271.429,405,252.286,405C233.143,405,214,405,194.857,405C175.714,405,156.572,405,137.429,405C118.286,405,99.143,405,80,405Z"
                  ></path>
                  <path
                    stroke="#FF9500"
                    fill-opacity="1"
                    fill="none"
                    width="460"
                    height="390"
                    className="recharts-curve recharts-area-curve"
                    d="M80,311.4C99.143,306.2,118.286,301,137.429,295.8C156.572,290.6,175.714,285.4,194.857,280.2C214,275,233.143,269.5,252.286,264.6C271.429,259.7,290.571,256.4,309.714,253.2C328.857,250,348,247.525,367.143,244.8C386.286,242.075,405.429,239.35,424.571,236.7C443.714,234.05,462.857,231.4,482,225"
                  ></path>
                </g>
              </g>
              <g className="recharts-layer recharts-area">
                <g className="recharts-layer">
                  <path
                    fill-opacity="1"
                    fill="url(#colorEvents)"
                    width="460"
                    height="390"
                    stroke="none"
                    className="recharts-curve recharts-area-area"
                    d="M80,373.8C99.143,372.5,118.286,371.2,137.429,369.9C156.572,368.6,175.714,367.3,194.857,366C214,364.7,233.143,363.4,252.286,362.1C271.429,360.8,290.571,359.15,309.714,357.9C328.857,356.65,348,356,367.143,355.35C386.286,354.7,405.429,353.35,424.571,351.6C443.714,349.85,462.857,348.1,482,343.5L482,405C462.857,405,443.714,405,424.571,405C405.429,405,386.286,405,367.143,405C348,405,328.857,405,309.714,405C290.571,405,271.429,405,252.286,405C233.143,405,214,405,194.857,405C175.714,405,156.572,405,137.429,405C118.286,405,99.143,405,80,405Z"
                  ></path>
                  <path
                    stroke="#f87171"
                    fill-opacity="1"
                    fill="none"
                    width="460"
                    height="390"
                    className="recharts-curve recharts-area-curve"
                    d="M80,373.8C99.143,372.5,118.286,371.2,137.429,369.9C156.572,368.6,175.714,367.3,194.857,366C214,364.7,233.143,363.4,252.286,362.1C271.429,360.8,290.571,359.15,309.714,357.9C328.857,356.65,348,356,367.143,355.35C386.286,354.7,405.429,353.35,424.571,351.6C443.714,349.85,462.857,348.1,482,343.5"
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
