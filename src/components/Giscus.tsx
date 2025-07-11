// /components/Giscus.tsx
"use client";

import { useEffect } from "react";

export default function Giscus() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", "yourname/your-repo");
        script.setAttribute("data-repo-id", "REPO_ID");
        script.setAttribute("data-category", "General");
        script.setAttribute("data-category-id", "CATEGORY_ID");
        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-theme", "light");
        script.setAttribute("crossorigin", "anonymous");
        script.async = true;
        document.getElementById("giscus-container")?.appendChild(script);
    }, []);

    return <div id="giscus-container" />;
}
