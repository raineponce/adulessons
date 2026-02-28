// prizes.js — Prize Shop
// Loads available prizes and redeemed prizes from the backend and renders the prize shop UI.

let currentUserPoints = 0;

// Render a single prize card element.
function createPrizeCard(prize) {
    const card = document.createElement('div');
    card.className = 'prize-card';

    const typeBadge = prize.type === 'coupon' ? 'Coupon' : 'Printable';
    const hasEnoughPoints = currentUserPoints >= prize.cost;

    let actionHTML;
    if (!prize.available) {
        actionHTML = '<span class="out-of-stock">Out of stock</span>';
    } else if (!hasEnoughPoints) {
        const needed = prize.cost - currentUserPoints;
        actionHTML = `<button class="redeem-btn insufficient-points" disabled>Need ${needed} more points</button>`;
    } else {
        actionHTML = `<button class="redeem-btn" onclick="redeemPrize('${prize._id}')">Redeem</button>`;
    }

    card.innerHTML = `
        <h3>${prize.name}</h3>
        <p>${prize.description}</p>
        <span class="prize-type">${typeBadge}</span>
        <span class="prize-cost">${prize.cost} points</span>
        ${actionHTML}
    `;
    return card;
}

// Fetch and display the prize shop and user points.
async function loadPrizes() {
    try {
        // Fetch prizes and current user info in parallel
        const [prizesResponse, meResponse] = await Promise.all([
            fetch('/prizes'),
            fetch('/auth/me')
        ]);

        if (prizesResponse.status === 401 || meResponse.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        const prizes = await prizesResponse.json();
        const meData = await meResponse.json();

        currentUserPoints = (meData.user && meData.user.points) || 0;

        // Update points display elements
        document.querySelectorAll('.user-points').forEach(el => { el.textContent = currentUserPoints; });

        // Render prize cards
        const list = document.getElementById('prizes-list');
        if (list) {
            list.innerHTML = '';
            prizes.forEach(prize => list.appendChild(createPrizeCard(prize)));
        }

        // Load previously redeemed prizes
        await loadRedeemedPrizes();
    } catch (err) {
        console.error('Error loading prizes:', err);
    }
}

// Show a status message in the prize-message element.
function showPrizeMessage(message, isError) {
    const msgEl = document.getElementById('prize-message');
    if (msgEl) {
        msgEl.textContent = message;
        msgEl.style.color = isError ? '#c0392b' : '#27ae60';
        msgEl.style.display = 'block';
    }
}

// Redeem a prize by ID and show a confirmation message.
async function redeemPrize(prizeId) {
    try {
        const response = await fetch(`/prizes/${prizeId}/redeem`, { method: 'POST' });
        const data = await response.json();

        if (response.ok) {
            const prizeName = (data.prize && data.prize.name) || 'prize';
            let message = `🎉 You redeemed: ${prizeName}!`;
            if (data.prize && data.prize.type === 'coupon') {
                message += ` Coupon code: ${data.prize.couponCode}`;
            } else if (data.prize && data.prize.type === 'printable') {
                message += ' Download link available below.';
            }
            showPrizeMessage(message, false);

            // Refresh prizes and points after redemption
            await loadPrizes();
        } else {
            showPrizeMessage(data.message || data.error || 'Could not redeem prize. Please try again.', true);
        }
    } catch (err) {
        console.error('Error redeeming prize:', err);
        showPrizeMessage('Network error. Please try again.', true);
    }
}

// Fetch and display previously redeemed prizes.
async function loadRedeemedPrizes() {
    try {
        const response = await fetch('/prizes/redeemed');
        if (!response.ok) return;

        const redeemed = await response.json();
        const container = document.getElementById('redeemed-prizes');
        if (!container) return;

        container.innerHTML = '';
        if (!redeemed.length) {
            container.textContent = 'No prizes redeemed yet.';
            return;
        }

        redeemed.forEach(item => {
            const el = document.createElement('div');
            el.className = 'redeemed-prize-item';
            const date = item.redeemedAt ? new Date(item.redeemedAt).toLocaleDateString() : '';
            el.innerHTML = `<strong>${item.name}</strong>${date ? ` — redeemed on ${date}` : ''}`;
            container.appendChild(el);
        });
    } catch (err) {
        console.error('Error loading redeemed prizes:', err);
    }
}

// Expose redeemPrize globally so HTML onclick handlers can call it.
window.redeemPrize = redeemPrize;

document.addEventListener('DOMContentLoaded', loadPrizes);
