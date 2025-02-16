// src/errors/index.ts

/**
 * Custom error for database-related issues.
 */
export class DatabaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DatabaseError";
		Object.setPrototypeOf(this, DatabaseError.prototype);
	}
}

/**
 * Custom error for validation issues.
 */
export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

/**
 * Type to represent different error categories.
 */
export type ReactIndexDBError = DatabaseError | ValidationError;
