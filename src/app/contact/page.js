"use client";

import { useState, useEffect, useRef } from 'react';
import Loader from '@/components/Loader/Loader.js';

export default function Contact() {
    // const [loading, setLoading] = useState(true);
    const iframeRef = useRef(null);

    // const handleIframeLoad = () => {
    //     console.log("Iframe loaded");
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setLoading(false);
    //     }, 300); // Timeout après 5 secondes au cas où l'onLoad ne se déclenche pas

    //     return () => clearTimeout(timeout);
    // }, []);

    return (
        <div className="py-24 sm:py-32 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Contactez-nous</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                Nous serions ravis de vous accueillir dans notre restaurant. Vous trouverez ici toutes les informations nécessaires pour nous contacter. Pour toute question ou réservation, n'hésitez pas à nous joindre par email ou par téléphone. Notre équipe est à votre disposition pour répondre à toutes vos demandes.
                            </p>
                            <h3 className="mt-8 text-xl font-semibold leading-6 text-slate-900">Horaires d'ouverture</h3>
                            <ul className="mt-4 space-y-1 text-base leading-6 text-slate-600">
                                <li><strong>Lundi :</strong> Fermé</li>
                                <li><strong>Mardi :</strong> 11:30–14:30</li>
                                <li><strong>Mercredi :</strong> 11:30–14:30</li>
                                <li><strong>Jeudi :</strong> 11:30–14:30</li>
                                <li><strong>Vendredi :</strong> 11:30–14:30, 19:00–22:30</li>
                                <li><strong>Samedi :</strong> 19:00–22:30</li>
                                <li><strong>Dimanche :</strong> Fermé</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-1 gap-8 lg:col-span-2">
                            <div className="rounded-2xl bg-[--background-color-primary] shadow-lg p-8">
                                <h3 className="text-xl font-semibold leading-7 text-gray-900">Notre Adresse</h3>
                                <p className="mt-4 text-base leading-7 text-gray-600">
                                    2 Rue Louis Vannini, 93330 Neuilly-sur-Marne
                                </p>
                                <div className="mt-6 h-64 md:h-80 lg:h-96 w-full relative">
                                    <iframe
                                        ref={iframeRef}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.992300320199!2d2.5287343156748314!3d48.8512635792875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e610aa949c585f%3A0x52a19f0072e1186e!2s2%20Rue%20Louis%20Vannini%2C%2093330%20Neuilly-sur-Marne%2C%20France!5e0!3m2!1sen!2sfr!4v1693840820000!5m2!1sen!2sfr"
                                        className={`w-full h-full transition-opacity duration-500`}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        
                                    ></iframe>
                                </div>
                            </div>
                            <div className="rounded-2xl bg-[--background-color-primary] shadow-lg p-8">
                                <h3 className="text-xl font-semibold leading-7 text-gray-900">Adresse Email</h3>
                                <p className="mt-4 text-base leading-7 text-gray-600">
                                    Pour toute information ou réservation, contactez-nous à l'adresse suivante :
                                </p>
                                <p className="mt-2">
                                    <a href="mailto:leneuilly93@gmail.com" className="font-semibold text-indigo-600">
                                        leneuilly93@gmail.com
                                    </a>
                                </p>
                            </div>
                            <div className="rounded-2xl bg-[--background-color-primary] shadow-lg p-8">
                                <h3 className="text-xl font-semibold leading-7 text-gray-900">Numéro de Téléphone</h3>
                                <p className="mt-4 text-base leading-7 text-gray-600">
                                    Nous sommes disponibles pour répondre à vos questions ou prendre vos réservations par téléphone :
                                </p>
                                <p className="mt-2 font-semibold text-gray-900">09 84 15 23 70</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
