import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const categoryData = [
  { name: "Food & Dining", value: 245, color: "hsl(var(--primary))" },
  { name: "Education", value: 180, color: "hsl(var(--accent))" },
  { name: "Transportation", value: 120, color: "hsl(var(--warning))" },
  { name: "Entertainment", value: 95, color: "hsl(var(--success))" },
  { name: "Shopping", value: 67, color: "hsl(var(--secondary))" },
  { name: "Other", value: 45, color: "hsl(var(--muted))" },
];

export const CategoryBreakdown = () => {
  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Category Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">This month's spending by category</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-soft)'
                }}
                formatter={(value: any) => [`$${value}`, 'Amount']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};