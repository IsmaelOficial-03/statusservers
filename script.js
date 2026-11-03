// --- Estadisticas ---
function updateCharts() {
    const chartContainer = document.getElementById('main-chart');
    if (!chartContainer) return;
    const categories = { "Comida": 0, "Transporte": 0, "Vivienda": 0, "Ocio": 0 };
    let totalExp = 0;
    transactions.filter(t => t.type === 'expense').forEach(t => {
        const desc = t.description.toLowerCase();
        if (desc.includes("comi") || desc.includes("cena") || desc.includes("super")) {
            categories["Comida"] += t.amount;
        } else if (desc.includes("uber") || desc.includes("bus")) {
            categories["Transporte"] += t.amount;
        } else if (desc.includes("casa") || desc.includes("luz")) {
            categories["Vivienda"] += t.amount;
        } else {
            categories["Ocio"] += t.amount;
        }
        totalExp += t.amount;
    });
    chartContainer.innerHTML = '';
    Object.keys(categories).forEach(cat => {
        const percent = totalExp > 0 ? (categories[cat] / totalExp) * 100 : 0;
        const barDiv = document.createElement('div');
        barDiv.className = 'bar';
        barDiv.style.height = `${Math.max(percent, 5)}%`;
        barDiv.innerHTML = `<span>${Math.round(percent)}%</span><p>${cat}</p>`;
        chartContainer.appendChild(barDiv);
    });
}
