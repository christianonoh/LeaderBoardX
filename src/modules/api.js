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

