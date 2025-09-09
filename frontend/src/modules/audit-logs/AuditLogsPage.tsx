import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, FileText } from "lucide-react";
import { fetchAuditLogs } from "@/services";
import { IAuditLog } from "@/types";

const formatDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;

  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

const getActionIcon = (type: IAuditLog["type"]) => {
  switch (type) {
    case "create":
      return <FileText className="w-3 h-3" />;
    case "update":
    case "toggle":
      return <Activity className="w-3 h-3" />;
    case "delete":
      return <Activity className="w-3 h-3 text-red-500" />;
    case "reminder":
      return <Clock className="w-3 h-3" />;
    default:
      return <Activity className="w-3 h-3" />;
  }
};

const getActionVariant = (
  type: IAuditLog["type"]
): "default" | "secondary" | "destructive" | "outline" => {
  switch (type) {
    case "create":
      return "default";
    case "update":
    case "toggle":
      return "secondary";
    case "delete":
      return "destructive";
    case "reminder":
      return "outline";
    default:
      return "outline";
  }
};

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<IAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchAuditLogs();
        setLogs(data);
      } catch (err) {
        console.error("Failed to load audit logs", err);
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6">
      <div className="w-full max-w-none">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Audit Logs
              </h1>
              <p className="text-muted-foreground mt-1">
                Track all system activities and user actions across your
                organization
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{loading ? "Loading..." : `${logs.length} entries`}</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-16 px-6">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No audit logs found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  System activities and user actions will appear here when they
                  occur.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="font-semibold text-gray-900 py-4">
                        Action
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 py-4">
                        Details
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 py-4 text-right">
                        Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow
                        key={log.id}
                        className="hover:bg-muted/50 transition-colors duration-200 group"
                      >
                        <TableCell className="py-4">
                          <Badge
                            variant={getActionVariant(log.type)}
                            className="gap-1.5 font-medium capitalize"
                          >
                            {getActionIcon(log.type)}
                            {log.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 max-w-md">
                          <p className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                            {log.message}
                          </p>
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <div className="text-sm text-muted-foreground font-mono">
                            {formatDate(log.createdAt)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
