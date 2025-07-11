// /app/posts/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Giscus from "@/components/Giscus";

type Props = {
    params: { slug: string };
};

export async function generateStaticParams() {
    const postsDir = path.join(process.cwd(), "posts");
    const filenames = fs.readdirSync(postsDir);

    return filenames.map((filename) => ({
        slug: filename.replace(".md", ""),
    }));
}

export default async function PostPage({ params }: Props) {
    const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return (
        <main>
            <h1>{data.title || params.slug}</h1>
            <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <Giscus />
        </main>
    );
}
