import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamMembers } from "./aboutUsConstants";

const Testimonials = () => {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="-ml-1 ">
        {teamMembers.map((member, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 ">
            <div className="p-1">
              <Card className="my-auto border border-red-500">
                <CardContent className="flex aspect-square items-center justify-center border border-red-500 p-6">
                  <span className="text-2xl font-semibold">{member.name}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Testimonials;
