import { DatabaseError } from "../../errors";
import { ModelDefinition } from "../types";

// Delete record
export function deleteRecord(
	db: IDBDatabase,
	modelDef: ModelDefinition,
	id: any
) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(modelDef.name, "readwrite");
		const store = transaction.objectStore(modelDef.name);
		const request = store.delete(id);

		request.onsuccess = () =>
			resolve({ message: "Successfully deleted", data: request.result });
		request.onerror = () =>
			reject(new DatabaseError("Failed to delete record"));
	});
}
