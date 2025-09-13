import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Target, PlusCircle, Calendar, DollarSign, TrendingUp, Award, Zap } from "lucide-react";

const mockGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build a safety net for unexpected expenses",
    targetAmount: 5000,
    currentAmount: 2450.75,
    deadline: "2024-12-31",
    category: "Savings",
    priority: "High"
  },
  {
    id: 2,
    title: "New Laptop",
    description: "Save for a MacBook Pro for programming",
    targetAmount: 2500,
    currentAmount: 800,
    deadline: "2024-06-15",
    category: "Education",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Spring Break Trip",
    description: "Fun trip with friends to celebrate semester end",
    targetAmount: 1200,
    currentAmount: 650,
    deadline: "2024-03-15",
    category: "Travel",
    priority: "Low"
  },
  {
    id: 4,
    title: "Reduce Dining Out",
    description: "Limit restaurant expenses to $150/month",
    targetAmount: 150,
    currentAmount: 95,
    deadline: "2024-01-31",
    category: "Budget",
    priority: "High"
  }
];

export const Goals = () => {
  const { toast } = useToast();
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetAmount: "",
    deadline: "",
    category: "Savings"
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Goal Created!",
      description: `Your goal "${newGoal.title}" has been added successfully.`,
    });

    setNewGoal({
      title: "",
      description: "",
      targetAmount: "",
      deadline: "",
      category: "Savings"
    });
    setShowNewGoalForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive";
      case "Medium": return "bg-warning";
      case "Low": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 50) return "bg-warning";
    return "bg-primary";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Financial Goals</h2>
          <p className="text-muted-foreground">Track and achieve your financial objectives</p>
        </div>
        <Button 
          onClick={() => setShowNewGoalForm(true)}
          className="bg-gradient-primary hover:shadow-medium transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* New Goal Form */}
      {showNewGoalForm && (
        <Card className="bg-gradient-card shadow-medium border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Create New Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalTitle">Goal Title *</Label>
                  <Input
                    id="goalTitle"
                    placeholder="e.g., Emergency Fund"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount *</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="5000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What is this goal for?"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Savings, Education, Travel..."
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewGoalForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">
                  Create Goal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={goal.id} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">{goal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  </div>
                  <Badge className={`${getPriorityColor(goal.priority)} text-white`}>
                    {goal.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-success font-semibold">${goal.currentAmount.toFixed(2)}</span>
                    <span className="text-muted-foreground">of ${goal.targetAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Days left</p>
                      <p className="text-sm font-medium">{daysLeft > 0 ? daysLeft : 'Overdue'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="text-sm font-medium">${(goal.targetAmount - goal.currentAmount).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Add Progress
                  </Button>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-primary text-white shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Goal Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-4 w-4" />
              <p className="text-sm font-medium">Achievement Alert</p>
            </div>
            <p className="text-xs opacity-90">You're 49% towards your Emergency Fund goal! Keep up the great work.</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4" />
              <p className="text-sm font-medium">Optimization Tip</p>
            </div>
            <p className="text-xs opacity-90">To reach your laptop goal by June, try saving an extra $85 per month. Consider reducing dining out expenses.</p>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4" />
              <p className="text-sm font-medium">Priority Suggestion</p>
            </div>
            <p className="text-xs opacity-90">Focus on your Emergency Fund first - it's your highest priority and you're making excellent progress!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};