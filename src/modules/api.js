const topSpot = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/CHvfJtUxSmN0xXXnT6Tf/scores/';
const refreshBtn = document.getElementById('refresh');
const submitBtn = document.getElementById('submit-score');
const scoreBoard = document.getElementById('score-board');
const form = document.querySelector('form');
const feedbackMessage = document.querySelector('.feedback-message');

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

const deployScores = async () => {
  scoreBoard.innerHTML = '';
  const scoreObj = await getSeverData();
  const { result } = await scoreObj;
  result.sort((a, b) => b.score - a.score);
  result.forEach((element) => {
    const singleScore = document.createElement('li');
    singleScore.setAttribute('class', 'score-item');
    singleScore.innerHTML = `${element.user} : ${element.score}<br>`;
    scoreBoard.appendChild(singleScore);
  });
};

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

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = form.elements.user.value;
  const userScore = form.elements.score.value;
  postData({ user: userName, score: userScore });
  form.elements.user.value = '';
  form.elements.score.value = '';
});

refreshBtn.addEventListener('click', deployScores);