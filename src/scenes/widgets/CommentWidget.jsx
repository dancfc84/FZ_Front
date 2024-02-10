
import { useDispatch, useSelector } from "react-redux";
import { setComment } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  EditOutlined,
} from "@mui/icons-material";


const CommentWidget = ({              
  commentId,
  postId,
  commentUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  patchLikeComment
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  console.log(commentId);
  console.log(isLiked);
  console.log(likes);

  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;




  return (
    <FlexBetween gap="1.5rem">
    <UserImage image={userPicturePath} size="55px" />
    <Box
      onClick={() => {
        navigate(`/profile/${commentUserId}`);
        navigate(0);
      }}
      pt={3}
      width="100%"
    >
      <Typography
        color={main}
        variant="h5"
        fontWeight="500"
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        {`${name}`}
      </Typography>
      <Typography color={medium} fontSize="0.8rem" width="100%">
        {description}
      </Typography>
      <FlexBetween gap="0.3rem">
        <IconButton  
            onClick={(event) => {
              event.stopPropagation(); // Stop the click event from propagating to the parent Box
              patchLikeComment(commentId);
            }} >
         {isLiked ? (
            <FavoriteOutlined sx={{ color: primary }} />
          ) : (
            <FavoriteBorderOutlined />
          )}
          <Typography>{likeCount}</Typography>
        </IconButton>
        <IconButton>
          <EditOutlined />
        </IconButton>
      </FlexBetween>
      <Divider />
    </Box>
  </FlexBetween>
  );
};

export default CommentWidget;
