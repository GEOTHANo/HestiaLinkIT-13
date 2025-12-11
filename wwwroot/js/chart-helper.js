window.chartHelper = {
    charts: {},

    renderDoughnutChart: (canvasId, labels, data, backgroundColors) => {
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (window.chartHelper.charts[canvasId]) {
            window.chartHelper.charts[canvasId].destroy();
        }

        window.chartHelper.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    },

    renderHorizontalBarChart: (canvasId, labels, data, backgroundColors) => {
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (window.chartHelper.charts[canvasId]) {
            window.chartHelper.charts[canvasId].destroy();
        }

        window.chartHelper.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Amount (₱)',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    },

    renderBarChart: (canvasId, labels, data, backgroundColors, label) => {
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (window.chartHelper.charts[canvasId]) {
            window.chartHelper.charts[canvasId].destroy();
        }

        window.chartHelper.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    },

    renderLineChart: (canvasId, labels, data, label, borderColor, backgroundColor) => {
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (window.chartHelper.charts[canvasId]) {
            window.chartHelper.charts[canvasId].destroy();
        }

        window.chartHelper.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }
};
