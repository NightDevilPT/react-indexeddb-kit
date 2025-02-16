// src/core/types.ts

// Field types supported by the ORM
export type FieldType =
	| "string"
	| "number"
	| "boolean"
	| "date"
	| "object"
	| "array";

// Field definition for a model
export interface FieldDefinition {
	type: FieldType;
	required?: boolean;
	unique?: boolean;
	default?: any;
	references?: {
		model: string;
		field: string;
	};
}

// Model definition
export interface ModelDefinition {
	name: string;
	fields: Record<string, FieldDefinition>;
}

// Schema definition (collection of models)
export interface Schema {
	models: ModelDefinition[];
}

// Query options for findMany and findUnique
export interface QueryOptions {
    where?: Record<string, any>;
    include?: string[];
    orderBy?: { field: string; direction: "asc" | "desc" };
    skip?: number;
    limit?: number;
    select?: Record<string, true>; // Updated select to be an object with true values
}

// Type for the ReactIndexDB client
export interface ReactIndexDBClientProps {
	connect: () => Promise<void>;
	model: (name: string) => ReactIndexDBModelProps;
}

// Type for the ReactIndexDB model
export interface ReactIndexDBModelProps {
	create: (data: Record<string, any>) => Promise<any>;
	findMany: (options?: QueryOptions) => Promise<any[]>;
	findUnique: (id: any, options?: QueryOptions) => Promise<any>;
	update: (id: any, data: Record<string, any>) => Promise<any>;
	delete: (id: any) => Promise<void>;
}
