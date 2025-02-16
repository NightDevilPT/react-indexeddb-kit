// Export core types
export type {
    Schema,
    ModelDefinition,
    FieldDefinition,
    QueryOptions,
    ReactIndexDBClientProps,
    ReactIndexDBModelProps,
} from "./types";

// Export main IndexedDB client
export { ReactIndexDBClient } from "./react-indexdb-client";
export { ReactIndexDBModel } from "./react-indexdb-modal";

// Export validation logic
export { validateData } from "./validation/validation";

// Export IndexedDB CRUD operations
export { create } from "./db-operations/create";
export { update } from "./db-operations/update";
export { deleteRecord } from "./db-operations/delete";
export { findMany } from "./db-operations/findMany";
export { findUnique } from "./db-operations/find-unique";
