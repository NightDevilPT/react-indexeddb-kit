# react-indexeddb-kit

A TypeScript-based React IndexedDB wrapper that provides seamless CRUD operations and schema validation for your web applications.

## Features

- 🚀 Full TypeScript support
- 💾 Simple and intuitive IndexedDB operations
- 🔍 Advanced querying capabilities
- ✨ Schema validation
- 🎯 React hooks and context for easy integration
- 📦 Built-in connection management
- 🛡️ Type-safe database operations

> **Note:** Relationship data querying using `include` is coming soon! This feature will allow you to easily fetch related records across different stores. If you'd like to track this feature or report issues, please visit our [GitHub Issues](https://github.com/NightDevilPT/react-indexeddb-kit/issues).

## Installation

```bash
npm install react-indexeddb-kit
# or
yarn add react-indexeddb-kit
```

## Quick Start

### 1. Define Your Schema

```typescript
import { Schema } from 'react-indexeddb-kit';

const schema: Schema = {
  models: [
    {
      name: 'users',
      fields: {
        id: { type: 'number', required: true },
        name: { type: 'string', required: true },
        email: { type: 'string', required: true, unique: true },
        age: { type: 'number' },
        createdAt: { type: 'date', default: new Date() }
      }
    }
  ]
};
```

### 2. Set Up the Provider

```tsx
import { ReactIndexDBProvider } from 'react-indexeddb-kit';

function App() {
  return (
    <ReactIndexDBProvider dbName="myApp" schema={schema}>
      <YourComponents />
    </ReactIndexDBProvider>
  );
}
```

### 3. Use the Database in Your Components

```tsx
import { useReactIndexDB } from 'react-indexeddb-kit';

function UserComponent() {
  const { client } = useReactIndexDB();

  const createUser = async () => {
    try {
      const users = client.model('users');
      const newUser = await users.create({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      });
      console.log('User created:', newUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <button onClick={createUser}>
      Create User
    </button>
  );
}
```

## API Reference

### ReactIndexDBProvider

The provider component that initializes the database connection.

```tsx
<ReactIndexDBProvider
  dbName="myApp"
  schema={schema}
>
  {children}
</ReactIndexDBProvider>
```

### useReactIndexDB

A hook to access the IndexedDB client within components.

```typescript
const { client, error } = useReactIndexDB();
```

### Database Operations

#### Create

```typescript
const newRecord = await client.model('modelName').create({
  field1: 'value1',
  field2: 'value2'
});
```

#### Find Many

```typescript
const records = await client.model('modelName').findMany({
  where: { field: 'value' },
  orderBy: { field: 'fieldName', direction: 'asc' },
  limit: 10,
  skip: 0,
  select: { field1: true, field2: true }
});
```

#### Find Unique

```typescript
const record = await client.model('modelName').findUnique(id, {
  select: { field1: true, field2: true }
});
```

#### Update

```typescript
const updatedRecord = await client.model('modelName').update(id, {
  field1: 'newValue'
});
```

#### Delete

```typescript
await client.model('modelName').delete(id);
```

## Query Options

The `findMany` method supports various query options:

```typescript
interface QueryOptions {
  where?: Record<string, any>;           // Filter conditions
  include?: string[];                    // Related records to include
  orderBy?: {                           // Sorting options
    field: string;
    direction: 'asc' | 'desc';
  };
  skip?: number;                        // Pagination offset
  limit?: number;                       // Pagination limit
  select?: Record<string, true>;        // Fields to select
}
```

## Schema Definition

```typescript
interface Schema {
  models: ModelDefinition[];
}

interface ModelDefinition {
  name: string;
  fields: Record<string, FieldDefinition>;
}

interface FieldDefinition {
  type: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
  required?: boolean;
  unique?: boolean;
  default?: any;
  references?: {
    model: string;
    field: string;
  };
}
```

## Error Handling

The package provides two main error types:

- `DatabaseError`: For database operation failures
- `ValidationError`: For schema validation failures

```typescript
try {
  await client.model('users').create(userData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  } else if (error instanceof DatabaseError) {
    console.error('Database operation failed:', error.message);
  }
}
```

## License

MIT © [NightDevilPT]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.