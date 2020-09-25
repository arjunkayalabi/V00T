import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";

const StyledRating = withStyles({
	iconFilled: {
		color: "#ff6d75",
	},
	iconHover: {
		color: "#ff3d47",
	},
})(Rating);

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const defaultImage =
	"https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		height: "auto",
		width: "auto",
		backgroundColor: "#373b69",
		color: "white",
	},
	card: {
		// height: "500px",
		backgroundColor: "#373b69",
		color: "white",
		maxWidth: "100%",
		width: "100%",
		// maxHeight: "100%",
		height: "25vw",
	},
});

const setVoteClass = (vote) => {
	if (vote >= 8) {
		return "green";
	} else if (vote >= 6) {
		return "orange";
	} else {
		return "red";
	}
};
const Movie = ({
	// movie: { title, overview, poster_path, vote_average, vote_count },
	title,
	overview,
	poster_path,
	vote_average,
	vote_count,
}) => {
	const classes = useStyles();
	return (
		<>
			<Card className={(classes.root, classes.card)}>
				<CardActionArea>
					<CardMedia
						component="img"
						alt="Movie details"
						image={
							poster_path ? IMG_API + poster_path : defaultImage
						}
						title={title}
						style={{
							objectFit: "cover",
							// height: "500px",
							// maxWidth: "100%",
							// width: "100%",
							// maxHeight: "100%",
							height: "21vw",
							display: "block",
							// width: "30vw",
							// transitionDuration: "0.3s",
							// height: "45vw",
						}}
					/>
					<CardContent className="movie">
						{/* <Typography gutterBottom variant="h6" component="h6"> */}
						<Typography
							variant="body2"
							color="white"
							component="p"
							style={{
								backgroundColor: "#373b69",
								color: "white",
								paddingBottom: "2rem",
							}}
						>
							{title}

							<span
								style={{ float: "right" }}
								className={`tag ${setVoteClass(vote_average)}`}
							>
								{" "}
								{vote_average}
							</span>
						</Typography>
						{/* </Typography> */}
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							// style={{
							// 	backgroundColor: "#373b69",
							// 	color: "white",
							// }}
							className="movie-overview"
						>
							{overview}

							<Rating
								value={vote_average}
								name="read-only"
								max={10}
								readOnly
								style={{
									margin: 0,
									paddingTop: "1rem",
								}}
							/>
						</Typography>

						{/* <CardActions> */}
						{/* <StyledRating
						name="customized-color"
						defaultValue={vote_count}
						precision={0.5}
						icon={<FavoriteIcon fontSize="inherit" />}
						readOnly
					/> */}
						{/* </CardActions> */}
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default Movie;
