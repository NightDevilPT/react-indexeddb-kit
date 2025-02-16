import { DatabaseError } from "../../errors";
import { ModelDefinition } from "../types";

// Update record
export function update(
	db: IDBDatabase,
	modelDef: ModelDefinition,
	id: any,
	data: Record<string, any>
) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(modelDef.name, "readwrite");
		const store = transaction.objectStore(modelDef.name);
		const request = store.put({ ...data, id });

		request.onsuccess = () => resolve(request.result);
		request.onerror = () =>
			reject(new DatabaseError("Failed to update record"));
	});
}
