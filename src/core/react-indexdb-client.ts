import { DatabaseError } from "../errors";
import { ReactIndexDBModel } from "./react-indexdb-modal";
import { Schema, ReactIndexDBModelProps } from "./types";

export class ReactIndexDBClient {
    private dbName: string;
    private version: number;
    private schema: Schema;
    private db: IDBDatabase | null = null;
    private models: Map<string, ReactIndexDBModelProps> = new Map();

    constructor(dbName: string, schema: Schema, version: number = 1) {
        this.dbName = dbName;
        this.schema = schema;
        this.version = version;
    }

    /**
     * Ensure database is available before performing any operations.
     */
    async ensureDatabase(): Promise<void> {
        if (this.db) return; // If DB is already available, return
        await this.connect();
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                this.createStores(db);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.initializeModels();
                resolve();
            };

            request.onerror = () => {
                reject(new DatabaseError("Failed to connect to IndexedDB"));
            };
        });
    }

    private createStores(db: IDBDatabase) {
        this.schema.models.forEach((model) => {
            if (!db.objectStoreNames.contains(model.name)) {
                const store = db.createObjectStore(model.name, {
                    keyPath: "id",
                    autoIncrement: true,
                });

                // Create indexes for unique fields
                Object.entries(model.fields).forEach(([fieldName, definition]) => {
                    if (definition.unique) {
                        store.createIndex(`${fieldName}_unique`, fieldName, { unique: true });
                    }
                });
            }
        });
    }

    private initializeModels() {
        if (!this.db) throw new DatabaseError("Database not initialized");

        this.schema.models.forEach((modelDef) => {
            this.models.set(modelDef.name, new ReactIndexDBModel(this, modelDef)); // ✅ Pass `this` instead of `this.db`
        });
    }

    getDatabase(): IDBDatabase | null {
        return this.db;
    }

    getSchema(): Schema {
        return this.schema;
    }

    model(name: string): ReactIndexDBModelProps {
        if (!this.db) throw new DatabaseError("Database not initialized");
        
        const model = this.models.get(name);
        if (!model) throw new DatabaseError(`Model ${name} not found`);
        return model;
    }
}
