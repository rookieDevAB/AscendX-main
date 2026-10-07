import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";
import { BaseChart } from "@/components/Charts/BaseChart";
import { ChartDataPoint } from "@/types/chart";

const data: ChartDataPoint[] = [
  { subject: "Reading", score: 85, fullMark: 100 },
  { subject: "Writing", score: 70, fullMark: 100 },
  { subject: "Listening", score: 90, fullMark: 100 },
  { subject: "Speaking", score: 65, fullMark: 100 },
  { subject: "Grammar", score: 75, fullMark: 100 },
  { subject: "Vocabulary", score: 80, fullMark: 100 },
];

export function ProficiencyRadar() {
  return (
    <BaseChart 
      title="Proficiency Radar"
      description="Your skill levels across different areas"
      className="col-span-3"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Your Skills"
            dataKey="score"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
}
