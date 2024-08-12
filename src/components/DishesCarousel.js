import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const dishes = [
    {
        name: "Boeuf Bourguignon",
        imageUrl: "/images/dalle-1.webp",
    },
    {
        name: "Bouillabaisse",
        imageUrl: "/images/dalle-2.webp",
    },
    {
        name: "Canard à l'orange",
        imageUrl: "/images/dalle-3.webp",
    },
    {
        name: "Cassoulet",
        imageUrl: "/images/dalle-4.webp",
    },
    {
        name: "Coq au vin",
        imageUrl: "/images/dalle-5.webp",
    },
    {
        name: "Croque-monsieur",
        imageUrl: "/images/dalle-6.webp",
    },
    {
        name: "Quiche Lorraine",
        imageUrl: "/images/quiche-lorraine.webp",
    },
    {
        name: "Sole Meunière",
        imageUrl: "/images/sole-meuniere.webp",
    },
    {
        name: "Tarte Tatin",
        imageUrl: "/images/menus/desserts/tarte-tatin.webp",
    }
];

const DishesCarousel = () => {
    return (
        <Carousel
            className="mt-20"
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                {dishes.map((dish, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="">
                            <Card className="w-full h-full relative rounded-full">
                                <CardContent className="flex items-center justify-center p-0">
                                    <img
                                        className="object-cover w-full h-full rounded-full"
                                        src={dish.imageUrl}
                                        alt={dish.name}
                                    />
                                    {/* <span className="absolute bottom-0 mb-6 text-white text-lg font-semibold bg-black bg-opacity-90 py-2 px-6 rounded">
                                        {dish.name}
                                    </span> */}
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    );
};

export default DishesCarousel;
