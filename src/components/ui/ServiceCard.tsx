// Define the props type for ServiceCard if not already defined
export interface ServiceCardProps {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

// Your existing ServiceCard component
export const ServiceCard = ({
  tier,
  price,
  period,
  description,
  features,
  ctaLabel,
  ctaHref,
}: ServiceCardProps) => {
  // ...component implementation

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-5 flex flex-col">
      <h3 className="text-xl font-semibold">{tier}</h3>
      <div className="text-2xl font-bold mt-2">
        {price} <span className="text-sm font-normal">/ {period}</span>
      </div>
      <p className="mt-2 text-sm text-gray-300">{description}</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-400">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-green-400">✔</span> {f}
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className="btn mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition"
      >
        {ctaLabel}
      </a>
    </div>
  );
};
