import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  DollarSign,
  PieChart as PieChartIcon,
  BarChart3,
  Brain,
  AlertCircle
} from "lucide-react";

const monthlyData = [
  { month: "Aug", income: 1100, expenses: 950, savings: 150 },
  { month: "Sep", income: 1200, expenses: 850, savings: 350 },
  { month: "Oct", income: 1150, expenses: 920, savings: 230 },
  { month: "Nov", income: 1300, expenses: 1050, savings: 250 },
  { month: "Dec", income: 1200, expenses: 980, savings: 220 },
  { month: "Jan", income: 1200, expenses: 987, savings: 213 },
];

const weeklySpending = [
  { week: "Week 1", amount: 245 },
  { week: "Week 2", amount: 189 },
  { week: "Week 3", amount: 312 },
  { week: "Week 4", amount: 241 },
];

const categoryTrends = [
  { category: "Food & Dining", thisMonth: 245, lastMonth: 198, trend: 23.7 },
  { category: "Education", thisMonth: 180, lastMonth: 220, trend: -18.2 },
  { category: "Transportation", thisMonth: 120, lastMonth: 95, trend: 26.3 },
  { category: "Entertainment", thisMonth: 95, lastMonth: 140, trend: -32.1 },
];

const predictions = [
  { month: "Feb", predicted: 1025, confidence: 87 },
  { month: "Mar", predicted: 1150, confidence: 82 },
  { month: "Apr", predicted: 980, confidence: 78 },
];

export const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Predictive Analytics</h2>
          <p className="text-muted-foreground">AI-powered insights into your financial patterns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 Months
          </Button>
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Monthly Spend</p>
                <p className="text-2xl font-bold text-foreground">$954</p>
                <div className="flex items-center text-xs mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">2.3% vs last period</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Savings Rate</p>
                <p className="text-2xl font-bold text-success">17.8%</p>
                <div className="flex items-center text-xs mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">Excellent</span>
                </div>
              </div>
              <PieChartIcon className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Variance</p>
                <p className="text-2xl font-bold text-warning">-$87</p>
                <div className="flex items-center text-xs mt-1">
                  <TrendingDown className="h-3 w-3 text-warning mr-1" />
                  <span className="text-warning">Over budget</span>
                </div>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prediction Score</p>
                <p className="text-2xl font-bold text-accent">85%</p>
                <div className="flex items-center text-xs mt-1">
                  <Brain className="h-3 w-3 text-accent mr-1" />
                  <span className="text-accent">High accuracy</span>
                </div>
              </div>
              <Brain className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Income vs Expenses Trend</CardTitle>
            <p className="text-sm text-muted-foreground">6-month financial overview</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    formatter={(value: any, name: string) => [`$${value}`, name === 'income' ? 'Income' : name === 'expenses' ? 'Expenses' : 'Savings']}
                  />
                  <Area type="monotone" dataKey="income" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Spending Pattern */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Spending Pattern</CardTitle>
            <p className="text-sm text-muted-foreground">Current month breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySpending}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    formatter={(value: any) => [`$${value}`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Analysis & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Trends */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Category Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Month-over-month changes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTrends.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{category.category}</p>
                    <p className="text-xs text-muted-foreground">
                      ${category.thisMonth} this month vs ${category.lastMonth} last month
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={category.trend > 0 ? "destructive" : "default"}
                      className={category.trend > 0 ? "bg-destructive" : "bg-success"}
                    >
                      {category.trend > 0 ? '+' : ''}{category.trend.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Predictions */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spending Predictions</CardTitle>
            <p className="text-sm text-muted-foreground">AI-powered forecasts</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{prediction.month} 2024</p>
                    <p className="text-xs text-muted-foreground">
                      Predicted spending: ${prediction.predicted}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-accent">{prediction.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-primary">AI Insight</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your spending patterns show increased activity during the third week of each month. 
                  Consider budgeting extra buffer during this period.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Score */}
      <Card className="bg-gradient-primary text-white shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Financial Health Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">B+</p>
              <p className="text-sm opacity-90">Overall Score</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm opacity-90">Budget Adherence</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">92%</p>
              <p className="text-sm opacity-90">Goal Progress</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm font-medium mb-1">💪 Strengths</p>
              <p className="text-xs opacity-90">Excellent savings rate and consistent goal progress. Your emergency fund is building steadily.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm font-medium mb-1">⚠️ Areas for Improvement</p>
              <p className="text-xs opacity-90">Food & dining expenses increased 24% this month. Consider meal planning to reduce costs.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm font-medium mb-1">🎯 Next Steps</p>
              <p className="text-xs opacity-90">Focus on maintaining your savings rate while optimizing variable expenses. You're on track for financial success!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};