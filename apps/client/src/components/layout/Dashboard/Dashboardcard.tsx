import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function DashboardCard({
  title,
  icon,
  url,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  url: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href={url} className="block w-full">
      <Card className="hover:shadow-md transition-shadow group h-full">
        <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="bg-gray-200 group-hover:bg-gray-300 group-hover:translate-y-1 p-3 sm:p-4 rounded-full mb-3 sm:mb-4 transition-all">
            {icon}
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:translate-y-1 transition-transform">
            {title}
          </h2>
          <Button variant="link" size="sm" className="mt-1 sm:mt-2 text-center">
            View Details <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          {children && <div className="mt-2 sm:mt-3">{children}</div>}
        </CardContent>
      </Card>
    </Link>
  );
}
