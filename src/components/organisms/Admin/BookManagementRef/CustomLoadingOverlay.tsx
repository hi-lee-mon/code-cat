import { LinearProgress } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";

export const CustomLoadingOverlay = () => {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}