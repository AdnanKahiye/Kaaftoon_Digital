"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  TrendingUp,
  Users,
  UserCheck,
  AlertTriangle,
  Download,
} from "lucide-react";

/* =========================
   TYPES
========================= */

interface RecentSale {
  invoiceNumber: string;
  customerName?: string;
  paymentStatus: string;
  totalAmount: number;
}

/* =========================
   DASHBOARD
========================= */

export default function DashboardContent() {
  const [loading, setLoading] = useState(false);

  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);

  const [filters, setFilters] = useState<{ fromDate?: string; toDate?: string }>({});

  /* =========================
     FORMAT NUMBER (NO CURRENCY)
  ========================= */
  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

  /* =========================
     LOAD TOTAL SALES
  ========================= */
  async function loadTotalSales() {
    try {
      //const res = await SalesService.getTotalSales(filters);
      //setTotalSales(res.data.data ?? 0);
    } catch {
      toast.error("Failed to load total sales");
    }
  }

  /* =========================
     LOAD TOTAL CUSTOMERS
  ========================= */
  async function loadTotalCustomers() {
    try {
     // const res = await SalesService.getTotalCustomers(filters);
      //setTotalCustomers(res.data.data ?? 0);
    } catch {
      toast.error("Failed to load total customers");
    }
  }

  /* =========================
     LOAD TOTAL USERS
  ========================= */
  async function loadTotalUsers() {
    try {
      //const res = await SalesService.getTotalUsers(filters);
      //setTotalUsers(res.data.data ?? 0);
    } catch {
      toast.error("Failed to load total users");
    }
  }

  /* =========================
     LOAD RECENT SALES
  ========================= */
  async function loadRecentSales() {
    try {
     // const res = await SalesService.getRecentSales(5);
      //setRecentSales(res.data.data ?? []);
    } catch {
      toast.error("Failed to load recent sales");
    }
  }

  /* =========================
     LOAD DASHBOARD
  ========================= */
  async function loadDashboard() {
    setLoading(true);
    await Promise.all([
      loadTotalSales(),
      loadTotalCustomers(),
      loadTotalUsers(),
      loadRecentSales(),
    ]);
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, [filters]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="text-xl font-semibold">

      {/* =========================
          STAT CARDS
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Sales"
          value={loading ? "0" : formatNumber(totalSales)}
          subtitle="This month"
          icon={<TrendingUp className="w-6 h-6" />}
          accent="emerald"
        />

        <StatCard
          title="Customers"
          value={loading ? "0" : formatNumber(totalCustomers)}
          subtitle="Total registered"
          icon={<Users className="w-6 h-6" />}
          accent="indigo"
        />

        <StatCard
          title="Active Users"
          value={loading ? "0" : formatNumber(totalUsers)}
          subtitle="System users"
          icon={<UserCheck className="w-6 h-6" />}
          accent="blue"
        />

        <StatCard
          title="Stock Alerts"
          value="5"
          subtitle="Critical re-order required"
          icon={<AlertTriangle className="w-6 h-6" />}
          accent="amber"
        />

      </div>

      {/* =========================
          RECENT SALES TABLE
      ========================= */}
      <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center bg-white">
          <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Recent Orders
          </h2>
          <button className="text-indigo-600 text-xs font-semibold flex items-center gap-1 hover:underline">
            Export CSV <Download className="w-4 h-4" />
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Invoice</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-slate-400">
                  No recent sales found
                </td>
              </tr>
            )}

            {recentSales.map((sale, index) => (
              <OrderRow
                key={index}
                id={sale.invoiceNumber}
                customer={sale.customerName ?? "Walk-in Customer"}
                status={sale.paymentStatus}
                amount={sale.totalAmount}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function StatCard({ title, value, subtitle, icon, accent }: any) {
  const colors: any = {
    emerald: "from-emerald-500 to-emerald-600",
    indigo: "from-indigo-500 to-indigo-600",
    blue: "from-blue-500 to-blue-600",
    amber: "from-amber-500 to-amber-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[accent]} text-white`}>
          {icon}
        </div>
      </div>

      <h3 className="text-3xl font-bold mt-4">{value}</h3>

      <p className="mt-2 text-xs font-semibold text-emerald-600">
        {subtitle}
      </p>
    </div>
  );
}

/* =========================
   STATUS BADGE (GREEN CLOSED)
========================= */

function StatusBadge({ status }: { status: string }) {
  const base =
    "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center";

  const styles: Record<string, string> = {
    CLOSED: "bg-green-100 text-green-700",
    PAID: "bg-emerald-100 text-emerald-700",
    PARTIAL: "bg-amber-100 text-amber-700",
    PENDING: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${base} ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

/* =========================
   ORDER ROW
========================= */

function OrderRow({
  id,
  customer,
  status,
  amount,
}: {
  id: string;
  customer: string;
  status: string;
  amount: number;
}) {
  return (
    <tr className="border-t hover:bg-slate-50 transition">
      <td className="px-6 py-4 font-mono text-slate-500">{id}</td>
      <td className="px-6 py-4 font-medium">{customer}</td>
      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4 text-right font-semibold">
        {new Intl.NumberFormat("en-US").format(amount)}
      </td>
    </tr>
  );
}
