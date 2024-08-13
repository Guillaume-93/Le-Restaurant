const testimonials = [
    [
        [
            {
                body: "Bon restaurant  jolie cadre et bonne cuisine ,je recommande vivement.",
                author: {
                    name: "Raphaël Jimenez",
                    handle: "raphaeljimenez",
                    imageUrl: "images/avatars/uifaces-popular-image-(1).jpg",
                },
            },
            {
                body: "Nous étions 5 personnes et franchement rien à dire tout était bon du début à la fin. Personnel sympathique et à l'écoute, ambiance feutrée et conviviale. Petit bémol tout n'était pas à la carte comme indiqué sur le site. À refaire.",
                author: {
                    name: "Mini Golf",
                    handle: "minigolf",
                    imageUrl: "images/avatars/uifaces-popular-image-(5).jpg",
                },
            },
            {
                body: "La cuisine magnifique. Ambiance chaleureuse. Et vous mangez comme chez vous.",
                author: {
                    name: "Esper Saloume",
                    handle: "espersaloume",
                    imageUrl: "images/avatars/uifaces-popular-image-(10).jpg",
                },
            },
        ],
        [
            {
                body: "Super cuisine. On y va depuis quasiment l’ouverture on a jamais été déçu ☺️☺️☺️ Des plats maison à très bon prix avec la qualité derrière 👌🏻 Je recommande",
                author: {
                    name: "Élise Potier",
                    handle: "elisepotier",
                    imageUrl: "images/avatars/uifaces-popular-image-(6).jpg",
                },
            },
            {
                body: "Le hasard de google quand tu recherches un restaurant et que tu trouves une pépite, un endroit hors du temps. On mange bien, la carte est efficace et la serveuse au petit soin je recommande.",
                author: {
                    name: "Stéphanie Comedon",
                    handle: "stephaniecomedon",
                    imageUrl: "images/avatars/uifaces-popular-image-(8).jpg",
                },
            },
        ],
    ],
    [
        [
            {
                body: "Petit établissement avec cadre reposant. La carte n'est pas un roman fleuve. Quelques plats et desserts, juste efficace et surtout fait maison. C'est excellent ! A découvrir. Ouverture le midi en semaine et les vendredi et les samedi soir.",
                author: {
                    name: "Andre",
                    handle: "andrer",
                    imageUrl: "images/avatars/uifaces-popular-image-(4).jpg",
                },
            },
            {
                body: "Restaurant où la Patronne partage sa passion de la cuisine et son sens de l'accueil ! Petite salle cosy, intime, sympathique. Je recommande sans réserve !",
                author: {
                    name: "Gérard Papet",
                    handle: "gerardpapet",
                    imageUrl: "images/avatars/uifaces-popular-image-(7).jpg",
                },
            },
        ],
        [
            {
                body: "Accueil chaleureux...Salle en lumière tamisée...Restaurations superbes... Je recommande pour un rendez-vous intime!!!! Plateau de fruits de mer 🦞 bien assorti...",
                author: {
                    name: "Alain Roset",
                    handle: "alainroset",
                    imageUrl: "images/avatars/uifaces-popular-image-(9).jpg",
                },
            },
            {
                body: "Petit restaurant très sympa, nourriture de qualité, quantité suffisante.",
                author: {
                    name: "Gabriel Drouet",
                    handle: "gabrieldrouet",
                    imageUrl: "images/avatars/uifaces-popular-image-(2).jpg",
                },
            },
            {
                body: "Un accueil au top la patronne est une passionnée et généreuse une cuisine fait avec le cœur maison ça se ressent dans les assiettes une multitude de bons vins et dessert encore une fois très généreux et très bon je recommande salle très intimiste pour couple et famille qui aime la bonne cuisine à l'ancienne merci encore.",
                author: {
                    name: "Said Bouarich",
                    handle: "saidbouarich",
                    imageUrl: "images/avatars/uifaces-popular-image-(3).jpg",
                },
            },
        ],
    ],
];

const featuredTestimonial = {
    body: "Le restaurant Le Neuilly à Neuilly Sur Marne est un excellent endroit. Sa terrasse extérieure et son intérieur cosy à la Décoration Design chic et sa cuisine faite maison font de ce lieu un restaurant atypique. La patronne est adorable et est au service de ses clients, elle est sur tous les fronts en cuisine comme en salle. La cuisine est française traditionnelle mais aussi cuisine du monde. A découvrir sans tarder!",
    author: {
        name: "Brenna Goyette",
        handle: "brennagoyette",
        imageUrl: "images/avatars/uifaces-popular-image.jpg",
        logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-slate-900.svg",
    },
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const TestimonialsSection = () => {
    return (
        <div className="relative isolate mt-32 sm:pt-32">
            <div className="relative py-20">
                <img
                className="absolute inset-0 -z-10 h-full w-full object-cover" 
                src="images/le-neuilly-pattern-3.png" 
                alt="" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl sm:text-center">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-[#112E34]">
                            Avis
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Des milliers de clients satisfaits ont partagé des moments inoubliables chez nous
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-slate-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                        <figure className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-default sm:ring-1 sm:ring-slate-900/5 xl:col-start-2 xl:row-end-1">
                            <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-slate-900">
                                <p>{`“${featuredTestimonial.body}”`}</p>
                            </blockquote>
                            <figcaption className="flex items-center gap-x-4 border-t border-slate-900/10 px-6 py-4">
                                <img
                                    alt=""
                                    src={featuredTestimonial.author.imageUrl}
                                    className="h-10 w-10 flex-none rounded-full bg-slate-50"
                                />
                                <div className="flex-auto">
                                    <div className="font-semibold">{featuredTestimonial.author.name}</div>
                                    <div className="text-slate-600">{`@${featuredTestimonial.author.handle}`}</div>
                                </div>
                                {/* <img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none" /> */}
                            </figcaption>
                        </figure>
                        {testimonials.map((columnGroup, columnGroupIdx) => (
                            <div
                                key={columnGroupIdx}
                                className="space-y-8 xl:contents xl:space-y-0"
                            >
                                {columnGroup.map((column, columnIdx) => (
                                    <div
                                        key={columnIdx}
                                        className={classNames(
                                            (columnGroupIdx === 0 && columnIdx === 0) ||
                                                (columnGroupIdx === testimonials.length - 1 &&
                                                    columnIdx === columnGroup.length - 1)
                                                ? "xl:row-span-2"
                                                : "xl:row-start-1",
                                            "space-y-8",
                                        )}
                                    >
                                        {column.map((testimonial) => (
                                            <figure
                                                key={testimonial.author.handle}
                                                className="rounded-2xl bg-white p-6 shadow-default ring-1 ring-slate-900/5"
                                            >
                                                <blockquote className="text-slate-900">
                                                    <p>{`“${testimonial.body}”`}</p>
                                                </blockquote>
                                                <figcaption className="mt-6 flex items-center gap-x-4">
                                                    <img
                                                        alt=""
                                                        src={testimonial.author.imageUrl}
                                                        className="h-10 w-10 rounded-full bg-slate-50"
                                                    />
                                                    <div>
                                                        <div className="font-semibold">
                                                            {testimonial.author.name}
                                                        </div>
                                                        <div className="text-slate-600">{`@${testimonial.author.handle}`}</div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
