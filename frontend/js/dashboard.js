// dashboard.js — Dashboard Page
// Loads user progress data from the backend and renders the dashboard UI.

// Load and render all dashboard data.
async function loadDashboard() {
    try {
        const response = await fetch('/profile/progress');

        // If not authenticated, redirect to login
        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to load progress data');
        }

        const data = await response.json();

        // Overall progress bar
        const progressBar = document.getElementById('overall-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${data.progressPercent}%`;
            progressBar.textContent = `${data.progressPercent}%`;
        }

        // Continue where you left off
        const continueLesson = document.getElementById('continue-lesson');
        if (continueLesson && data.currentLesson) {
            continueLesson.style.display = 'block';
            const link = continueLesson.querySelector('a');
            if (link) {
                link.href = `/lesson.html?id=${data.currentLesson}`;
            }
        }

        // Per-module progress cards
        const modulesList = document.getElementById('modules-list');
        if (modulesList && Array.isArray(data.modules)) {
            data.modules.forEach(mod => {
                const completedCount = mod.lessonIds.filter(id => data.completedLessons.includes(id)).length;
                const total = mod.lessonIds.length;
                const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

                const card = document.createElement('div');
                card.className = 'module-card';
                card.innerHTML = `
                    <h3>${mod.title}</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percent}%;"></div>
                    </div>
                    <p>${completedCount}/${total} lessons complete</p>
                    <a href="/module.html?id=${mod.moduleId}" class="continue-btn">Continue &rarr;</a>
                `;
                modulesList.appendChild(card);
            });
        }

        // Streak count
        const streakCount = document.getElementById('streak-count');
        if (streakCount && data.streak) {
            streakCount.textContent = data.streak.current;
        }

        // Points display
        const pointsDisplay = document.getElementById('points-display');
        if (pointsDisplay) {
            pointsDisplay.textContent = data.points;
        }
    } catch (err) {
        console.error('Error loading dashboard:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadDashboard);
