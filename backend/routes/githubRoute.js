const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/repos', async (req, res, next) => {
  try {
    const githubResponseRepos = await axios.get(`https://api.github.com/users/Dizkm8/repos`);

    const repositories = await Promise.all(
      githubResponseRepos.data.map(async (repo) => {
        try {
          const commitsResponse = await axios.get(`https://api.github.com/repos/Dizkm8/${repo.name}/commits`);
          const commitsCount = commitsResponse.data.length;

          return {
            name: repo.name,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            commits_count: commitsCount,
          };
        } catch (error) {
          // Manejar el error de la solicitud de commits
          console.error(`Error fetching commits for repository ${repo.name}:`, error.message);
          return {
            name: repo.name,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            commits_count: 0, // Otra opción podría ser establecer esto como undefined o manejarlo de manera diferente
          };
        }
      })
    );

    // Resto del código...
  } catch (error) {
    // Manejar el error de la solicitud de repositorios
    console.error('Error fetching repositories:', error.message);
    next(error);
  }
});


module.exports = router;

router.get('/repos/:repoName/commits', async (req, res, next) => {
  try {
    const { repoName } = req.params;
    const githubResponse = await axios.get(`https://api.github.com/repos/Dizkm8/${repoName}/commits`);

    const commits = githubResponse.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
    }));

    res.json({ commits })
  } catch (error) {
    next(error)
  }
})

module.exports = router