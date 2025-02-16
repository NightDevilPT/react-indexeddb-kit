import { DatabaseError } from "../../errors";
import { ModelDefinition, QueryOptions } from "../types";

// Find a single record by ID with optional selection
export function findUnique(
	db: IDBDatabase,
	modelDef: ModelDefinition,
	id: any,
	options?: QueryOptions
) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(modelDef.name, "readonly");
		const store = transaction.objectStore(modelDef.name);
		const request = store.get(id);

		request.onsuccess = () => {
			let result = request.result || null;

			// Apply selection based on { fieldName: true } format
			if (result && options?.select) {
				result = Object.fromEntries(
					Object.entries(result).filter(
						([key]) => options.select![key]
					)
				);
			}

			resolve(result);
		};

		request.onerror = () =>
			reject(new DatabaseError("Failed to fetch record"));
	});
}
