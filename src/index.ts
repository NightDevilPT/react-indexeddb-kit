// Export types for better TypeScript support
export type {
    Schema,
    ModelDefinition,
    FieldDefinition,
    QueryOptions,
    ReactIndexDBClientProps,
    ReactIndexDBModelProps,
} from "./core/types";

// Export hooks
export { useIndexedDB } from "./hooks/useIndexedDB";

// Export validation function
export { validateData } from "./core/validation/validation";

// Export error handling
export { DatabaseError, ValidationError } from "./errors";

// Export core functionalities
export { ReactIndexDBClient, ReactIndexDBModel } from "./core";

// Export IndexedDB operations (CRUD)
export { create, update, deleteRecord, findMany, findUnique } from "./core";

// Export provider and hook for React context
export { ReactIndexDBProvider, useReactIndexDB } from "./context/ReactIndexDBProvider";

