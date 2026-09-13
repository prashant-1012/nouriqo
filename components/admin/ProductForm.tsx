"use client";

import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  createProduct,
  updateProduct,
  type ProductFormInput,
} from "@/app/admin/(protected)/products/actions";

const inputWrapClass =
  "mt-1.5 flex h-11 items-center rounded-lg border border-ink/15 px-3.5 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20";
const inputClass = "h-full w-full bg-transparent text-sm text-ink outline-none";
const labelClass = "text-sm font-medium text-ink";

export type EditableProduct = {
  id: string;
  slug: string;
  name: string;
  variant: string;
  tagline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  accent: "GOLD" | "LILAC" | "ROSE";
  attributes: string[];
  weightOptions: { weight: string; price: number }[];
};

export function ProductForm({ product }: { product?: EditableProduct }) {
  const [weightOptions, setWeightOptions] = useState(
    product?.weightOptions ?? [{ weight: "500 gram", price: 0 }]
  );
  const [attributesText, setAttributesText] = useState(
    product?.attributes.join(", ") ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateWeightOption(index: number, field: "weight" | "price", value: string) {
    setWeightOptions((prev) =>
      prev.map((option, i) =>
        i === index
          ? { ...option, [field]: field === "price" ? Number(value) || 0 : value }
          : option
      )
    );
  }

  function addWeightOption() {
    setWeightOptions((prev) => [...prev, { weight: "", price: 0 }]);
  }

  function removeWeightOption(index: number) {
    setWeightOptions((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (weightOptions.length === 0) {
      setError("Add at least one pack size.");
      return;
    }

    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    const input: ProductFormInput = {
      slug: String(form.get("slug")).trim(),
      name: String(form.get("name")).trim(),
      variant: String(form.get("variant")).trim(),
      tagline: String(form.get("tagline")).trim(),
      description: String(form.get("description")).trim(),
      imageSrc: String(form.get("imageSrc")).trim(),
      imageAlt: String(form.get("imageAlt")).trim(),
      accent: String(form.get("accent")) as ProductFormInput["accent"],
      attributes: attributesText
        .split(",")
        .map((attribute) => attribute.trim())
        .filter(Boolean),
      weightOptions: weightOptions.map((option) => ({
        weight: option.weight.trim(),
        price: option.price,
      })),
    };

    const result = product
      ? await updateProduct(product.id, input)
      : await createProduct(input);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pf-name" className={labelClass}>Name</label>
          <div className={inputWrapClass}>
            <input id="pf-name" name="name" required defaultValue={product?.name} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="pf-slug" className={labelClass}>Slug (URL)</label>
          <div className={inputWrapClass}>
            <input id="pf-slug" name="slug" required defaultValue={product?.slug} placeholder="e.g. classic-ghee-papri" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="pf-variant" className={labelClass}>Variant</label>
          <div className={inputWrapClass}>
            <input id="pf-variant" name="variant" required defaultValue={product?.variant} placeholder="e.g. Classic Delicious" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="pf-tagline" className={labelClass}>Tagline</label>
          <div className={inputWrapClass}>
            <input id="pf-tagline" name="tagline" required defaultValue={product?.tagline ?? "Since 1958"} className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="pf-description" className={labelClass}>Description</label>
        <textarea
          id="pf-description"
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className="mt-1.5 w-full resize-none rounded-lg border border-ink/15 p-3.5 text-sm text-ink outline-none transition-colors focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pf-imageSrc" className={labelClass}>Image path</label>
          <div className={inputWrapClass}>
            <input id="pf-imageSrc" name="imageSrc" required defaultValue={product?.imageSrc} placeholder="/assets/products/example.jpg" className={inputClass} />
          </div>
          <p className="mt-1 text-xs text-ink-soft/70">
            The image file itself must already exist in <code>public/assets/products/</code> — this field doesn&apos;t upload one.
          </p>
        </div>
        <div>
          <label htmlFor="pf-imageAlt" className={labelClass}>Image alt text</label>
          <div className={inputWrapClass}>
            <input id="pf-imageAlt" name="imageAlt" required defaultValue={product?.imageAlt} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pf-accent" className={labelClass}>Accent color</label>
          <div className={inputWrapClass}>
            <select id="pf-accent" name="accent" defaultValue={product?.accent ?? "GOLD"} className={inputClass}>
              <option value="GOLD">Gold</option>
              <option value="LILAC">Lilac</option>
              <option value="ROSE">Rose</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="pf-attributes" className={labelClass}>Attributes (comma-separated)</label>
          <div className={inputWrapClass}>
            <input
              id="pf-attributes"
              value={attributesText}
              onChange={(event) => setAttributesText(event.target.value)}
              placeholder="No Maida, No Artificial Color, No Preservatives"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <p className={labelClass}>Pack sizes &amp; pricing</p>
        <div className="mt-1.5 space-y-2">
          {weightOptions.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`${inputWrapClass} flex-1`}>
                <input
                  value={option.weight}
                  onChange={(event) => updateWeightOption(index, "weight", event.target.value)}
                  placeholder="e.g. 500 gram"
                  required
                  className={inputClass}
                />
              </div>
              <div className={`${inputWrapClass} w-32`}>
                <span className="text-sm text-ink-soft">₹</span>
                <input
                  type="number"
                  min={0}
                  value={option.price}
                  onChange={(event) => updateWeightOption(index, "price", event.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => removeWeightOption(index)}
                disabled={weightOptions.length === 1}
                aria-label="Remove pack size"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-soft hover:bg-ink/5 disabled:opacity-30"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addWeightOption}
          className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-800 hover:text-emerald-700"
        >
          <Plus size={15} /> Add pack size
        </button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-emerald-800 px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700 disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : product ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
