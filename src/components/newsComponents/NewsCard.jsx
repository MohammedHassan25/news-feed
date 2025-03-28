import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export function NewsCard({ article }) {
  return (
    <StyledCard>
      <CardActionArea>
        {article.image && (
          <CardMedia
            component="img"
            height="200"
            image={article.image}
            alt={article.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {article.title}
          </Typography>
          {article.description && (
            <Typography variant="body2" color="textSecondary">
              {article.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {article.author}
        </Typography>
        {article.publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
