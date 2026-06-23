import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/apiClient";
import { CancelButton, SubmitButton } from "../../components/buttons/Button";
import { expenseSchema, type ExpenseFormValues } from "../../types/cash-types";

export default function AddExpensePage() {
  const navigate = useNavigate();
  const [selectedImageName, setSelectedImageName] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      category: "Office Supplies",
      notes: "",
      image: undefined,
    },
  });

  const submitForm = async (data: ExpenseFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("amount", String(Number(data.amount)));
      formData.append("notes", data.notes);
      formData.append("category", data.category);
      formData.append("date", data.date);

      const imageFile = data.image?.[0];
      if (imageFile) {
        formData.append("Invoice", imageFile);
      }

      await axiosInstance.post("/cash/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Expense submitted for approval");
      reset();
      setSelectedImageName("");
    } catch (exception) {
      console.error(exception);
      toast.error("Unable to submit expense right now");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
          Expense Request
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Add a new expense
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Submit a fresh expense request for approval with supporting details
          and an image if needed.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        encType="multipart/form-data"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Title
            <input
              {...register("title")}
              type="text"
              placeholder="e.g. Office Printer Ink"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            <span className="mt-2 block text-sm text-red-600">
              {errors.title?.message}
            </span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Amount
            <input
              {...register("amount")}
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            <span className="mt-2 block text-sm text-red-600">
              {errors.amount?.message}
            </span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Date
            <input
              {...register("date")}
              type="date"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            <span className="mt-2 block text-sm text-red-600">
              {errors.date?.message}
            </span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Category
            <select
              {...register("category")}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="Office Supplies">Office Supplies</option>
              <option value="Grocery">Grocery</option>
              <option value="Toiletries">Toiletries</option>
              <option value="Transport">Transport</option>
            </select>
            <span className="mt-2 block text-sm text-red-600">
              {errors.category?.message}
            </span>
          </label>
        </div>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Notes
          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Add any context for the approval team"
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <span className="mt-2 block text-sm text-red-600">
            {errors.notes?.message}
          </span>
        </label>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Receipt / Invoice Image
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            onChange={(event) => {
              const fileName = event.target.files?.[0]?.name ?? "";
              setSelectedImageName(fileName);
            }}
            className="mt-3 w-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition file:mr-4 file:rounded-2xl file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <span className="mt-2 block text-xs text-slate-500">
            {selectedImageName || "Optional image upload for your receipt"}
          </span>
        </label>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <CancelButton
            className="sm:w-auto"
            onClick={(event) => {
              event.preventDefault();
              reset();
              setSelectedImageName("");
              navigate(-1);
            }}
          >
            Cancel
          </CancelButton>
          <SubmitButton className="sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Approval"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
