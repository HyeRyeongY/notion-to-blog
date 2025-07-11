// /app/posts/[slug]/page.tsx
import { getPostBySlug } from "@/lib/notion";
import NotionContent from "@/components/NotionContent";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return notFound();

    return (
        <article style={{ maxWidth: "720px", margin: "40px auto", padding: "0 20px" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>{post.title}</h1>
            <NotionContent blocks={post.blocks} />
        </article>
    );
}
