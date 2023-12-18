const express = require('express')
const axios = require('axios')
const router = express.Router()
require('dotenv').config()

router.get('/repos', async (req, res, next) => {
  try {
    const githubResponseRepos = await axios.get('https://api.github.com/users/Dizkm8/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    })

    const repositories = await Promise.all(
      githubResponseRepos.data.map(async (repo) => {
        try {
          const commitsResponse = await axios.get(`https://api.github.com/repos/Dizkm8/${repo.name}/commits`, {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
          })
          const commitsCount = commitsResponse.data.length;

          return {
            name: repo.name,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            commits_count: commitsCount,
          };
        } catch (error) {
          console.error(`Error fetching commits for repository ${repo.name}:`, error.message);
          return {
            name: repo.name,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            commits_count: 0,
          };
        }
      })
    )

    res.json({ repositories })
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    next(error);
  }
})

router.get('/repos/:repoName/commits', async (req, res, next) => {
  try {
    const { repoName } = req.params;

    const githubResponse = await axios.get(`https://api.github.com/repos/Dizkm8/${repoName}/commits`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const commits = githubResponse.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
    }));

    res.json({ commits })
  } catch (error) {
    console.error(`Error fetching commits for repository ${repoName}:`, error.message);
    next(error);
  }
})

module.exports = router