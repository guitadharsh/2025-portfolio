// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";

// interface BlogMetadata {
//   slug: string;
//   title: string;
//   date: string;
//   excerpt: string;
//   coverImage?: string;
// }

// interface BlogPost {
//   metadata: BlogMetadata;
//   content: string;
// }

// export default function BlogPostPage() {
//   const { slug } = useParams();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!slug) return;

//     setLoading(true);
//     setError(null);

//     fetch(`/api/blog/${slug}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Post not found");
//         return res.json();
//       })
//       .then((data) => setPost(data))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [slug]);

//   if (loading) return <p>Loading...</p>;
//   if (error || !post || !post.metadata) return <p>{error || "Post not found"}</p>;

//   return (
//     <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
//       {post.metadata.coverImage && (
//         <div className="relative w-full h-64 mb-6">
//           <Image
//             src={post.metadata.coverImage}
//             alt={post.metadata.title}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-4 text-primary">{post.metadata.title}</h1>
//       <p className="text-sm text-[#8b7a67] mb-6">{post.metadata.date}</p>
//       <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

interface BlogPost {
  metadata: BlogMetadata;
  content: string;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center mt-16 text-gray-500">Loading...</p>;
  if (error || !post || !post.metadata) return <p className="text-center mt-16 text-red-500">{error || "Post not found"}</p>;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-20 py-16 max-w-5xl mx-auto">
      {/* Cover Image */}
      {post.metadata.coverImage && (
        <div className="relative w-full h-80 mb-10 rounded-lg overflow-hidden shadow-md">
          <Image
            src={post.metadata.coverImage}
            alt={post.metadata.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Title & Date */}
      <h1 className="text-4xl font-extrabold mb-2 leading-tight text-gray-900">{post.metadata.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{post.metadata.date}</p>

      {/* Markdown Content */}
      <article className="prose prose-lg sm:prose-xl max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            img: ({ node, ...props }: any) => (
              <Image
                src={props.src as string}
                alt={props.alt || ""}
                width={800}
                height={450}
                className="rounded-lg my-6"
              />
            ),
            a: ({ node, ...props }: any) => (
              <a
                {...props}
                className="text-blue-600 hover:underline break-words"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code: ({ node, inline, className, children, ...props }: any) => {
              const codeText = String(children).replace(/\n$/, "");
              return !inline ? (
                <div className="relative my-4">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                  <button
                    onClick={() => handleCopy(codeText)}
                    className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Copy
                  </button>
                </div>
              ) : (
                <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded text-sm">{children}</code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
