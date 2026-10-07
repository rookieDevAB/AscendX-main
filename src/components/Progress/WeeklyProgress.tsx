import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { BaseChart } from "@/components/Charts/BaseChart";
import { ChartDataPoint } from "@/types/chart";

const data: ChartDataPoint[] = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 2.8 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 0.9 },
];

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</p>
        <p className="text-sm font-mono">
          <span className="inline-block w-3 h-3 rounded-sm bg-purple-500 mr-2"></span>
          <span className="font-medium text-purple-600 dark:text-purple-400">{payload[0].value}</span>
          <span className="text-gray-500 dark:text-gray-400"> hours</span>
        </p>
      </div>
    );
  }
  return null;
};

export function WeeklyProgress() {
  return (
    <BaseChart 
      title="Weekly Study Hours" 
      description="Hours spent studying each day this week"
      height={350}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="day"
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
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
          <Bar dataKey="hours" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
}
