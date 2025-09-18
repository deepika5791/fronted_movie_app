import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Filter.css";

const Filter = ({ onFilter }) => {
  const [movies, setMovies] = useState([]);
  const [years, setYears] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [topN, setTopN] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://movieapi-1-txwt.onrender.com/movies"
        );
        const data = res.data.data || [];
        setMovies(data);
        onFilter(data);

        const uniqueYears = [...new Set(data.map((m) => m.year))].sort(
          (a, b) => b - a
        );
        setYears(uniqueYears);

        const uniqueDirectors = [
          ...new Set(data.map((m) => m.director)),
        ].sort();
        setDirectors(uniqueDirectors);

        const allGenres = data.flatMap((m) => {
          if (!m.genre) return [];
          if (Array.isArray(m.genre)) return m.genre;
          if (typeof m.genre === "string")
            return m.genre.split(",").map((g) => g.trim());
          return [];
        });
        setGenres([...new Set(allGenres)].sort());
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [onFilter]);

  useEffect(() => {
    if (!movies.length) return;

    let filtered = [...movies];

    if (selectedYear) {
      filtered = filtered.filter(
        (m) => Number(m.year) === Number(selectedYear)
      );
    }
    if (selectedDirector) {
      filtered = filtered.filter((m) => m.director === selectedDirector);
    }
    if (selectedGenre) {
      filtered = filtered.filter((m) => {
        if (!m.genre) return false;
        const movieGenres = Array.isArray(m.genre)
          ? m.genre
          : m.genre.split(",").map((g) => g.trim());
        return movieGenres.includes(selectedGenre);
      });
    }
    if (topN) {
      filtered = [...filtered]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, topN);
    }
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === "rating")
          return sortOrder === "asc"
            ? a.rating - b.rating
            : b.rating - a.rating;
        if (sortBy === "year")
          return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    }

    onFilter(filtered);
  }, [
    selectedYear,
    selectedDirector,
    selectedGenre,
    topN,
    sortBy,
    sortOrder,
    movies,
    onFilter,
  ]);

  return (
    <div className="filter-container">
      {/* Year Filter */}
      <div className="filter_group">
        <label>Year</label>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedDirector("");
            setSelectedGenre("");
            setTopN("");
          }}
        >
          <option value="">Filter by Year</option>
          {years.map((year) => (
            <option key={`year-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="filter_group">
        <label>Director</label>
        <select
          value={selectedDirector}
          onChange={(e) => {
            setSelectedDirector(e.target.value);
            setSelectedYear("");
            setSelectedGenre("");
            setTopN("");
          }}
        >
          <option value="">Filter by Director</option>
          {directors.map((dir) => (
            <option key={`dir-${dir}`} value={dir}>
              {dir}
            </option>
          ))}
        </select>
      </div>

      <div className="filter_group">
        <label>Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setSelectedYear("");
            setSelectedDirector("");
            setTopN("");
          }}
        >
          <option value="">Filter by Genre</option>
          {genres.map((gen) => (
            <option key={`genre-${gen}`} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>

      <div className="filter_group">
        <label>Top Movies</label>
        <select
          value={topN}
          onChange={(e) => {
            setTopN(e.target.value);
            setSelectedYear("");
            setSelectedDirector("");
            setSelectedGenre("");
          }}
        >
          <option value="">Top Movies</option>
          <option value="5">Top 5</option>
          <option value="10">Top 10</option>
          <option value="15">Top 15</option>
        </select>
      </div>

      <div className="filter_group">
        <label>Sort By</label>
        <select
          value={sortBy + "-" + sortOrder}
          onChange={(e) => {
            const [by, order] = e.target.value.split("-");
            setSortBy(by);
            setSortOrder(order);
          }}
        >
          <option value="">Sort By</option>
          <option value="rating-desc">Rating (High to Low)</option>
          <option value="rating-asc">Rating (Low to High)</option>
          <option value="year-desc">Year (Newest)</option>
          <option value="year-asc">Year (Oldest)</option>
          <option value="title-asc">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
