import express from "express";
const app = express();
app.use(express.json());

const PORT = 8001;

let movielist = [];

app.get("/sayhello", (req, res) => {
  return res.status(200).send("hello");
});

app.post("/movie/add", (req, res) => {
  let newmovielist = req.body;
  movielist.push(newmovielist);
  return res.status(201).send({ message: "adding" });
});

app.get("/movie/list", (req, res) => {
  return res.status(202).send({ movies: movielist });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

// delete

app.delete("/movie/delete", (req, res) => {
  const movieNameToBeDeleted = req.body.name;

  const requiredMovie = movielist.find((item) => {
    if (item.name === movieNameToBeDeleted) {
      return item;
    }
  });

  if (!requiredMovie) {
    return res.status(404).send("movie does not exist");
  }
  const newList = movielist.filter((item, index, array) => {
    if (item.name !== movieNameToBeDeleted) {
      return item;
    }
  });
  movielist = structuredClone(newList);

  return res.status(200).send({ message: "movie is deleted" });
});
