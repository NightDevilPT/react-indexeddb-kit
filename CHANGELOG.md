# 📌 Changelog

All notable changes to this project will be documented in this file.

---

## **[1.0.0]** - *2025-01-16*
### 🚀 **Initial Release**  
This is the first stable release of `react-indexeddb-kit`, a **TypeScript-based IndexedDB wrapper** for React. It provides a simple, efficient, and structured way to interact with IndexedDB using CRUD operations and a React Context API.

---

## ✨ **Features Added**

### ✅ **Core IndexedDB CRUD Operations**
- **`create(data: object)`** → Inserts a new record into the database.
- **`update(id: any, data: object)`** → Updates an existing record by ID.
- **`delete(id: any)`** → Deletes a record from the database.
- **`findMany(options?: QueryOptions)`** → Retrieves multiple records with optional filtering.
- **`findUnique(id: any, options?: QueryOptions)`** → Finds a single record by its ID.

---

### 🔄 **Database Connection Management**
- Implemented `ReactIndexDBClient` to manage IndexedDB connections.
- Automatically ensures the database is **initialized before performing any operations**.
- Uses an **asynchronous connection** mechanism with IndexedDB.

---

### 🔗 **React Context API Integration**
- Introduced **`ReactIndexDBProvider`** to easily integrate IndexedDB into React applications.
- Provides a **global IndexedDB client instance** for seamless data management.
- `useReactIndexDB()` hook to access database functions inside React components.

---

### 🛠 **TypeScript Support**
- Full TypeScript support with **strict typing** for schema, queries, and model interactions.
- Defined **TypeScript interfaces** for IndexedDB operations:
  - `Schema`
  - `ModelDefinition`
  - `FieldDefinition`
  - `QueryOptions`
  - `ReactIndexDBClientProps`
  - `ReactIndexDBModelProps`

---

### 🏗 **Schema-Based IndexedDB Configuration**
- Allows **custom schema definitions** via `ReactIndexDBProvider`.
- Supports:
  - **Data validation** before inserting or updating records.
  - **Default values** for missing fields.
  - **Unique field constraints** with IndexedDB indexes.

---

### ⚡ **Optimized Query System**
- Implemented **sorting (`orderBy`)**, **pagination (`limit`, `skip`)**, and **filtering (`where`)** for `findMany()`.
- Query options provide an **efficient** way to retrieve data.

---

### 🔥 **Performance & Stability Enhancements**
- **Lazy database initialization** to improve app startup time.
- **Auto-reconnect** mechanism for IndexedDB failures.
- **Efficient IndexedDB transactions** for batch operations.

---

### 🛠 **Error Handling & Validation**
- Custom error classes for better debugging:
  - `DatabaseError`
  - `ValidationError`
- Ensures **data integrity** by validating schema before performing operations.

---

### 📂 **Project Structure**
```bash
react-indexeddb-kit/
    ├── CHANGELOG.md
    ├── copy.js
    ├── frontend.txt
    ├── package.json
    ├── tsconfig.json
    ├── webpack.config.js
    ├── .npmignore
    └── src/
        ├── index.ts
        ├── context/
        │   └── ReactIndexDBProvider.tsx
        ├── core/
        │   ├── index.ts
        │   ├── react-indexdb-client.ts
        │   ├── react-indexdb-modal.ts
        │   ├── types.ts
        │   ├── db-operations/
        │   │   ├── create.ts
        │   │   ├── delete.ts
        │   │   ├── find-unique.ts
        │   │   ├── findMany.ts
        │   │   └── update.ts
        │   └── validation/
        │       └── validation.ts
        ├── errors/
        │   └── index.ts
        └── hooks/
            └── useIndexedDB.ts
```
----

## 🎯 **Future Enhancements (Planned for v1.1.0)**
- 🔥 **Batch operations** (Bulk insert, update, delete).
- 📡 **IndexedDB sync support** for real-time data updates.
- 📊 **IndexedDB query optimization** for large datasets.
- 🛡 **Enhanced security features** like data encryption.
- ⚡ **Performance benchmarking** and further optimizations.

---

Now, you're all set with a **detailed change log** for `v1.0.0`! 🚀

> Need help managing versions? Use:
> ```sh
> npm version patch    # For minor fixes
> npm version minor    # For new features (backward compatible)
> npm version major    # For breaking changes
> ```
> Then push it using:
> ```sh
> git push --tags
> npm publish
> ```
