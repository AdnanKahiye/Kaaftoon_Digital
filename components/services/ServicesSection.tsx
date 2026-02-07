import ServiceCard from "./ServiceCard";

interface Props {
  category: string;
  description: string;
  items: { title: string; href: string }[];
}

export default function ServicesSection({
  category,
  description,
  items,
}: Props) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        {category}
      </h2>

      <p className="mt-2 max-w-2xl text-gray-600">
        {description}
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <ServiceCard
            key={item.title}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
