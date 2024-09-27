import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function DashboardCard({
  title,
  icon,
  url,
}: {
  title: string;
  icon: React.ReactNode;
  url: string;
}) {
  return (
    <Link href={url}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <Button variant="link" size="sm" className="mt-2">
            View Details <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
