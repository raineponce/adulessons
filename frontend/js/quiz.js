// quiz.js — Quiz Rendering & Lesson Completion
// Renders a quiz after the last lesson page and handles answer submission.

// Render the quiz for the current lesson and handle answer selection.
async function renderQuiz(quiz, lessonId) {
    const container = document.getElementById('lesson-content');
    if (!container) return;

    // Build quiz HTML
    const optionsHTML = (quiz.options || []).map((option, index) =>
        `<button class="quiz-option" data-index="${index}">${option}</button>`
    ).join('');

    container.innerHTML = `
        <h2>Quiz Time!</h2>
        <p>${quiz.question}</p>
        <div class="quiz-options">${optionsHTML}</div>
        <div id="quiz-feedback" style="display: none;"></div>
    `;

    // Hide navigation elements during quiz
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const pageIndicator = document.getElementById('page-indicator');
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (pageIndicator) pageIndicator.style.display = 'none';

    const feedbackEl = document.getElementById('quiz-feedback');
    const optionButtons = container.querySelectorAll('.quiz-option');

    // Attach click listeners to each answer option
    optionButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
            feedbackEl.style.display = 'block';

            if (selectedIndex === quiz.correctIndex) {
                // Correct answer
                feedbackEl.innerHTML = '';

                const correctMsg = document.createElement('span');
                correctMsg.textContent = `✅ Correct! ${quiz.explanation}`;
                feedbackEl.appendChild(correctMsg);

                btn.classList.add('correct');

                // Disable all options so the user cannot change their answer
                optionButtons.forEach(b => { b.disabled = true; });

                try {
                    // Mark the lesson as complete on the backend
                    const response = await fetch(`/lessons/${lessonId}/complete`, { method: 'POST' });
                    const data = await response.json();

                    const pointsMsg = document.createElement('span');
                    pointsMsg.innerHTML = `<br><strong>+${parseInt((data && data.pointsAwarded) || 10, 10)} points earned!</strong>`;
                    feedbackEl.appendChild(pointsMsg);

                    const progressMsg = document.createElement('span');
                    progressMsg.innerHTML = `<br>Overall progress: ${parseInt((data && data.progressPercent) || 0, 10)}%`;
                    feedbackEl.appendChild(progressMsg);

                    if (data && data.allComplete) {
                        const allDoneMsg = document.createElement('span');
                        allDoneMsg.innerHTML = `<br>🎉 You've completed ALL lessons! <a href="/final-prize.html">Claim your prize!</a>`;
                        feedbackEl.appendChild(allDoneMsg);
                    }
                } catch (err) {
                    console.error('Error marking lesson complete:', err);
                }

                // Provide a navigation link after completing the quiz
                const dashLink = document.createElement('span');
                dashLink.innerHTML = `<br><a href="/dashboard.html">Back to Dashboard</a>`;
                feedbackEl.appendChild(dashLink);
            } else {
                // Wrong answer — allow retry
                feedbackEl.innerHTML = '❌ Not quite — try again!';
                btn.classList.add('incorrect');
            }
        });
    });
}

// Expose globally so lesson.js and HTML pages can call renderQuiz directly.
window.renderQuiz = renderQuiz;
