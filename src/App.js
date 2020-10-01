import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Movie from "./components/Movie";
import SearchAppBar from "./components/SearchAppBar";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	search: {
		position: "relative",
		borderRadius: "50px",
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		// marginLeft: 0,
		width: "auto",
		[theme.breakpoints.up("sm")]: {
			// marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
}));

const FEATURED_API =
	"https://api.themoviedb.org/3/discover/movie?api_key=920f9cd3544456e38a89838e906c085c&language=en-US&sort_by=popularity.desc&page=1&include_adult=false";

const SEARCH_API =
	"https://api.themoviedb.org/3/search/movie?api_key=920f9cd3544456e38a89838e906c085c&language=en-US&page=1&include_adult=false&query=";

// function App() {
// 	const [movies, setMovies] = useState([]);

// 	const fetchFeaturedAPI = async () => {
// 		const moviesdbResponse = await fetch(FEATURED_API);
// 		const moviesJson = await moviesdbResponse.json();
// 		const results = await moviesJson.results;
// 		setMovies(results);
// 	};

// 	useEffect(() => {
// 		fetchFeaturedAPI();
// 	}, []);
// 	return <div className="App">{console.log(movies)}</div>;
// }

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const classes = useStyles();

	const getMovies = async (API) => {
		const moviesdbResponse = await fetch(API);
		const moviesJson = await moviesdbResponse.json();
		const results = await moviesJson.results;
		setMovies(results);
	};

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	// const handleOnSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (searchTerm) {
	// 		const movieResponse = await fetch(SEARCH_API + searchTerm);
	// 		const movieJson = await movieResponse.json();
	// 		const result = await movieJson.results;
	// 		setMovies(result);
	// 		setSearchTerm("");
	// 	}
	// };

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (searchTerm) {
			getMovies(SEARCH_API + searchTerm);
			// fetch(SEARCH_API + searchTerm)
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		setMovies(data.results);
			setSearchTerm("");
			// }
			// );
		}
	};

	const handleOnChange = (e) => {
		setSearchTerm(e.target.value);
	};
	return (
		<>
			<header>
				<SearchAppBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					handleOnChange={handleOnChange}
					handleOnSubmit={handleOnSubmit}
				/>
				{/* <SearchAppBar>
					<input
						className="search"
						type="search"
						placeholder="Search..."
					/>
				</SearchAppBar> */}
				{/* <SearchAppBar> */}
				{/* <form onSubmit={handleOnSubmit}>
					<input
						className="search"
						type="search"
						placeholder="Search..."
						value={searchTerm}
						onChange={handleOnChange}
					/>
				</form> */}
				{/* </SearchAppBar> */}

				{/* <InputBase
					placeholder="Search…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
					onChange={(e) => setSearchTerm(e.target.value)}
				/> */}
			</header>
			{/* {console.log(searchTerm)} */}
			<Container maxWidth="xl">
				<br />
				<div className={classes.root}>
					<Grid container spacing={2}>
						{movies
							? movies.length > 0 &&
							  movies.map((movie) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										lg={3}
										xl={2}
										key={movie.id}
									>
										<Movie {...movie} />
										{/* {console.log(movie)} */}
									</Grid>
							  ))
							: "No result found..."}
					</Grid>
				</div>
				<br />
			</Container>
		</>
	);
}

export default App;
