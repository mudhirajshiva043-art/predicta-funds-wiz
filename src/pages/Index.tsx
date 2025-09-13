import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Goals } from "@/components/Goals";
import { Analytics } from "@/components/Analytics";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "expenses":
        return <ExpenseForm />;
      case "goals":
        return <Goals />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
