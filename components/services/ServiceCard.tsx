import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  href: string;
}

export default function ServiceCard({ title, href }: Props) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-gray-200
                 bg-white p-7 shadow-sm
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-xl"
    >
      <span
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl
                   bg-orange-500 opacity-0
                   transition group-hover:opacity-100"
      />

      <h3 className="text-lg font-bold text-gray-900
                     group-hover:text-orange-500 transition">
        {title}
      </h3>

      <p className="mt-3 text-sm text-gray-600">
        View details about our {title.toLowerCase()} service.
      </p>

      <div className="mt-6 inline-flex items-center gap-2
                      text-sm font-semibold text-orange-500">
        View Details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
