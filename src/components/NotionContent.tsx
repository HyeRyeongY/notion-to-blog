// /components/NotionContent.tsx
import Image from "next/image";

/**
 * Notion block renderer (supports: paragraph, heading, list, quote, code, callout, table, bookmark, image, etc.)
 */
export default function NotionContent({ blocks }: { blocks: any[] }) {
    if (!blocks || blocks.length === 0) return <p>콘텐츠가 없습니다.</p>;

    return (
        <div className="notion-content">
            {blocks.map((block) => {
                const key = block.id;
                const type = block.type;
                const value = block[type];
                const text = value?.rich_text?.map((t: any) => t.plain_text).join("") ?? "";

                switch (type) {
                    case "paragraph":
                        return <p key={key}>{text}</p>;

                    case "heading_1":
                        return <h1 key={key}>{text}</h1>;
                    case "heading_2":
                        return <h2 key={key}>{text}</h2>;
                    case "heading_3":
                        return <h3 key={key}>{text}</h3>;

                    case "bulleted_list_item":
                    case "numbered_list_item":
                        return <li key={key}>{text}</li>;

                    case "quote":
                        return <blockquote key={key}>{text}</blockquote>;

                    case "code":
                        return (
                            <pre key={key} style={{ background: "#111", color: "#eee", padding: "1rem", borderRadius: "6px" }}>
                                <code>{text}</code>
                            </pre>
                        );

                    case "callout":
                        return (
                            <div key={key} style={{ background: "#f1f3f5", padding: "1rem", borderLeft: "4px solid #555", margin: "1rem 0" }}>
                                {value.icon?.emoji && <span style={{ marginRight: "0.5rem" }}>{value.icon.emoji}</span>}
                                {text}
                            </div>
                        );

                    case "table":
                        return (
                            <table key={key} border={1} cellPadding={6}>
                                <tbody>
                                    {value.rows?.map((row: any, rowIndex: number) => (
                                        <tr key={rowIndex}>
                                            {row.cells.map((cell: any[], colIndex: number) => (
                                                <td key={colIndex}>{cell.map((t) => t.plain_text).join("")}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );

                    case "bookmark":
                        return (
                            <a key={key} href={value.url} target="_blank" rel="noopener noreferrer">
                                🔗 {value.url}
                            </a>
                        );

                    case "image":
                        const src = value.type === "external" ? value.external.url : value.file.url;
                        const caption = value.caption?.[0]?.plain_text;
                        return (
                            <figure key={key} style={{ margin: "2rem 0" }}>
                                <Image src={src} alt={caption || "image"} width={600} height={400} style={{ width: "100%", height: "auto" }} />
                                {caption && <figcaption style={{ textAlign: "center", color: "#666" }}>{caption}</figcaption>}
                            </figure>
                        );

                    default:
                        return (
                            <p key={key} style={{ opacity: 0.5 }}>
                                [지원되지 않는 블럭: {type}]
                            </p>
                        );
                }
            })}
        </div>
    );
}
