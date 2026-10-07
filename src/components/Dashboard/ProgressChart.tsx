import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { BaseChart } from "@/components/Charts/BaseChart";
import { ChartDataPoint } from "@/types/chart";

const data: ChartDataPoint[] = [
  { name: "Mon", progress: 65 },
  { name: "Tue", progress: 59 },
  { name: "Wed", progress: 80 },
  { name: "Thu", progress: 81 },
  { name: "Fri", progress: 56 },
  { name: "Sat", progress: 40 },
  { name: "Sun", progress: 30 },
];

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</p>
        <p className="text-sm font-mono">
          <span className="inline-block w-3 h-3 rounded-sm bg-sky-500 mr-2"></span>
          <span className="font-medium text-sky-600 dark:text-sky-400">{payload[0].value}</span>
          <span className="text-gray-500 dark:text-gray-400"> points</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ProgressChart() {
  return (
    <BaseChart 
      title="Weekly Progress"
      description="Your study hours and engagement this week"
      className="col-span-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }} />
          <Bar
            dataKey="progress"
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
            className="animate-fade-in"
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity={1} />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
}
