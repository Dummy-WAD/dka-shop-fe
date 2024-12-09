import { Box, Typography, Button, Rating } from "@mui/material";
import { Add } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import { get } from "lodash";
import { handleCreateReview } from "../../api/review";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const CreateReview = ({ product, handleClose, onGetOrderDetail }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(-1);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { color, size, productName, orderItemId } = product;

  if (!orderItemId) return null;

  const handleSubmit = () => {
    const createReview = async () => {
      try {
        setIsLoading(true);
        await handleCreateReview({
          orderItemId,
          rating,
          ...(reviewText.trim() !== "" && { reviewText })
        });
        setIsLoading(false);
        await onGetOrderDetail()
        handleClose();
      } catch (err) {
        toast.error(get(err, "response.data.message", "Submit review failed"));
        setIsLoading(false);
      }
    };
    createReview();
  };

  return (
    <Box sx={{ width: "500px" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        Review product
      </Typography>
      <Box sx={{display: "flex", flexDirection: "column", rowGap: "10px", my: "1.2rem"}}>
        <div>Product: {productName}</div>
        <div>Size: {size}</div>
        <div>Color: {color}</div>
      </Box>
      <Box sx={{ my: "1.2rem" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: "500", mb: "0.8rem" }}
        >
          Please rate your experience with our products (1 - 5 stars)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            id="rating"
            name="rating"
            value={rating}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: "1.2rem" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: "500", mb: "0.8rem" }}
        >
          Tell us more about your experience (at most 255 characters)
        </Typography>
        <MyTextField
          id="reviewText"
          label="Description"
          multiline
          rows={4}
          color="var(--admin-color)"
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          inputProps={{
            maxLength: 255,
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--admin-color)",
          color: "#FFF",
          mt: "1.5rem",
          float: "right",
          minWidth: "150px",
        }}
        startIcon={<Add />}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateReview;
