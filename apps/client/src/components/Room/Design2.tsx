import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BedDouble, Heart, MapPin, Clock, User, Wifi, Tv, Coffee, Car } from "lucide-react"

export default function Component() {
  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="p-6">
        <div className="flex">
          <div className="w-2/3 pr-6">
            <h2 className="text-2xl font-bold mb-2">Sleek Studio in Tech Hub</h2>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Seattle, WA</span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Clock className="h-4 w-4 mr-1" />
              <span>5 days ago</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <User className="h-4 w-4 mr-1" />
              <span>Posted by: SeattleTechLiving</span>
            </div>
            <p className="text-gray-700 mb-4">Modern studio apartment perfect for tech professionals. Close to major tech companies and startup hubs.</p>
            <div className="flex space-x-4">
              <Wifi className="h-5 w-5 text-blue-500" />
              <Tv className="h-5 w-5 text-blue-500" />
              <Coffee className="h-5 w-5 text-blue-500" />
              <Car className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <Separator orientation="vertical" className="mx-6" />
          <div className="w-1/3 flex flex-col justify-between items-end">
            <div className="text-right mb-4">
              <p className="text-3xl font-bold text-green-600">$1900/mo</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
            <BedDouble className="h-16 w-16 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}