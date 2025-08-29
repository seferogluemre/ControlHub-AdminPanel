import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const projectData = [
  {
    name: "Jan",
    completed: 12,
    ongoing: 8,
    planned: 5,
  },
  {
    name: "Feb",
    completed: 15,
    ongoing: 10,
    planned: 7,
  },
  {
    name: "Mar",
    completed: 18,
    ongoing: 12,
    planned: 6,
  },
  {
    name: "Apr",
    completed: 22,
    ongoing: 9,
    planned: 8,
  },
  {
    name: "May",
    completed: 19,
    ongoing: 14,
    planned: 9,
  },
  {
    name: "Jun",
    completed: 25,
    ongoing: 11,
    planned: 7,
  },
  {
    name: "Jul",
    completed: 28,
    ongoing: 15,
    planned: 10,
  },
  {
    name: "Aug",
    completed: 24,
    ongoing: 13,
    planned: 8,
  },
  {
    name: "Sep",
    completed: 31,
    ongoing: 16,
    planned: 11,
  },
  {
    name: "Oct",
    completed: 27,
    ongoing: 12,
    planned: 9,
  },
  {
    name: "Nov",
    completed: 33,
    ongoing: 18,
    planned: 12,
  },
  {
    name: "Dec",
    completed: 29,
    ongoing: 14,
    planned: 10,
  },
];

export function ProjectOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={projectData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} name="Completed" />
        <Bar dataKey="ongoing" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} name="Ongoing" />
        <Bar dataKey="planned" fill="hsl(var(--muted))" radius={[2, 2, 0, 0]} name="Planned" />
      </BarChart>
    </ResponsiveContainer>
  );
}
