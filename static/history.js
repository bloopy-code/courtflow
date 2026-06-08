const matchHistory = [];

function updateMatchHistoryPanel() {
    const panel = document.getElementById("match-history-panel");

    if (!panel) return;

    if (matchHistory.length === 0) {
        panel.innerHTML = `<p class="empty-history">No matches yet</p>`;
        return;
    }

    panel.innerHTML = "";

    matchHistory.slice().reverse().forEach(match => {
        const item = document.createElement("div");
        item.classList.add("match-history-item");

        item.innerHTML = `
            <strong>${match.mode}</strong> — ${formatTime(match.durationSeconds)}
            <br>
            ${match.teamA.join(" + ")}
            <br>
            vs
            <br>
            ${match.teamB.join(" + ")}
        `;

        panel.appendChild(item);
    });
}

function logCompletedMatch(courtCard, durationSeconds) {
    const teamA = Array.from(
        courtCard.querySelector(".team-a").querySelectorAll(".player")
    );

    const teamB = Array.from(
        courtCard.querySelector(".team-b").querySelectorAll(".player")
    );

    const matchRecord = {
        mode: getCourtMode(courtCard),
        durationSeconds: durationSeconds,
        endedAt: new Date().toISOString(),
        teamA: teamA.map(getPlayerName),
        teamB: teamB.map(getPlayerName)
    };

    matchHistory.push(matchRecord);
    updateMatchHistoryPanel();

    [...teamA, ...teamB].forEach(player => {
        const currentMatches = Number(player.dataset.matchesPlayed || 0);
        player.dataset.matchesPlayed = currentMatches + 1;
        updatePlayerDisplay(player);
    });

    if (teamA.length === 2) {
        recordPartnerPair(teamA[0], teamA[1]);
    }

    if (teamB.length === 2) {
        recordPartnerPair(teamB[0], teamB[1]);
    }

    console.log("Match history:", matchHistory);
    console.log("Partner counts:", partnerCounts);
}