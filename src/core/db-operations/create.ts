import { DatabaseError } from "../../errors";
import { ModelDefinition } from "../types";

// Create record
export function create(db: IDBDatabase, modelDef: ModelDefinition, data: Record<string, any>) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(modelDef.name, "readwrite");
        const store = transaction.objectStore(modelDef.name);
        const request = store.add(data);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new DatabaseError("Failed to create record"));
    });
}
