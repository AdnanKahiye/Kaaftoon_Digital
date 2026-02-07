interface Props {
  title: string;
  description: string;
}

export default function FreelancerPage({ title, description }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">

        <span className="inline-block mb-3 rounded-full
                         bg-orange-50 px-4 py-1
                         text-xs font-semibold text-orange-600 uppercase">
          Freelancer
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-gray-600">
          {description}
        </p>

        {/* CONTENT SLOT (later you can expand) */}
        <div className="mt-12 rounded-xl border bg-white p-8 shadow-sm">
          <p className="text-gray-700">
            Detailed content for <strong>{title}</strong> will appear here.
          </p>
        </div>

      </div>
    </section>
  );
}
