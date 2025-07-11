// /lib/getAllPosts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
    slug: string;
    title: string;
};

export function getAllPosts(): PostMeta[] {
    const postsDir = path.join(process.cwd(), "posts");
    const filenames = fs.readdirSync(postsDir).filter((file) => {
        const fullPath = path.join(postsDir, file);
        return fs.statSync(fullPath).isFile() && file.endsWith(".md");
    });

    return filenames.map((filename) => {
        const file = fs.readFileSync(path.join(postsDir, filename), "utf-8");
        const { data } = matter(file);
        return {
            slug: filename.replace(".md", ""),
            title: data.title || filename.replace(".md", ""),
        };
    });
}
