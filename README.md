# BrightHR – Documents Browser

A simple document browser built with **Next.js, React, and TypeScript**.  
Users can view a list of folders and files, open folders, filter by filename, and sort documents.

This task was completed as part of the BrightHR Front-End Developer assessment.

---

## 🚀 Features

✅ View folders and files with type, name, and updated date  
✅ Open folders to view their contents  
✅ Back navigation to return to the previous folder  
✅ Filter by filename (1-character filter + fuzzy search for 2+ characters)  
✅ Sort by **Name** or **Last Updated**  
✅ Folder “Last Updated” is derived from its newest child file (fallback to created date)  
✅ TypeScript throughout  
✅ Unit & component tests with Jest + React Testing Library

---

## 🧠 Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **Jest + React Testing Library** for testing
- **Fuse.js** for fuzzy searching

---

## 📂 How to Run

```bash
npm install
npm run dev
```

---

## 🧪 Testing

```bash
npm test
```

Covers:

- Filtering and sorting behaviours
- Opening folders and back navigation
- Utility functions (dates & sorting rules)

---

## 📌 Implementation Notes

- **Navigation:**  
  Uses a simple **history stack (`folderHistory`)** to handle navigation. This keeps the logic clear and avoids over-engineering with routing or global state for a small app.

- **Search Behaviour:**

  - **1 character** → direct substring filter for predictable, fast results
  - **2+ characters** → **Fuse.js fuzzy search** for more flexible matching  
    This gives a good balance between precision and usability.

- **Sorting:**

  - **By Name:** Case-insensitive, and intentionally groups **folders separately from files** for a cleaner browsing experience.
  - **By Last Updated:**
    - Files sorted by `updatedAt`
    - **Folders** sorted using the **newest child's updatedAt**, with a fallback to the folder's own `createdAt` if empty  
      This mirrors how “last modified” works in real file systems.

- **Accessibility:**  
  Folder names are interactive elements with button semantics to support keyboard and screen-reader usage.

---

## 📄 Data

- Uses **mock JSON data** only (no API or server needed).
- Supports **nested folders of any depth** (`Doc` type is recursive).
- File types included: `pdf`, `doc`, `csv`, `mov`.
- Designed to resemble a realistic company document structure to showcase sorting, filtering, navigation, and testability.

---

## 🔭 If I Had More Time

- **Breadcrumb Navigation:**  
  Replace the Back button with a breadcrumb like:  
  `Home / HR / Policies / Onboarding`  
  (and support jumping directly to any level)

- **Deep Linking:**  
  Encode the current path in the URL (e.g., `?path=HR/Policies/Onboarding`) so the user can refresh or share a direct location.

- **More Robust Tests:**  
  Add edge-case tests for nested sorting, empty folders, missing dates, and invalid data shapes.

- **Keyboard Navigation:**  
  Allow navigating files/folders with arrow keys + Enter to open.

- **Performance at Scale:**  
  For very large datasets, introduce list virtualization (e.g., `react-window`) to keep rendering fast.

---

## 🤝 Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm start       # run production build
npm test        # run tests
npm run lint    # lint
```

---
