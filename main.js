__path = process.cwd()

const express = require("express")
const router = express.Router();
const ytSearch = require('yt-search');
const yt = require('ytdl-core')
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const g = require('assemblyai')

router.get('/movie', async (req, res) => {
  try {
    const movieName = req.query.q
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: movieName,
        language: 'pt-BR'
      },
    });

    const firstResult = response.data.results[0];
    if (!firstResult) {
      res.json({ error: 'Nenhum resultado encontrado' });
      return;
    }

    const movieInfo = {
      title: firstResult.title,
      image: `${TMDB_IMAGE_BASE_URL}${firstResult.poster_path}`,
      runtime: firstResult.runtime,
      date: firstResult.release_date,
      description: firstResult.overview,
    };

    res.json(movieInfo);
  } catch (error) {
    console.error('Erro ao pesquisar informações do filme:', error);
    res.status(500).json({ error: 'Erro ao pesquisar informações do filme' });
  }
});

module.exports = router