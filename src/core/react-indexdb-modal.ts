import { DatabaseError, ValidationError, ReactIndexDBError } from "../errors";
import { create } from "./db-operations/create";
import { deleteRecord } from "./db-operations/delete";
import { findUnique } from "./db-operations/find-unique";
import { findMany } from "./db-operations/findMany";
import { update } from "./db-operations/update";
import { ModelDefinition, QueryOptions } from "./types";
import { validateData } from "./validation/validation";
import { ReactIndexDBClient } from "./react-indexdb-client";

export class ReactIndexDBModel {
    private dbClient: ReactIndexDBClient;
    private modelDef: ModelDefinition;

    constructor(dbClient: ReactIndexDBClient, modelDef: ModelDefinition) {
        this.dbClient = dbClient;
        this.modelDef = modelDef;
    }

    /**
     * Ensure the database is connected before performing any operation.
     */
    private async ensureDatabase(): Promise<IDBDatabase> {
        await this.dbClient.ensureDatabase(); // ✅ Ensures the DB is connected
        const db = this.dbClient.getDatabase();
        if (!db) {
            throw new DatabaseError("Database is not initialized");
        }
        return db;
    }

    /**
     * Create a new record in IndexedDB after validating the data.
     * @param data - The record data to insert.
     * @returns The inserted record ID.
     */
    async create(data: Record<string, any>): Promise<any> {
        try {
            const db = await this.ensureDatabase(); // ✅ Ensures DB before proceeding

            // Validate data before inserting
            const validatedData = validateData(data, this.modelDef, this.dbClient.getSchema());
            return await create(db, this.modelDef, validatedData);
        } catch (error: unknown) {
            throw this.handleError(error);
        }
    }

    /**
     * Update an existing record after validating the data.
     * @param id - The ID of the record to update.
     * @param data - The updated record data.
     * @returns The updated record ID.
     */
    async update(id: any, data: Record<string, any>): Promise<any> {
        try {
            const db = await this.ensureDatabase(); // ✅ Ensures DB before proceeding

            // Validate data before updating
            const validatedData = validateData(data, this.modelDef, this.dbClient.getSchema());
            return await update(db, this.modelDef, id, validatedData);
        } catch (error: unknown) {
            throw this.handleError(error);
        }
    }

    /**
     * Delete a record by ID.
     * @param id - The ID of the record to delete.
     * @returns A confirmation message.
     */
    async delete(id: any): Promise<any> {
        try {
            const db = await this.ensureDatabase(); // ✅ Ensures DB before proceeding
            return await deleteRecord(db, this.modelDef, id);
        } catch (error: unknown) {
            throw this.handleError(error);
        }
    }

    /**
     * Retrieve multiple records with optional query filters.
     * @param options - Query options such as filters, pagination, sorting, etc.
     * @returns An array of matching records.
     */
    async findMany(options?: QueryOptions): Promise<any> {
        try {
            const db = await this.ensureDatabase(); // ✅ Ensures DB before proceeding
            return await findMany(db, this.modelDef, options);
        } catch (error: unknown) {
            throw this.handleError(error);
        }
    }

    /**
     * Find a single record by ID.
     * @param id - The ID of the record to retrieve.
     * @param options - Query options for selecting specific fields.
     * @returns The found record or null.
     */
    async findUnique(id: any, options?: QueryOptions): Promise<any | null> {
        try {
            const db = await this.ensureDatabase(); // ✅ Ensures DB before proceeding
            return await findUnique(db, this.modelDef, id, options);
        } catch (error: unknown) {
            throw this.handleError(error);
        }
    }

    /**
     * Handles unknown errors and ensures they are transformed into a proper `ReactIndexDBError`.
     * @param error - The caught error.
     * @returns {ReactIndexDBError} - A formatted error.
     */
    private handleError(error: unknown): ReactIndexDBError {
        if (error instanceof ValidationError || error instanceof DatabaseError) {
            return error; // Already a known error, rethrow it
        }
        return new DatabaseError(error instanceof Error ? error.message : "An unknown error occurred");
    }
}
