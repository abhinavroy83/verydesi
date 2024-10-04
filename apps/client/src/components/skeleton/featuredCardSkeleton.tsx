import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export const SkeletonFeaturedCard = () => (
  <Card className="w-full w-[36rem]">
    <Skeleton className="" />
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
