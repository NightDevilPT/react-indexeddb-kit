import { DatabaseError } from "../../errors";
import { ModelDefinition, QueryOptions } from "../types";

// Find multiple records with optional filtering and selection
export function findMany(
    db: IDBDatabase,
    modelDef: ModelDefinition,
    options?: QueryOptions
) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(modelDef.name, "readonly");
        const store = transaction.objectStore(modelDef.name);
        const request = store.getAll();

        request.onsuccess = () => {
            let results = request.result;

            // Apply filtering
            if (options?.where) {
                results = results.filter((item: any) =>
                    Object.entries(options.where!).every(([key, value]) => item[key] === value)
                );
            }

            // Apply sorting
            if (options?.orderBy) {
                const { field, direction } = options.orderBy;
                results.sort(
                    (a: any, b: any) =>
                        (a[field] < b[field] ? -1 : 1) * (direction === "asc" ? 1 : -1)
                );
            }

            // Apply pagination
            if (options?.skip !== undefined) {
                results = results.slice(options.skip);
            }
            if (options?.limit !== undefined) {
                results = results.slice(0, options.limit);
            }

            // Apply selection based on { fieldName: true } format
            if (options?.select) {
                results = results.map((item: any) =>
                    Object.fromEntries(
                        Object.entries(item).filter(([key]) => options.select![key])
                    )
                );
            }

            resolve(results);
        };

        request.onerror = () => reject(new DatabaseError("Failed to fetch records"));
    });
}
