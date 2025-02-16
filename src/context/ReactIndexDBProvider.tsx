"use client"

// src/context/ReactIndexDBProvider.tsx
import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import { ReactIndexDBClientProps, Schema } from "../core/types";
import { ReactIndexDBClient } from "../core/react-indexdb-client";

// Define the context type
interface ReactIndexDBContextType {
	client: ReactIndexDBClientProps | null;
	error: Error | null;
}

// Create the context
const ReactIndexDBContext = createContext<ReactIndexDBContextType | null>(null);

// Provider component
export function ReactIndexDBProvider({
	children,
	dbName,
	schema,
}: {
	children: ReactNode;
	dbName: string;
	schema: Schema;
}) {
	const [client, setClient] = useState<ReactIndexDBClient | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const initDB = async () => {
			try {
				const db = new ReactIndexDBClient(dbName, schema);
				await db.connect();
				setClient(db);
			} catch (err) {
				setError(
					err instanceof Error
						? err
						: new Error("Failed to initialize DB")
				);
			}
		};

		initDB();
	}, [dbName, schema]);

	return (
		<ReactIndexDBContext.Provider value={{ client, error }}>
			{children}
		</ReactIndexDBContext.Provider>
	);
}

// Custom hook to use the ReactIndexDB context
export function useReactIndexDB() {
	const context = useContext(ReactIndexDBContext);
	if (!context) {
		throw new Error(
			"useReactIndexDB must be used within a ReactIndexDBProvider"
		);
	}
	return context;
}
