"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import ExpensesFormModal, { ExpensesFormData } from "./ExpensesFormModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";

interface ExpenseDto {
  id: string;
  categoryName: string;
  amount: number;
  remark: string;
  expenseCategoryId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    setLoading(true);
    try {
      const res = await CustomerService.getAllExpenses();

      if (res.data.success) {
        const data = res.data.data;

        if (Array.isArray(data)) {
          setExpenses(data);
        } else if (Array.isArray(data?.data)) {
          setExpenses(data.data);
        } else {
          setExpenses([]);
        }
      } else {
        toast.error(res.data.message || "Failed to load expenses");
        setExpenses([]);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: ExpensesFormData) {
    try {
      let res;

      if (mode === "add") {
        res = await CustomerService.createExpenses(data);
      } else {
        if (!selectedExpense?.id) return;
        res = await CustomerService.updateExpenses(
          selectedExpense.id,
          data
        );
      }

      if (res.data.success) {
        toast.success(res.data.message || "Operation successful");
        setOpenModal(false);
        loadExpenses();
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  async function confirmDelete() {
    if (!selectedExpense) return;

    try {
      setDeleting(true);
      const res = await CustomerService.deleteExpenses(selectedExpense.id);

      if (res.data.success) {
        toast.success(res.data.message || "Expense deleted successfully");
        setOpenDelete(false);
        loadExpenses();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  const filteredExpenses = expenses.filter((e) =>
    e.categoryName?.toLowerCase().includes(search.toLowerCase()) ||
    e.remark?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Expenses
        </h2>

        <button
          onClick={() => {
            setMode("add");
            setSelectedExpense(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <div className="w-72">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full text-sm"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Remark
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Created At
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredExpenses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  No expenses found
                </td>
              </tr>
            )}

            {filteredExpenses.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium">
                  {e.categoryName}
                </td>
                <td className="px-4 py-3 text-sm">
                  {e.amount}
                </td>
                <td className="px-4 py-3 text-sm">
                  {e.remark}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setMode("edit");
                        setSelectedExpense(e);
                        setOpenModal(true);
                      }}
                      className="rounded px-2 py-1 text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedExpense(e);
                        setOpenDelete(true);
                      }}
                      className="rounded px-2 py-1 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 px-6 py-3 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing {filteredExpenses.length} of {expenses.length} entries
        </p>
      </div>

      <ExpensesFormModal
        open={openModal}
        mode={mode}
        initialData={selectedExpense ?? undefined}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={openDelete}
        loading={deleting}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
