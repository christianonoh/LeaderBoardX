export default class Scoreboard {
  constructor() {
    this.scoreBoard = document.getElementById('score-board');
    this.form = document.querySelector('form');
    this.submitBtn = document.getElementById('submit-score');
    this.init();
  }

  init() {
    this.form.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.submitBtn.click();
      }
    });
    this.submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.addScore();
    });
  }

  addScore() {
    const userName = this.form.elements.name.value;
    const userScore = this.form.elements.score.value;
    const newScore = {
      name: userName,
      score: userScore,
    };
    this.form.elements.name.value = '';
    this.form.elements.score.value = '';
    this.deploy(newScore);
  }

  deploy(score) {
    const singleScore = document.createElement('li');
    singleScore.setAttribute('class', 'score-item');
    singleScore.innerHTML = `${score.name} : ${score.score}<br>`;
    this.scoreBoard.appendChild(singleScore);
  }
}
