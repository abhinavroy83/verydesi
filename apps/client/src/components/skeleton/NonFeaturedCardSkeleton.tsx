import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export const SkeletonNonFeatureCard = () => (
  <Card className="w-full">
    <CardContent className="flex justify-between items-center p-4">
      <div className="w-2/3">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="w-1/3 text-right">
        <Skeleton className="h-6 w-24 mb-2 ml-auto" />
        <Skeleton className="h-10 w-28 ml-auto" />
      </div>
    </CardContent>
  </Card>
);
