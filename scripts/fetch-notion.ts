// /scripts/fetch-notion.ts
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import path from "path";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const databaseId = process.env.NOTION_LOG_DB_ID as string;
const outputDir = path.join(process.cwd(), "posts");

async function fetchAndConvert() {
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    for (const page of response.results) {
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);
        const title = (page as any).properties.Name.title[0]?.plain_text || "no-title";

        fs.writeFileSync(`${outputDir}/${title}.md`, mdString);
        console.log(`✅ ${title}.md saved`);
    }
}

fetchAndConvert();
