import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Doc } from "@/lib/types";
import DocsList from "@/components/DocsList";
import { useState } from "react";

const rootDocs: Doc[] = [
  {
    id: "123",
    type: "pdf",
    name: "Test Doc",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "456",
    type: "folder",
    name: "Test Folder",
    createdAt: "2024-02-02",
    files: [],
  },
];

function Harness() {
  const [docs, setDocs] = useState<Doc[]>(rootDocs);
  const [folderHistory, setFolderHistory] = useState<Doc[][]>([rootDocs]);
  return (
    <DocsList
      docs={docs}
      setDocs={setDocs}
      folderHistory={folderHistory}
      setFolderHistory={setFolderHistory}
    />
  );
}

describe("DocsList", () => {
  it("renders folders, files and back button", async () => {
    render(<Harness></Harness>);

    expect(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/test doc/i));
    expect(screen.getByRole("button", { name: /test folder/i }));
  });

  it("opens folder and goes back", async () => {
    const user = userEvent.setup();
    render(<Harness></Harness>);
    await user.click(screen.getByRole("button", { name: /test folder/i }));

    expect(screen.queryByText(/test doc/i)).toBeNull();

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/test doc/i)).toBeInTheDocument();
  });
});
