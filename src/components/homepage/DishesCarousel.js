"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card.jsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel.jsx";
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

const DishesCarousel = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await fetch('/api/carousel-data');
                const data = await res.json();
                setDishes(data);
            } catch (error) {
                console.error("Error loading carousel data:", error);
            }
        };

        fetchDishes();
    }, []);

    return (
        <div className="relative mt-20">
            <Carousel
                className="relative"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {dishes.map((dish) => (
                        <CarouselItem key={dish.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="relative">
                                <Card className="w-full h-full relative rounded-full">
                                    <CardContent className="flex items-center justify-center p-0">
                                        <img
                                            className="object-cover w-full h-full rounded-full shadow-default"
                                            src={dish.imageUrl1}
                                            alt={dish.name}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Les icônes de navigation positionnées au-dessus du conteneur du carousel */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                    <CarouselPrevious className="bg-black bg-opacity-50 text-white p-2 rounded-full opacity-75 hover:opacity-100" />
                    <CarouselNext className="bg-black bg-opacity-50 text-white p-2 rounded-full opacity-75 hover:opacity-100" />
                </div>
            </Carousel>
        </div>
    );
};

export default DishesCarousel;
