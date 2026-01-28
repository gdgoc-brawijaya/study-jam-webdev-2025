"use client";

import { useParams } from "next/navigation";

export default function SingleBlogPage() {
  const { slug } = useParams();

  return <h1>Based on slug: {slug} </h1>;
}
