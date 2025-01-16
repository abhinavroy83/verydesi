import { HomeLayout } from "@/components/layout/Home/Homelayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
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
  ThermometerSun,
  ChevronRight,
} from "lucide-react";

const benefits = [
  {
    title: "Environmental Stewardship",
    icon: <Tree className="w-8 h-8 text-green-600" />,
    description:
      "Portland is one of America's greenest cities, ranked third for environmental sustainability.",
  },
  {
    title: "Millennial-Friendly Culture",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    description:
      "A youthful, creative crowd with local businesses and events catering to their interests.",
  },
  {
    title: "Laid-Back Atmosphere",
    icon: <Sun className="w-8 h-8 text-yellow-600" />,
    description:
      "Uniquely relaxed vibe reflected in casual dress code and ease of residents.",
  },
  {
    title: "Job Opportunities",
    icon: <Briefcase className="w-8 h-8 text-purple-600" />,
    description:
      "Diverse job market with opportunities in footwear, healthcare, and tech industries.",
  },
  {
    title: "Proximity to Nature",
    icon: <Tree className="w-8 h-8 text-green-600" />,
    description:
      "Surrounded by the beauty of the Pacific Northwest, with easy access to outdoor destinations.",
  },
  {
    title: "No Sales Tax",
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
    description:
      "Oregon's lack of sales tax makes purchases more affordable for residents.",
  },
  {
    title: "Food Scene",
    icon: <Coffee className="w-8 h-8 text-amber-700" />,
    description:
      "Renowned culinary reputation with creative, locally-sourced options.",
  },
  {
    title: "Craft Beer Community",
    icon: <Beer className="w-8 h-8 text-yellow-600" />,
    description: "Over 58 breweries, often rated as America's best beer city.",
  },
];

const challenges = [
  {
    title: "Homelessness",
    icon: <Home className="w-8 h-8 text-gray-600" />,
    description:
      "Increased homelessness with visible tent encampments throughout the city.",
  },
  {
    title: "High Income Tax",
    icon: <DollarSign className="w-8 h-8 text-red-600" />,
    description:
      "Second-highest income tax rates in the U.S., reaching up to 13.65% for high earners.",
  },
  {
    title: "Seasonal Affective Disorder",
    icon: <Cloud className="w-8 h-8 text-gray-600" />,
    description:
      "Gray winters contribute to seasonal depression for some residents.",
  },
  {
    title: "Rising Housing Costs",
    icon: <Home className="w-8 h-8 text-orange-600" />,
    description:
      "Substantial price increases in the housing market, with median home prices around $550,000.",
  },
  {
    title: "Reserved Community",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    description:
      "Residents can be slow to form new friendships, making the city feel insular to newcomers.",
  },
  {
    title: "Increasing Traffic",
    icon: <Car className="w-8 h-8 text-red-600" />,
    description:
      "Rapid growth has led to significant traffic congestion issues.",
  },
  {
    title: "Lack of Diversity",
    icon: <Users className="w-8 h-8 text-purple-600" />,
    description:
      "Predominantly white population with slower demographic shifts compared to other major cities.",
  },
  {
    title: "Limited Air Conditioning",
    icon: <ThermometerSun className="w-8 h-8 text-orange-600" />,
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
    <Card className="h-full overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:cursor-pointer">
      <CardContent className="p-4 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center mb-4 transform transition-transform duration-300 group-hover:scale-85">
          <div className="p-3 rounded-full mr-4">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-black text-[14px] leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {points.map((point, index) => (
        <PointCard key={index} {...point} />
      ))}
    </div>
  );
}

export default function ModernPortlandLiving() {
  return (
    <>
      <HomeLayout>
        <div className="flex gap-0">
          <Breadcrumb>
            <BreadcrumbList className="flex items-center space-x-[-7px]">
              <BreadcrumbItem className="">
                <BreadcrumbLink
                  href="/"
                  className="flex items-center text-[15px] hover:text-primary-dark transition-colors hover:underline text-[#f97316]"
                >
                  <Home className="w-4 h-4 mr-2" />
                  <span className="font-bold">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/rooms"
                  className="flex items-center text-[15px] hover:text-primary-dark transition-colors"
                >
                  {/* <Hotel className="w-4 h-6 mr-2" /> */}
                  <span className="font-bold hover:underline">About City</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="">
          <div className="mt-2">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4 leading-tight">
              Living in Portland, Oregon
            </h1>
            <p className="text-[16px] text-center mb-6 text-black leading-relaxed">
              Explore the vibrant tapestry of life in the City of Roses, where
              urban charm meets natural beauty, and discover the unique blend of
              benefits and challenges that shape Portland's distinctive
              character.
            </p>

            <section className="mb-14">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                Benefits of Living in Portland
              </h2>
              <PointsGrid points={benefits} />
            </section>

            <section className="mb-9">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                Challenges of Living in Portland
              </h2>
              <PointsGrid points={challenges} />
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Looking Forward in Portland
              </h2>
              <p className="text-black text-[14px] leading-relaxed">
                The city is navigating a period of significant change. Despite
                challenges, Portland remains resilient and is committed to
                addressing its issues while preserving the qualities that make
                it unique. With ongoing projects and a new system of governance,
                the city's future will continue to unfold, hopefully in a
                direction that preserves the qualities that residents love while
                addressing current challenges. As Portland evolves, it maintains
                its spirit of innovation, environmental consciousness, and
                community engagement, promising a future that honors its past
                while embracing new possibilities.
              </p>
            </section>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
