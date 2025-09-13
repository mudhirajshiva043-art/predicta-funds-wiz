import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, DollarSign, Calendar, Tag, FileText, Sparkles } from "lucide-react";

const categories = [
  "Food & Dining",
  "Education",
  "Transportation", 
  "Entertainment",
  "Shopping",
  "Health & Fitness",
  "Bills & Utilities",
  "Other"
];

const aiSuggestions = [
  { description: "Coffee at campus café", amount: 4.50, category: "Food & Dining" },
  { description: "Bus pass monthly", amount: 45.00, category: "Transportation" },
  { description: "Textbook rental", amount: 89.99, category: "Education" },
  { description: "Movie ticket", amount: 12.50, category: "Entertainment" },
];

export const ExpenseForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Expense Added Successfully!",
      description: `$${formData.amount} expense for ${formData.category} has been recorded.`,
    });

    // Reset form
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });
  };

  const handleSuggestionClick = (suggestion: typeof aiSuggestions[0]) => {
    setFormData({
      ...formData,
      description: suggestion.description,
      amount: suggestion.amount.toString(),
      category: suggestion.category
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Form */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <PlusCircle className="h-5 w-5 mr-2 text-primary" />
              Add New Expense
            </CardTitle>
            <p className="text-sm text-muted-foreground">Track your spending with AI-powered categorization</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Description *
                </Label>
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Amount *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="transition-all duration-200 focus:shadow-soft"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-200">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-accent" />
              AI Quick Add
            </CardTitle>
            <p className="text-sm text-muted-foreground">Common expenses based on your spending patterns</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-all duration-200 hover:shadow-soft"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{suggestion.description}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {suggestion.category}
                    </Badge>
                  </div>
                  <p className="font-bold text-primary">${suggestion.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm font-medium text-accent">💡 Pro Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click any suggestion above to auto-fill the form. The AI learns from your habits to provide better suggestions over time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-secondary shadow-soft">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">23</p>
              <p className="text-sm text-muted-foreground">Expenses this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary shadow-soft">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">$987.50</p>
              <p className="text-sm text-muted-foreground">Total spent this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary shadow-soft">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">$42.89</p>
              <p className="text-sm text-muted-foreground">Average per day</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};