const topSpot = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/CHvfJtUxSmN0xXXnT6Tf/scores/';
const refreshBtn = document.getElementById('refresh');
const submitBtn = document.getElementById('submit-score');
const scoreBoard = document.getElementById('score-board');
const form = document.querySelector('form');
const feedbackMessage = document.querySelector('.feedback-message');
const giphy = document.querySelector('.giffy');

// Get data from API
const getSeverData = async () => {
  try {
    const response = await fetch(topSpot, {
      method: 'GET',
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

// Deploy data from API to browser
const deployScores = async () => {
  scoreBoard.innerHTML = '';
  
  const scoreObj = await getSeverData();
  const { result } = await scoreObj;
  result.sort((a, b) => b.score - a.score);
  result.forEach((element) => {
    scoreBoard.innerHTML += `<li class="score-item">
    <span class="user-name">${element.user}</span>
    <span class="user-score">${element.score}</span>
    </li><hr>`;
  });
};

// Add data to API
const postData = async (data) => {
  try {
    const response = await fetch(topSpot, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const apiResponse = await response.json();
    feedbackMessage.textContent = apiResponse.result;
  } catch (error) {
    return error;
  }
  return null;
};

// Toggle giffy
const toggleGiphy = () => {
  giphy.classList.toggle('hidden');
}

// Event listeners for buttons
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = form.elements.user.value;
  const userScore = form.elements.score.value;
  postData({ user: userName, score: userScore });
  form.elements.user.value = '';
  form.elements.score.value = '';
});

refreshBtn.addEventListener('click', () => {
  deployScores();
  toggleGiphy();
});