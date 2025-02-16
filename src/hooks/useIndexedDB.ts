// src/hooks/useIndexedDB.ts
import { ReactIndexDBClient, ReactIndexDBClientProps, Schema } from "../core";
import { useState, useEffect } from "react";

export const useIndexedDB = (dbName: string, schema: Schema) => {
	const [client, setClient] = useState<ReactIndexDBClientProps | null>(null);

	useEffect(() => {
		const db = new ReactIndexDBClient(dbName, schema);
		db.connect().then(() => setClient(db));
	}, [dbName, schema]);

	return client;
};