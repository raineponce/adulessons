// lesson.js — Lesson Content Loader & Page Navigation
// Fetches lesson data from the backend and renders pages with navigation controls.

let currentLesson = null;
let currentPage = 0;

// Render a single content block and return the corresponding HTML element.
function renderBlock(block) {
    switch (block.type) {
        case 'heading': {
            const el = document.createElement('h2');
            el.textContent = block.body;
            return el;
        }
        case 'text': {
            const el = document.createElement('p');
            el.textContent = block.body;
            return el;
        }
        case 'image': {
            const el = document.createElement('img');
            el.src = block.src;
            el.alt = block.alt || '';
            el.className = 'lesson-image';
            return el;
        }
        case 'video': {
            const el = document.createElement('div');
            el.className = 'video-wrapper';
            // Validate videoId to only allow alphanumeric characters, hyphens, and underscores
            const safeVideoId = /^[\w-]+$/.test(block.videoId) ? block.videoId : '';
            el.innerHTML = `<iframe src="https://www.youtube.com/embed/${safeVideoId}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"></iframe>`;
            return el;
        }
        case 'list': {
            const el = document.createElement(block.ordered ? 'ol' : 'ul');
            (block.items || []).forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                el.appendChild(li);
            });
            return el;
        }
        case 'link': {
            const el = document.createElement('a');
            el.href = block.href;
            el.textContent = block.linkText || block.href;
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
            return el;
        }
        case 'callout': {
            const el = document.createElement('div');
            el.className = 'callout';
            el.textContent = block.body;
            return el;
        }
        default:
            return null;
    }
}

// Render a lesson page by clearing and repopulating the content container.
function renderPage(page) {
    const container = document.getElementById('lesson-content');
    if (!container) return;
    container.innerHTML = '';
    (page.blocks || []).forEach(block => {
        const el = renderBlock(block);
        if (el) container.appendChild(el);
    });
}

// Update the page indicator text and button disabled states.
function updatePageIndicator(lesson) {
    const indicator = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (indicator) {
        indicator.textContent = `Page ${currentPage + 1} of ${lesson.pages.length}`;
    }
    if (prevBtn) {
        prevBtn.disabled = currentPage === 0;
    }
    if (nextBtn) {
        // Disable next on last page (quiz will be shown instead)
        nextBtn.disabled = currentPage >= lesson.pages.length - 1;
    }
}

// Load lesson data from the backend and initialise the page.
async function loadLesson(lessonId) {
    try {
        const response = await fetch(`/lessons/${lessonId}`);

        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }
        if (response.status === 404) {
            const container = document.getElementById('lesson-content');
            if (container) container.textContent = 'Lesson not found.';
            return;
        }
        if (!response.ok) {
            throw new Error('Failed to load lesson');
        }

        const lesson = await response.json();
        currentLesson = lesson;
        currentPage = 0;

        // Set lesson title
        const titleEl = document.getElementById('lesson-title');
        if (titleEl) titleEl.textContent = lesson.title;

        // Render first page
        if (lesson.pages && lesson.pages.length > 0) {
            renderPage(lesson.pages[currentPage]);
        }
        updatePageIndicator(lesson);

        // Prev button
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    renderPage(lesson.pages[currentPage]);
                    updatePageIndicator(lesson);
                }
            });
        }

        // Next button — advances pages; shows quiz after the last page
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentPage++;
                if (currentPage >= lesson.pages.length) {
                    // Show quiz
                    if (typeof window.renderQuiz === 'function') {
                        window.renderQuiz(lesson.quiz, lesson.lessonId || lessonId);
                    }
                } else {
                    renderPage(lesson.pages[currentPage]);
                    updatePageIndicator(lesson);
                }
            });
        }
    } catch (err) {
        console.error('Error loading lesson:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('id');

    if (!lessonId) {
        window.location.href = '/lessons.html';
        return;
    }

    loadLesson(lessonId);
});
