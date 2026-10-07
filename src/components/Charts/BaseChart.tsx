import React, { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BaseChartProps {
  title: string;
  description?: string;
  children: ReactElement;
  height?: number;
  className?: string;
}

export function BaseChart({ title, description, children, height = 350, className }: BaseChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div style={{ height: height, width: "100%" }}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
