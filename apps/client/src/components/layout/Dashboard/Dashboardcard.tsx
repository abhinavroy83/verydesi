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
      <Card className="hover:shadow-md transition-shadow group items-center font-sans">
        <CardContent className="lg:p-6 p-3 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-200 group-hover:bg-gray-300 group-hover:translate-y-1 p-4 rounded-full mb-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:translate-y-1">
            {title}
          </h2>
          <Button variant="link" size="sm" className="lg:mt-2 text-center">
            View Details <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
