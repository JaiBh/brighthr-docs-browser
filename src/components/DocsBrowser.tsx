"use client";

import { Doc } from "@/lib/types";
import mockDocs from "@/data/docs.json";
import { useState } from "react";
import DocsForm from "./DocsForm";
import { sortDocs } from "@/lib/utils";
import DocsList from "./DocsList";

function DocsBrowser() {
  const [allDocs] = useState(mockDocs as Doc[]);
  const sortedDocs = sortDocs("a-z", allDocs);
  const [docs, setDocs] = useState<Doc[]>(sortedDocs);
  const [stack, setStack] = useState<Doc[][]>([]);

  return (
    <section className="section-center mt-8 p-4 border rounded-md">
      <DocsForm docs={docs} setDocs={setDocs}></DocsForm>
      <DocsList
        docs={docs}
        setDocs={setDocs}
        stack={stack}
        setStack={setStack}
      ></DocsList>
    </section>
  );
}
export default DocsBrowser;
