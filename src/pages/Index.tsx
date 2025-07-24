import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, History, HelpCircle, Plane } from "lucide-react";
import PredictionsSection from "@/components/PredictionsSection";
import HistoryTable from "@/components/HistoryTable";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("predictions");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Aviator Stats Tracker</h1>
                <p className="text-sm text-muted-foreground">Statistical Analysis & Historical Data</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Predictions</span>
              <span className="sm:hidden">Pred</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">Hist</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
              <span className="sm:hidden">FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <PredictionsSection />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <HistoryTable />
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <FAQSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2024 Aviator Stats Tracker. Educational tool for statistical analysis only.
            </p>
            <p className="text-xs text-muted-foreground">
              This app does not support gambling and is intended for educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
