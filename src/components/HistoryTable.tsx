import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowUpDown, Calendar } from "lucide-react";

interface HistoryRecord {
  id: string;
  roundNumber: number;
  multiplier: number;
  date: Date;
  status: 'completed' | 'crashed';
}

// Generate mock history data
const generateMockHistory = (): HistoryRecord[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i * 2); // Every 2 minutes
    
    return {
      id: `round-${100 - i}`,
      roundNumber: 1000 + (100 - i),
      multiplier: +(Math.random() * 15 + 1).toFixed(2),
      date,
      status: Math.random() > 0.3 ? 'completed' : 'crashed'
    };
  });
};

const HistoryTable = () => {
  const [historyData] = useState<HistoryRecord[]>(generateMockHistory());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof HistoryRecord>('roundNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = historyData;

    // Filter by search term
    if (searchTerm) {
      filtered = historyData.filter(record => 
        record.roundNumber.toString().includes(searchTerm) ||
        record.multiplier.toString().includes(searchTerm)
      );
    }

    // Sort data
    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' ? 
          aValue.getTime() - bValue.getTime() : 
          bValue.getTime() - aValue.getTime();
      }
      
      return 0;
    });
  }, [historyData, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof HistoryRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getMultiplierColor = (multiplier: number, status: string) => {
    if (status === 'crashed') return 'text-destructive';
    if (multiplier >= 5) return 'text-green-600';
    if (multiplier >= 2) return 'text-yellow-600';
    return 'text-foreground';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Round History</h2>
        <p className="text-muted-foreground">Historical results from previous Aviator rounds</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Game Results
          </CardTitle>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search round number or multiplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredAndSortedData.length} results
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('roundNumber')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Round #
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('multiplier')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Multiplier
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('date')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Time
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      #{record.roundNumber}
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold ${getMultiplierColor(record.multiplier, record.status)}`}>
                        {record.multiplier}x
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {record.date.toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {record.status === 'completed' ? '✅ Won' : '💥 Crashed'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryTable;