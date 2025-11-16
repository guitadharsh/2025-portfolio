import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { params } = context;
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const post = await getPostBySlug(slug);
    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
