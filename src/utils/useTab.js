import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function useTab() {
  const [alignment, setAlignment] = React.useState("Ethereum");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return [
    alignment,
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="Ethereum">Ethereum</ToggleButton>
      <ToggleButton value="Solana">Solana</ToggleButton>
    </ToggleButtonGroup>,
  ];
}
