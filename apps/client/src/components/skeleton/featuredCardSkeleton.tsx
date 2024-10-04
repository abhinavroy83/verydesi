import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export const SkeletonFeaturedCard = () => (
  <Card className="w-full">
    <Skeleton className="h-[200px] w-full" />
    <CardContent className="mt-4">
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-28" />
    </CardFooter>
  </Card>
);
