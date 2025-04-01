// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize clipboard.js
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', function(e) {
        const originalText = e.trigger.innerHTML;
        e.trigger.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(function() {
            e.trigger.innerHTML = originalText;
        }, 2000);
        
        e.clearSelection();
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        
        // Save theme preference
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Quick navigation toggle
    const quickNavToggle = document.querySelector('.quick-nav-toggle button');
    const quickNavMenu = document.querySelector('.quick-nav-menu');
    
    quickNavToggle.addEventListener('click', function() {
        quickNavMenu.classList.toggle('active');
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Make sure Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded!');
        document.querySelectorAll('.chart-container').forEach(container => {
            container.innerHTML = '<div class="alert alert-danger">Chart.js failed to load. Please check your internet connection.</div>';
        });
        return;
    }

    // Set default options for all charts
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.plugins.legend.labels.font = {
        family: "'Inter', sans-serif",
        size: 12
    };
    Chart.defaults.plugins.title.font = {
        family: "'Poppins', sans-serif",
        size: 14,
        weight: 'bold'
    };
    
    // Initialize all charts
    try {
        // Hero Chart - Animated polar area chart
        const heroCtx = document.getElementById('hero-chart').getContext('2d');
        const heroChart = new Chart(heroCtx, {
            type: 'polarArea',
            data: {
                labels: ['Chart.js', 'Easy', 'Responsive', 'Interactive', 'Customizable'],
                datasets: [{
                    data: [11, 16, 7, 14, 12],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 2000,
                    loop: true
                }
            }
        });
        
        // Example chart for the introduction section
        const exampleCtx = document.getElementById('example-chart').getContext('2d');
        const exampleChart = new Chart(exampleCtx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Basic Line Chart
        const basicLineCtx = document.getElementById('basic-line-chart').getContext('2d');
        const basicLineChart = new Chart(basicLineCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Monthly Sales',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Sales Data'
                    }
                }
            }
        });

        // Multi-line Chart
        const multiLineCtx = document.getElementById('multi-line-chart').getContext('2d');
        const multiLineChart = new Chart(multiLineCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Product A',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Product B',
                    data: [5, 12, 18, 9, 11, 14],
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Sales Comparison'
                    }
                }
            }
        });

        // Vertical Bar Chart
        const verticalBarCtx = document.getElementById('vertical-bar-chart').getContext('2d');
        const verticalBarChart = new Chart(verticalBarCtx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Popularity of Colors',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Horizontal Bar Chart
        const horizontalBarCtx = document.getElementById('horizontal-bar-chart').getContext('2d');
        const horizontalBarChart = new Chart(horizontalBarCtx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Popularity of Colors',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Stacked Bar Chart
        const stackedBarCtx = document.getElementById('stacked-bar-chart').getContext('2d');
        const stackedBarChart = new Chart(stackedBarCtx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Product A',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                }, {
                    label: 'Product B',
                    data: [5, 15, 10, 8, 12],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                }, {
                    label: 'Product C',
                    data: [7, 8, 5, 9, 6],
                    backgroundColor: 'rgba(255, 206, 86, 0.7)',
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Stacked Sales Data'
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });

        // Pie Chart
        const pieCtx = document.getElementById('pie-chart').getContext('2d');
        const pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Color Preferences Survey'
                    }
                }
            }
        });

        // Doughnut Chart
        const doughnutCtx = document.getElementById('doughnut-chart').getContext('2d');
        const doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Tablet', 'Mobile', 'Other'],
                datasets: [{
                    label: 'Website Traffic',
                    data: [45, 12, 38, 5],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Website Traffic by Device'
                    }
                },
                cutout: '70%'  // Controls the size of the hole
            }
        });

        // Radar Chart
        const radarCtx = document.getElementById('radar-chart').getContext('2d');
        const radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: [
                    'Eating',
                    'Drinking',
                    'Sleeping',
                    'Designing',
                    'Coding',
                    'Cycling',
                    'Running'
                ],
                datasets: [{
                    label: 'Person A',
                    data: [65, 59, 90, 81, 56, 55, 40],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'Person B',
                    data: [28, 48, 40, 19, 96, 27, 100],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });

        // Mixed Chart
        const mixedCtx = document.getElementById('mixed-chart').getContext('2d');
        const mixedChart = new Chart(mixedCtx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    type: 'bar',
                    label: 'Revenue',
                    data: [50, 60, 70, 180, 190, 220],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }, {
                    type: 'line',
                    label: 'Profit',
                    data: [20, 25, 30, 60, 65, 75],
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Playground Chart
        const playgroundCtx = document.getElementById('playground-chart').getContext('2d');
        let playgroundChart = new Chart(playgroundCtx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Run code button for playground
        document.getElementById('runCode').addEventListener('click', function() {
            const code = document.getElementById('codeEditor').value;
            
            try {
                // Destroy previous chart
                if (playgroundChart) {
                    playgroundChart.destroy();
                }
                
                // Execute the code
                eval(code);
            } catch (error) {
                console.error('Error executing code:', error);
                alert('Error: ' + error.message);
            }
        });

        // Chart control buttons
        document.querySelectorAll('.chart-control-btn').forEach(button => {
            button.addEventListener('click', function() {
                const chartId = this.getAttribute('data-chart');
                const action = this.getAttribute('data-action');
                const chartInstance = Chart.getChart(chartId);
                
                if (action === 'randomize' && chartInstance) {
                    // Randomize data
                    chartInstance.data.datasets.forEach(dataset => {
                        dataset.data = dataset.data.map(() => Math.floor(Math.random() * 100));
                    });
                    chartInstance.update();
                } else if (action === 'download' && chartInstance) {
                    // Download chart as image
                    const link = document.createElement('a');
                    link.href = chartInstance.toBase64Image();
                    link.download = chartId + '.png';
                    link.click();
                }
            });
        });

        // Interactive doughnut chart cutout control
        const cutoutRange = document.getElementById('cutoutRange');
        const cutoutValue = document.getElementById('cutoutValue');
        
        if (cutoutRange && cutoutValue) {
            cutoutRange.addEventListener('input', function() {
                const value = this.value;
                cutoutValue.textContent = value + '%';
                
                const doughnutChart = Chart.getChart('doughnut-chart');
                if (doughnutChart) {
                    doughnutChart.options.cutout = value + '%';
                    doughnutChart.update();
                }
            });
        }

    } catch (error) {
        console.error('Error initializing charts:', error);
        document.querySelectorAll('.chart-container').forEach(container => {
            container.innerHTML = '<div class="alert alert-danger">Error initializing chart: ' + error.message + '</div>';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});