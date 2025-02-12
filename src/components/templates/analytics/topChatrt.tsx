"use client"

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const rangeData = [
  { day: "APR", min: 24000 },
  { day: "MAY", min: 39800 },
  { day: "JUN", min: 58000 },
  { day: "JUL", min: 45000 },
  { day: "AUG", min: 50000 },
  { day: "SEP", min: 32000 },
  { day: "OCT", min: 41000 },
  { day: "NOV", min: 53000 },
  { day: "DEC", min: 60000 },
]

export function TopChart() {
  return (
    <Card className="w-[930px] h-[500px] overflow-hidden border border-[#DFE0E1]">
      <CardHeader>
        <CardTitle>View Trend</CardTitle>
        {/* <CardDescription>Temperature fluctuations over time</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={rangeData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[10000, 60000]}
              ticks={[10000, 20000, 30000, 40000, 50000, 60000]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip />
            <Legend />
            {/* Min Temperature */}
            <Area type="monotone" dataKey="min" stroke="#3351FF" fill="#3351FF66" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}