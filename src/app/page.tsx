// /app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/getAllPosts";

export default async function Home() {
    const posts = getAllPosts(); // ✅ 서버 컴포넌트니까 가능

    return (
        <main>
            <h1>📚 My Notion Blog</h1>
            <ul>
                {posts.map(({ slug, title }) => (
                    <li key={slug}>
                        <Link href={`/posts/${slug}`}>{title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
