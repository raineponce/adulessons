// codes.js — Secret Code Entry
// Handles submission of secret/promo codes and displays the result.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('code-form');
    if (!form) return;

    const codeInput = document.getElementById('code-input');
    const resultEl = document.getElementById('code-result');

    // Show a message in the result element.
    function showResult(message, isError) {
        if (resultEl) {
            resultEl.textContent = message;
            resultEl.style.color = isError ? '#c0392b' : '#27ae60';
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const code = codeInput ? codeInput.value.trim().toUpperCase() : '';

        if (!code) {
            showResult('Please enter a code', true);
            return;
        }

        try {
            const response = await fetch('/codes/redeem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });

            const data = await response.json();

            // Clear the input field regardless of result
            if (codeInput) codeInput.value = '';

            if (response.ok) {
                // Show success message based on reward type
                if (data.reward && data.reward.type === 'points') {
                    showResult(`🎉 You earned ${data.reward.amount} points!`, false);
                } else if (data.reward && data.reward.type === 'prize') {
                    showResult(`🎉 You won: ${data.reward.prizeName}!`, false);
                } else {
                    showResult('🎉 Code redeemed successfully!', false);
                }

                // Refresh auth state to update displayed points in nav/header
                if (typeof window.initAuthState === 'function') {
                    window.initAuthState();
                }
            } else {
                // Map common error messages from the backend
                const errorMsg = data.message || data.error || '';
                if (/already used/i.test(errorMsg)) {
                    showResult('Code already used', true);
                } else if (/expired/i.test(errorMsg)) {
                    showResult('Code expired', true);
                } else if (/invalid/i.test(errorMsg)) {
                    showResult('Invalid code', true);
                } else {
                    showResult(errorMsg || 'Could not redeem code. Please try again.', true);
                }
            }
        } catch (err) {
            if (codeInput) codeInput.value = '';
            showResult('Network error. Please try again.', true);
        }
    });
});
