import { GridSelectionModel } from "@mui/x-data-grid";

export const getSeltectedRows = <T extends { id: string }>(rows: T[], ids: GridSelectionModel) => rows.filter((row) => ids.includes(row.id));