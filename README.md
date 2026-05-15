# ItsDone ✔️

A high-performance, full-stack task management application featuring a bold neo-brutalist UI, optimistic state updates, and a rock-solid relational database architecture.

## 🚀 Tech Stack

* **Frontend:** Next.js 16 (App Router) & React
* **Styling:** Tailwind CSS (Neo-Brutalist aesthetic)
* **Authentication:** NextAuth.js
* **Backend / Database:** Supabase (PostgreSQL)

## ✨ Key Features

* **Neo-Brutalist UI:** A highly tactile, high-contrast interface with hard shadows, thick borders, and animated interactive elements.
* **Stale-While-Revalidate Caching:** Lists load instantly from local storage while a silent background sync checks the database for updates, ensuring zero layout shift and maximum speed.
* **Optimistic UI Updates:** Task toggling and deletions update on the screen instantly before the database confirms the transaction, making the app feel incredibly responsive.
* **Relational Data Modeling:** seamless linking between `todo_lists` and `todo_tasks` using PostgreSQL Foreign Keys, bypassing the need for physical arrays in the parent table.
* **Automated Database Triggers:** Custom PostgreSQL functions utilize the `moddatetime` extension to automatically track caching timestamps for deeply nested task relationships.
