"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogMetadata[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary font-serif">
        My Blog
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Thoughts, stories, and learnings I’ve gathered over the years ✨
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-gray-300 bg-white shadow hover:shadow-lg transition overflow-hidden"
          >
            {post.coverImage && (
              <div className="relative w-full h-48">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {post.date}
              </p>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
