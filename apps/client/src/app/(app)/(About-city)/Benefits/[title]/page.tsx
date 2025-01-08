import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coffee,
  Beer,
  TreesIcon as Tree,
  Sun,
  Cloud,
  DollarSign,
  Briefcase,
  Home,
  Users,
  Car,
  Frown,
  ThermometerSun,
} from "lucide-react";

const benefits = [
  {
    title: "Environmental Stewardship",
    icon: <Tree className="w-6 h-6 text-green-600" />,
    description:
      "Portland is one of America's greenest cities, ranked third for environmental sustainability.",
  },
  {
    title: "Millennial-Friendly Culture",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    description:
      "A youthful, creative crowd with local businesses and events catering to their interests.",
  },
  {
    title: "Laid-Back Atmosphere",
    icon: <Sun className="w-6 h-6 text-yellow-600" />,
    description:
      "Uniquely relaxed vibe reflected in casual dress code and ease of residents.",
  },
  {
    title: "Job Opportunities",
    icon: <Briefcase className="w-6 h-6 text-purple-600" />,
    description:
      "Diverse job market with opportunities in footwear, healthcare, and tech industries.",
  },
  {
    title: "Proximity to Nature",
    icon: <Tree className="w-6 h-6 text-green-600" />,
    description:
      "Surrounded by the beauty of the Pacific Northwest, with easy access to outdoor destinations.",
  },
  {
    title: "No Sales Tax",
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    description:
      "Oregon's lack of sales tax makes purchases more affordable for residents.",
  },
  {
    title: "Food Scene",
    icon: <Coffee className="w-6 h-6 text-brown-600" />,
    description:
      "Renowned culinary reputation with creative, locally-sourced options.",
  },
  {
    title: "Craft Beer Community",
    icon: <Beer className="w-6 h-6 text-yellow-600" />,
    description: "Over 58 breweries, often rated as America's best beer city.",
  },
];

const challenges = [
  {
    title: "Homelessness",
    icon: <Home className="w-6 h-6 text-gray-600" />,
    description:
      "Increased homelessness with visible tent encampments throughout the city.",
  },
  {
    title: "High Income Tax",
    icon: <DollarSign className="w-6 h-6 text-red-600" />,
    description:
      "Second-highest income tax rates in the U.S., reaching up to 13.65% for high earners.",
  },
  {
    title: "Seasonal Affective Disorder",
    icon: <Cloud className="w-6 h-6 text-gray-600" />,
    description:
      "Gray winters contribute to seasonal depression for some residents.",
  },
  {
    title: "Rising Housing Costs",
    icon: <Home className="w-6 h-6 text-orange-600" />,
    description:
      "Substantial price increases in the housing market, with median home prices around $550,000.",
  },
  {
    title: "Reserved Community",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    description:
      "Residents can be slow to form new friendships, making the city feel insular to newcomers.",
  },
  {
    title: "Increasing Traffic",
    icon: <Car className="w-6 h-6 text-red-600" />,
    description:
      "Rapid growth has led to significant traffic congestion issues.",
  },
  {
    title: "Lack of Diversity",
    icon: <Users className="w-6 h-6 text-purple-600" />,
    description:
      "Predominantly white population with slower demographic shifts compared to other major cities.",
  },
  {
    title: "Limited Air Conditioning",
    icon: <ThermometerSun className="w-6 h-6 text-orange-600" />,
    description:
      "Many homes lack air conditioning, challenging during increasingly hot summers.",
  },
];

function PointCard({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-lg font-semibold ml-2">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function PointsGrid({
  points,
}: {
  points: Array<{ title: string; icon: React.ReactNode; description: string }>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {points.map((point, index) => (
        <PointCard key={index} {...point} />
      ))}
    </div>
  );
}

export default function PortlandLiving() {
  return (
    <div className="min-h-screen mt-[7rem] py-9 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Living in Portland, Oregon
        </h1>
        <p className="text-xl text-center my-4 text-gray-600">
          Explore the benefits and challenges of life in the City of Roses
        </p>

        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
          <TabsContent value="benefits">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Benefits of Living in Portland
            </h2>
            <PointsGrid points={benefits} />
          </TabsContent>
          <TabsContent value="challenges">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Challenges of Living in Portland
            </h2>
            <PointsGrid points={challenges} />
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Looking Forward in Portland
          </h2>
          <p className="text-gray-600">
            The city is navigating a period of significant change. Despite
            challenges, Portland remains resilient and is committed to
            addressing its issues while preserving the qualities that make it
            unique. With ongoing projects and a new system of governance, the
            city's future will continue to unfold, hopefully in a direction that
            preserves the qualities that residents love while addressing current
            challenges.
          </p>
        </div>
      </div>
    </div>
  );
}
