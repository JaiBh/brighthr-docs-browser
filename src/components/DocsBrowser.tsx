"use client";

import { Doc } from "@/lib/types";
import mockDocs from "@/data/docs.json";
import { useState } from "react";
import DocsForm from "./DocsForm";
import { sortDocs } from "@/lib/utils";

function DocsBrowser() {
  const [allDocs] = useState(mockDocs as Doc[]);
  const sortedDocs = sortDocs("a-z", allDocs);
  const [docs, setDocs] = useState<Doc[]>(sortedDocs);

  return (
    <section className="section-center mt-8 p-4 border rounded-md">
      <DocsForm docs={docs} setDocs={setDocs}></DocsForm>
      {docs.map((doc) => (
        <div key={doc.name}>
          {doc.type} {doc.name} {doc.type !== "folder" && doc.updatedAt}
        </div>
      ))}
    </section>
  );
}
export default DocsBrowser;
