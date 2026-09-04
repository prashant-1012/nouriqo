import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BrandStory } from "@/components/sections/BrandStory";
import { LifestyleStory } from "@/components/sections/LifestyleStory";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Nouriqo — a recipe for traditional Indian sweets that hasn't needed to change since 1958.",
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Nouriqo"
        title="Our Story"
        description="A recipe that hasn't needed to change since 1958."
      />
      <BrandStory />
      <LifestyleStory />
    </>
  );
}
