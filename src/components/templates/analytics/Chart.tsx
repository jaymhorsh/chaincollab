"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { name: "APR", pv: 24000 },
  { name: "MAY", pv: 39800 },
  { name: "JUN", pv: 58000 },
  { name: "JUL", pv: 69000 },
  { name: "AUG", pv: 75000 },
  { name: "SEP", pv: 86000 },
  { name: "OCT", pv: 91000 },
  { name: "NOV", pv: 103000 },
  { name: "DEC", pv: 120000 },
]

export function ChartComponent() {
  return (
    <Card className="w-[930px] h-[500px] overflow-hidden rounded-md border border-[#DFE0E1]">
      <CardHeader>
        <CardTitle>Watch time distribution</CardTitle>
        <CardDescription>April - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[20000, 120000]}
              ticks={[20000, 40000, 60000, 80000, 100000, 120000]}
              tickFormatter={(value) => (value === 120000 ? "120k" : value.toLocaleString())}
            />
            <Tooltip />
            <Legend />
            {/* Changed the bar color to #3351FF */}
            <Bar dataKey="Time Distribution" fill="#3351FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
