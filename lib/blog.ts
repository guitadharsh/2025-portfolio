import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blogs");

export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

export async function getAllPosts(): Promise<BlogMetadata[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts: BlogMetadata[] = [];

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data } = matter(fileContent);

    // Ensure all required frontmatter fields exist
    const post: BlogMetadata = {
      slug: filename.replace(".md", ""),
      title: data.title || "No title",
      date: data.date || "No date",
      excerpt: data.excerpt || "No excerpt",
      coverImage: data.coverImage || "",
    };

    posts.push(post);
  }

  return posts;
}


// Async version of getPostBySlug
export async function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return { metadata: data as BlogMetadata, content };
  } catch (err) {
    console.error("Error reading file:", filePath, err);
    throw err;
  }
}

