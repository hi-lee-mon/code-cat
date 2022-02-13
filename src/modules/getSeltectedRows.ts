import { GridSelectionModel } from "@mui/x-data-grid";
import { FetchedBook } from "../types/book";

export const getSeltectedRows = <T extends { id: string }>(rows: T[], ids: GridSelectionModel) => rows.filter((row) => ids.includes(row.id));