import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  History,
  MapPin,
  LandPlot,
  TreePine,
  Building,
  Users,
  Home,
  Scale,
} from "lucide-react";

export default function PortlandHistoryGeographyGovernment() {
  return (
    <div className="min-h-screen mt-[7rem]">
      <div className="container mx-auto py-12 space-y-12">
        <section className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold mb-4">Portland, Oregon</h1>
          <p className="text-2xl max-w-3xl mx-auto">
            Discover the rich history, unique geography, and distinctive
            government structure of the City of Roses.
          </p>
        </section>

        <section className="bg-orange-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-orange-800 flex items-center">
            <History className="mr-2" /> History of Portland
          </h2>
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              {[
                {
                  title: "Early Inhabitants",
                  content:
                    "The area was originally inhabited by Native American tribes, including the Multnomah and Clackamas tribes, who utilized the rivers for trade.",
                  icon: <Users className="text-orange-500" />,
                },
                {
                  title: "Founding",
                  content:
                    "Portland was established in 1845 when Asa Lovejoy and Francis Pettygrove named it after a coin toss, with Pettygrove winning and naming it after Portland, Maine.",
                  icon: <Home className="text-orange-500" />,
                },
                {
                  title: "Economic Growth",
                  content:
                    "In the late 1800s, timber and shipping industries boomed due to its riverside location. The arrival of railroads in the 1880s cemented Portland's role as an economic hub in the Pacific Northwest.",
                  icon: <Building className="text-orange-500" />,
                },
                {
                  title: "20th Century Changes",
                  content:
                    "Portland's economy shifted in the 20th century with industries like shipbuilding during WWII and later the high-tech sector in the 1980s. Urban renewal transformed neighborhoods like the Pearl District.",
                  icon: <Scale className="text-orange-500" />,
                },
                {
                  title: "Modern Identity",
                  content:
                    "Portland is known for its progressive values, green initiatives, and cultural character—especially in the arts, food, and environmental sectors.",
                  icon: <LandPlot className="text-orange-500" />,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-orange-700">
                      {item.title}
                    </h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="bg-blue-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center">
            <MapPin className="mr-2" /> Geography of Portland
          </h2>
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              {[
                {
                  title: "Location",
                  content:
                    "Situated at the confluence of the Willamette and Columbia Rivers, in the shadow of Mount Hood, Portland enjoys a mild, temperate climate.",
                  icon: <MapPin className="text-blue-500" />,
                },
                {
                  title: "Topography",
                  content:
                    "The city is characterized by lush, forested hills, particularly in the west. East of the Willamette, the terrain flattens into the fertile Willamette Valley.",
                  icon: <LandPlot className="text-blue-500" />,
                },
                {
                  title: "Natural Boundaries",
                  content:
                    "The city has an urban growth boundary to control sprawl and protect nearby farms and forests, which has helped Portland stay compact and green.",
                  icon: <TreePine className="text-blue-500" />,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">
                      {item.title}
                    </h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="bg-green-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center">
            <Building className="mr-2" /> Government of Portland
          </h2>
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              {[
                {
                  title: "City Council and Mayor",
                  content: (
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        City Council consists of the mayor and four
                        commissioners, all elected citywide.
                      </li>
                      <li>
                        The mayor sets priorities, leads city policies, and
                        represents Portland at state and national levels.
                      </li>
                      <li>
                        Commissioners oversee specific city bureaus, acting as
                        both legislators and administrators.
                      </li>
                    </ul>
                  ),
                  icon: <Users className="text-green-500" />,
                },
                {
                  title: "City Bureaus",
                  content:
                    "Various bureaus handle specific city services, each overseen by one of the five council members. Assignments can change periodically and are usually set by the mayor.",
                  icon: <Building className="text-green-500" />,
                },
                {
                  title: "City Auditor",
                  content:
                    "An independent official elected separately from the council, responsible for ensuring government accountability through audits, investigations, and oversight of public records and elections.",
                //   icon: <FileAudit className="text-green-500" />,
                },
                {
                  title: "Neighborhood Involvement",
                  content:
                    "Portland is divided into 95 recognized neighborhood associations under seven district coalitions, supported by the Office of Community and Civic Life to ensure community voices are heard in city planning.",
                  icon: <Home className="text-green-500" />,
                },
                {
                  title: "Recent Reforms",
                  content: (
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        In 2022, voters approved a major change to the
                        government structure.
                      </li>
                      <li>
                        The new system will divide Portland into four districts,
                        each electing three representatives, creating a
                        12-member council.
                      </li>
                      <li>
                        The mayor will gain more executive power, while a
                        professional city manager will handle daily
                        administrative tasks.
                      </li>
                      <li>
                        This shift aims to improve representation and increase
                        efficiency, aligning Portland more closely with
                        council-manager systems used by other major U.S. cities.
                      </li>
                    </ul>
                  ),
                  icon: <Scale className="text-green-500" />,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      {item.title}
                    </h3>
                    {typeof item.content === "string" ? (
                      <p>{item.content}</p>
                    ) : (
                      item.content
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
