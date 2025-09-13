import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, CreditCard, PiggyBank } from "lucide-react";
import { ExpenseChart } from "./ExpenseChart";
import { CategoryBreakdown } from "./CategoryBreakdown";

// Mock data for demo
const mockData = {
  totalBalance: 2450.75,
  monthlyIncome: 1200,
  monthlyExpenses: 987.50,
  savingsGoal: 5000,
  currentSavings: 2450.75,
  recentExpenses: [
    { id: 1, description: "Coffee Shop", amount: 4.50, category: "Food & Dining", date: "2024-01-15", type: "expense" },
    { id: 2, description: "Textbook", amount: 89.99, category: "Education", date: "2024-01-14", type: "expense" },
    { id: 3, description: "Part-time Job", amount: 300, category: "Income", date: "2024-01-13", type: "income" },
    { id: 4, description: "Grocery Store", amount: 67.23, category: "Food & Dining", date: "2024-01-12", type: "expense" },
  ],
  budgets: [
    { category: "Food & Dining", spent: 245, budget: 300, color: "bg-primary" },
    { category: "Education", spent: 180, budget: 200, color: "bg-accent" },
    { category: "Entertainment", spent: 95, budget: 150, color: "bg-warning" },
    { category: "Transportation", spent: 120, budget: 100, color: "bg-destructive" },
  ],
  predictedSpending: 1050,
  spendingTrend: 12.5
};

export const Dashboard = () => {
  const savingsProgress = (mockData.currentSavings / mockData.savingsGoal) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${mockData.totalBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${mockData.monthlyIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${mockData.monthlyExpenses.toFixed(2)}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-destructive mr-1" />
              <span className="text-destructive">+{mockData.spendingTrend}%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{savingsProgress.toFixed(0)}%</div>
            <Progress value={savingsProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">${mockData.currentSavings.toFixed(2)} of ${mockData.savingsGoal.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <CategoryBreakdown />
      </div>

      {/* Budget Tracking & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Tracking */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Budget Tracking</CardTitle>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.budgets.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">${budget.spent}/${budget.budget}</span>
                    {budget.spent > budget.budget && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={(budget.spent / budget.budget) * 100} 
                  className="h-2"
                />
                {budget.spent > budget.budget && (
                  <p className="text-xs text-destructive">Over budget by ${(budget.spent - budget.budget).toFixed(2)}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${expense.type === 'income' ? 'text-success' : 'text-foreground'}`}>
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </p>
                    <Badge variant={expense.type === 'income' ? 'default' : 'secondary'} className="text-xs">
                      {expense.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-primary text-white shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <PiggyBank className="h-5 w-5 mr-2" />
            AI Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm font-medium">💡 Spending Prediction</p>
            <p className="text-xs opacity-90">Based on your patterns, you're likely to spend ${mockData.predictedSpending} this month. Consider reducing dining out to stay under budget.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm font-medium">🎯 Goal Recommendation</p>
            <p className="text-xs opacity-90">You're {savingsProgress.toFixed(0)}% toward your savings goal! Try saving an extra $50/week to reach it 2 months earlier.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm font-medium">⚠️ Budget Alert</p>
            <p className="text-xs opacity-90">Transportation spending is 20% over budget. Consider using student discounts or carpooling to reduce costs.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};