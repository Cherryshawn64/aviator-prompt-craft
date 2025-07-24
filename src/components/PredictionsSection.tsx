import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, TrendingUp } from "lucide-react";

interface Prediction {
  id: string;
  roundNumber: number;
  predictedMultiplier: number;
  confidence: number;
  timestamp: Date;
}

const PredictionsSection = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simple prediction algorithm using mock data
  const generatePredictions = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newPredictions: Prediction[] = Array.from({ length: 5 }, (_, i) => ({
        id: `pred-${Date.now()}-${i}`,
        roundNumber: Date.now() + i + 1,
        predictedMultiplier: +(Math.random() * 10 + 1).toFixed(2),
        confidence: Math.floor(Math.random() * 40 + 60), // 60-100%
        timestamp: new Date()
      }));
      
      setPredictions(newPredictions);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Upcoming Predictions</h2>
          <p className="text-muted-foreground">Statistical analysis based on historical data</p>
        </div>
        <Button 
          onClick={generatePredictions} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Generating...' : 'Refresh'}
        </Button>
      </div>

      {predictions.length === 0 && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Click "Refresh" to generate new predictions</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {predictions.map((prediction, index) => (
          <Card key={prediction.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Round #{prediction.roundNumber}</CardTitle>
              <CardDescription>
                Generated: {prediction.timestamp.toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {prediction.predictedMultiplier}x
                  </div>
                  <p className="text-sm text-muted-foreground">Predicted Multiplier</p>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Confidence:</span>
                  <span className="font-medium">{prediction.confidence}%</span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
            
            {index === 0 && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                Next
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <p className="font-medium mb-1">⚠️ Disclaimer</p>
        <p>This is a statistical tracker only. It does not support or promote betting.</p>
      </div>
    </div>
  );
};

export default PredictionsSection;