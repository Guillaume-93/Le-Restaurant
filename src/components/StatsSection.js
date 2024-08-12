const stats = [
    { id: 1, name: "Clients satisfaits", value: "10,000+" },
    { id: 2, name: "Plats servis quotidiennement", value: "50+" },
    { id: 3, name: "Années d'expérience", value: "2+" },
    { id: 4, name: "Événements organisés", value: "100+" },
  ];
  
  const StatsSection = () => {
    return (
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <h2 className="text-base font-semibold leading-8 text-[#112E34]">
            Nos réussites
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Des milliers de clients satisfaits
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Depuis notre ouverture en 2022, nous nous efforçons de créer une atmosphère conviviale où nos clients peuvent se détendre et profiter de repas délicieux.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-slate-900 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };
  
  export default StatsSection;
  