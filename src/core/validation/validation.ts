import { ValidationError } from "../../errors";
import { ModelDefinition, Schema } from "../types";

export function validateData(
    data: Record<string, any>,
    modelDef: ModelDefinition,
    schema: Schema
): Record<string, any> {
    const validatedData: Record<string, any> = {};

    Object.entries(modelDef.fields).forEach(([fieldName, definition]) => {
        const fieldValue = data[fieldName];

        // Check if the field is required and the value is undefined
        if (definition.required && fieldValue === undefined) {
            throw new ValidationError(`Field '${fieldName}' is required`);
        }

        // If the field has a default value and is missing, set the default
        if (fieldValue === undefined && definition.default !== undefined) {
            validatedData[fieldName] = definition.default;
            return;
        }

        // Complex type checks for 'array' and 'object'
        if (fieldValue !== undefined) {
            if (definition.type === "array" && !Array.isArray(fieldValue)) {
                throw new ValidationError(`Field '${fieldName}' must be an array`);
            }

            if (definition.type === "object" && typeof fieldValue !== "object") {
                throw new ValidationError(`Field '${fieldName}' must be an object`);
            }

            // Check for 'date' type
            if (definition.type === "date" && !(fieldValue instanceof Date)) {
                throw new ValidationError(`Field '${fieldName}' must be a Date`);
            }

            // Check basic types
            if (
                definition.type !== "array" &&
                definition.type !== "object" &&
                definition.type !== "date" &&
                typeof fieldValue !== definition.type
            ) {
                throw new ValidationError(`Field '${fieldName}' must be of type ${definition.type}`);
            }

            // If the field passes validation, include it in validated data
            validatedData[fieldName] = fieldValue;
        }
    });

    // Prevent extra fields that are not part of the model
    Object.keys(data).forEach((key) => {
        if (!modelDef.fields[key]) {
            throw new ValidationError(`Field '${key}' is not defined in the schema`);
        }
    });

    return validatedData;
}
