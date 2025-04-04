import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export const LoadingArticles = React.memo(function LoadingArticles() {
  return (
    <StyledCard>
      <CardActionArea>
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
      </Box>
    </StyledCard>
  );
});
