// /lib/notion.ts
import { Client } from "@notionhq/client";
import slugify from "slugify";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPostBySlug(slug: string) {
    const db = await notion.databases.query({
        database_id: process.env.NOTION_LOG_DB_ID!,
    });

    const page = db.results.find((page: any) => {
        const title = page.properties.title?.title?.[0]?.plain_text ?? "";
        return slugify(title, { lower: true, strict: true }) === slug;
    });

    if (!page) return null;

    const blocks = await notion.blocks.children.list({ block_id: page.id });

    return {
        title: page.properties.title.title[0].plain_text,
        blocks: blocks.results,
    };
}

export async function getAllPosts() {
    const db = await notion.databases.query({
        database_id: process.env.NOTION_LOG_DB_ID!,
    });

    return db.results.map((page: any) => {
        const title = page.properties.title?.title?.[0]?.plain_text ?? "untitled";
        const slug = slugify(title, { lower: true, strict: true });
        const createdAt = page.created_time;

        return {
            id: page.id,
            slug,
            title,
            createdAt,
        };
    });
}
