import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Heart,
  MapPin,
  Globe,
  Phone,
  Clock,
  FileText,
  AlertCircle,
  Car,
  Zap,
  Droplet,
  Wind,
} from "lucide-react";
import Image from "next/image";

const businessData = {
  _id: "674b3a5cb9a04b0f4052f32a",
  UserId: "6735ae9c9291dd4dc3d6144d",
  createdAt: "2024-11-30T11:21:13.537Z",
  updatedAt: "2024-11-30T11:21:13.537Z",
  isVerified: false,
  status: "Pending",
  userName: "Abhinav Anand",
  userPhone: "8360434096",
  businessName: "Abhinav",
  establishedsince: "1943",
  legalName: "Abhinav",
  businessType: "Business Center / Local Retailer / Showroom",
  categories: ["financial-legal"],
  address: "909 Fulton Street Southeast",
  city: "Minneapolis",
  state: "MN",
  zipCode: "55455",
  country: "United States",
  additionaladress: "adad",
  website: "htttp://localhost.com",
  phone: "8360434096",
  verificationMethod: "license",
  openHours: {
    monday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    tuesday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    wednesday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    thursday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    friday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    _id: "674b3a5cb9a04b0f4052f32b",
  },
  description: "dsada",
  languages: ["hi", "te"],
  pdfurl:
    "https://d1be4virimwdjl.cloudfront.net/pdf-uploads/1732983363850_FiLLiP_Approval Letter_M29414506.pdf",
  logoUrl:
    "https://d1be4virimwdjl.cloudfront.net/1732983377673_https___cdn.evbuc.com_images_905276403_2364994753083_1_original.jpeg",
  Imageurl: [
    "https://d1be4virimwdjl.cloudfront.net/1732983384222_https___cdn.evbuc.com_images_905276403_2364994753083_1_original.jpeg",
  ],
  sales: {
    description: "",
    couponCodes: "",
    _id: "674b3a5cb9a04b0f4052f32c",
  },
  __v: 0,
};

export default function BusinessListing() {
  return (
    <div className=" container max-w-[1370px] lg:max-w-[1600px]  px-4 sm:px-6 lg:px-8  mx-auto py-8 mt-[6.1rem] font-sans">
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span>🏠 Home</span>
        <span>/</span>
        <span>Businesses</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {businessData.businessName} | {businessData.businessType}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {`${businessData.address}, ${businessData.city}, ${businessData.state} ${businessData.zipCode}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Images Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={businessData.logoUrl}
                  alt={businessData.businessName}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {businessData.Imageurl.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={url}
                      alt={`${businessData.businessName} ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About {businessData.businessName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{businessData.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="flex gap-2 flex-wrap">
                  {businessData.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex gap-2 flex-wrap">
                  {businessData.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p>{businessData.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={businessData.website}
                  className="text-blue-600 hover:underline"
                >
                  {businessData.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p>Established since {businessData.establishedsince}</p>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <a
                  href={businessData.pdfurl}
                  className="text-blue-600 hover:underline"
                >
                  View License
                </a>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <p>Verification Status: {businessData.status}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(businessData.openHours)
                .filter(([key]) => key !== "_id")
                .map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between py-2 border-b last:border-0"
                  >
                    <span className="capitalize">{day}</span>
                    <span>
                      {typeof hours === "object"
                        ? hours.isClosed
                          ? "Closed"
                          : hours.is24Hours
                            ? "24 Hours"
                            : `${hours.startTime} - ${hours.endTime}`
                        : "Hours not specified"}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>

          {businessData.sales.description && (
            <Card>
              <CardHeader>
                <CardTitle>Sales Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{businessData.sales.description}</p>
                {businessData.sales.couponCodes && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Coupon Codes</h3>
                    <p>{businessData.sales.couponCodes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
