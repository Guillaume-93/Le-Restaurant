"use client";

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
        name: "illustration plât",
        imageUrl: "/images/dalle-1.webp",
    },
    {
        name: "illustration repas autour d'une table",
        imageUrl: "/images/dalle-2.webp",
    },
    {
        name: "illustration table de restaurant décorée",
        imageUrl: "/images/dalle-3.webp",
    },
    {
        name: "illustration d'amuses bouches",
        imageUrl: "/images/dalle-4.webp",
    },
    {
        name: "illustration d'une ambiance tamisée",
        imageUrl: "/images/dalle-5.webp",
    },
    {
        name: "illustration d'une table décorée pour une occasion spéciale",
        imageUrl: "/images/dalle-6.webp",
    },
    {
        name: "illustration d'une Quiche Lorraine",
        imageUrl: "/images/menus/plats/quiche-lorraine.webp",
    },
    {
        name: "illustration d'une Sole Meunière",
        imageUrl: "/images/menus/plats/sole-meuniere.webp",
    },
    {
        name: "illustration d'une Tarte Tatin",
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
                                        className="object-cover w-full h-full rounded-full shadow-default"
                                        src={dish.imageUrl}
                                        alt={dish.name}
                                    />
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
