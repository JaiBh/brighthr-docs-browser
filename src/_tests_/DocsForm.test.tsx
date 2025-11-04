import DocsForm from "@/components/DocsForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Doc } from "@/lib/types";

const mockSetDocs = jest.fn();
const mockDocs: Doc[] = [
  {
    id: "123",
    type: "pdf",
    name: "Test Doc",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];
const mockFolderHistory: Doc[][] = [
  [
    {
      id: "123",
      type: "pdf",
      name: "Test Doc",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ],
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DocsForm", () => {
  it("renders all inputs and sort buttons", async () => {
    render(
      <DocsForm
        docs={mockDocs}
        setDocs={mockSetDocs}
        folderHistory={mockFolderHistory}
      ></DocsForm>
    );

    expect(screen.getByPlaceholderText(/filter by name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sort by name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sort last updated/i })
    ).toBeInTheDocument();
  });
  it("setDocs after name input change and sorting", async () => {
    const user = userEvent.setup();
    render(
      <DocsForm
        docs={mockDocs}
        setDocs={mockSetDocs}
        folderHistory={mockFolderHistory}
      ></DocsForm>
    );
    await user.type(screen.getByPlaceholderText(/filter by name/i), "legal");

    await waitFor(() => {
      expect(mockSetDocs).toHaveBeenCalled();
    });

    await user.click(screen.getByRole("button", { name: /sort by name/i }));

    await waitFor(() => {
      expect(mockSetDocs).toHaveBeenCalled();
    });

    await user.click(
      screen.getByRole("button", { name: /sort last updated/i })
    );

    await waitFor(() => {
      expect(mockSetDocs).toHaveBeenCalled();
    });
  });
});
