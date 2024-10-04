import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomSketon() {
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-between mb-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </nav>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          {/* Title and location */}
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-4" />

          {/* Image carousel */}
          <div className="relative">
            <Skeleton className="h-96 w-full mb-4" />
            <Button className="absolute left-2 top-1/2 -translate-y-1/2">
              &lt;
            </Button>
            <Button className="absolute right-2 top-1/2 -translate-y-1/2">
              &gt;
            </Button>
          </div>

          {/* Price */}
          <Skeleton className="h-8 w-32 mt-4" />
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full mb-4" />
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Amenities Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Utilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
