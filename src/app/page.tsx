// /app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/notion";

export default async function Home() {
    const posts = await getAllPosts();

    return (
        <main style={{ maxWidth: "720px", margin: "40px auto", padding: "0 20px" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>📚 yoonhr's dev log</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {posts.map(({ id, slug, title, createdAt }) => (
                    <li
                        key={id}
                        style={{
                            marginBottom: "2rem",
                            paddingBottom: "1rem",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <Link
                            href={`/posts/${slug}`}
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                color: "#333",
                            }}
                        >
                            {title}
                        </Link>
                        <p style={{ fontSize: "0.875rem", color: "#999", marginTop: "0.25rem" }}>
                            {new Date(createdAt).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
