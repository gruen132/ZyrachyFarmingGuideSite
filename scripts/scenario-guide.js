class ScenarioGuide {
    constructor() {
        this.currentPath = ['start'];
        this.scenarios = {
            start: {
                id: 'start',
                title: 'Initial Assessment',
                content: 'Zryachiy is always visible in all scenarios.',
                image: '../assets/scenarios/start.jpg',
                options: [
                    { text: 'Continue', nextId: 'checkLeftGuard' }
                ]
            },
            checkLeftGuard: {
                id: 'checkLeftGuard',
                title: 'Check Left Guard',
                content: 'Is the left guard visible?',
                image: '../assets/scenarios/left-guard-check.jpg',
                options: [
                    { text: 'Yes, visible normally', nextId: 'leftGuardNormal' },
                    { text: 'Yes, but bugged behind rock', nextId: 'scenario5' },
                    { text: 'No, not visible', nextId: 'checkRightGuard' }
                ]
            },
            leftGuardNormal: {
                id: 'leftGuardNormal',
                title: 'Left Guard Visible',
                content: 'Left guard is visible normally.',
                image: '../assets/scenarios/left-guard-normal.jpg',
                options: [
                    { text: 'Check right guard', nextId: 'checkRightGuardWithLeft' }
                ]
            },
            checkRightGuard: {
                id: 'checkRightGuard',
                title: 'Check Right Guard',
                content: 'Is the right guard visible?',
                image: '../assets/scenarios/right-guard-check.jpg',
                options: [
                    { text: 'Yes', nextId: 'scenario1' },
                    { text: 'No', nextId: 'scenario4' }
                ]
            },
            checkRightGuardWithLeft: {
                id: 'checkRightGuardWithLeft',
                title: 'Check Right Guard',
                content: 'Is the right guard also visible?',
                image: '../assets/scenarios/right-guard-check.jpg',
                options: [
                    { text: 'Yes', nextId: 'scenario2' },
                    { text: 'No', nextId: 'scenario3' }
                ]
            },
            scenario1: {
                id: 'scenario1',
                title: 'Scenario 1: Only Right Guard and Zryachiy Visible',
                content: 'The easiest scenario to master',
                isFinal: true,
                details: {
                    description: 'Only right guard and Zryachiy are visible. This scenario offers a straightforward approach with clear steps to follow.',
                    video: 'https://www.youtube.com/embed/LqIve_G3kpU',
                    checkpoints: [
                        'Lay down in the center where you can\'t be seen by the right guard',
                        'Set your scope to 200 meters and fire two shots at the top of Zryachiy\'s head',
                        'Once Zryachiy is dead, stand up and immediately sprint while going prone to the left for cover',
                        'At the slowest movement speed, peek through the fence to spot the right guard, adjusting your crouch height one step up',
                        'Once the right guard is down, navigate through the mines and reach the island',
                        'Move immediately onto the designated rock mentioned in the video',
                        'When the left guard moves along his path, unload your entire magazine into either his face or chest'
                    ]
                }
            },
            scenario2: {
                id: 'scenario2',
                title: 'Scenario 2: Both Guards and Zryachiy Visible',
                content: 'Most complex scenario requiring careful positioning and timing',
                isFinal: true,
                details: {
                    description: 'Both guards and Zryachiy are visible. This scenario requires precise positioning and careful timing.',
                    checkpoints: [
                        'Lay down to the right of the fence',
                        'Lean carefully to create a small pixel peek that allows you to land a shot on Zryachiy',
                        'Set your scope to 200 meters and fire two shots at the top of Zryachiy\'s head',
                        'Once Zryachiy is dead, slowly crawl while leaning to create an angle to peek and eliminate the left guard',
                        'With the right left guard dead, stand up and immediately sprint while going prone to the left for cover',
                        'At the slowest movement speed, peek through the fence to spot the right guard, adjusting your crouch height one step up'
                    ]
                }
            },
            scenario3: {
                id: 'scenario3',
                title: 'Scenario 3: Only Left Guard and Zryachiy Visible',
                content: 'Moderate difficulty scenario focusing on the western section',
                isFinal: true,
                details: {
                    description: 'Only left guard and Zryachiy are visible. This scenario requires careful positioning and timing.',
                    checkpoints: [
                        'Lay down to the right of the fence',
                        'Lean carefully to create a small pixel peek that allows you to land a shot on Zryachiy',
                        'Set your scope to 200 meters and fire two shots at the top of Zryachiy\'s head',
                        'Once Zryachiy is dead, slowly crawl while leaning to create an angle to peek and eliminate the left guard',
                        'Once the left guard is down, navigate through the mines and reach the island',
                        'Head toward the rocks where the left guard normally takes position',
                        'Take cover behind a rock and wait for him to push toward you'
                    ]
                }
            },
            scenario4: {
                id: 'scenario4',
                title: 'Scenario 4: Only Zryachiy Visible',
                content: 'Optimal scenario with maximum flexibility',
                isFinal: true,
                details: {
                    description: 'Only Zryachiy is visible. This is the most straightforward scenario with the most tactical options.',
                    checkpoints: [
                        'Position yourself prone in any spot with a clear view of Zryachiy',
                        'Set your scope to 200 meters and fire two shots at the top of Zryachiy\'s head',
                        'Once the Zryachiy is dead, navigate through the mines and reach the island',
                        'Head toward the rocks where the left guard normally takes position',
                        'Take cover behind a rock and wait for him to push toward you',
                        'Move immediately onto the designated rock mentioned in the video of Scenario 1',
                        'When the left guard moves along his path, unload your entire magazine into either his face or chest'
                    ]
                }
            },
            scenario5: {
                id: 'scenario5',
                title: 'Scenario 5: Left Guard Bugged Behind Rock',
                content: 'Special bugged scenario - Reset recommended',
                isFinal: true,
                details: {
                    description: 'Left guard is bugged behind rock. Currently, no safe sniping spot has been found for the bugged left guard.',
                    video: 'https://www.youtube.com/embed/tmFQVteYMR4',
                    checkpoints: [
                        'If you notice the left guard is bugged, it\'s best to reset',
                        'No safe sniping spot has been identified for this scenario',
                        'The guard may be sitting or standing',
                        'Only the gun is visible'
                    ]
                }
            }
        };

        this.initializeEventListeners();
        this.renderCurrentNode();
    }


    initializeEventListeners() {
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('backBtn').addEventListener('click', () => this.goBack());
    }

    reset() {
        this.currentPath = ['start'];
        this.renderCurrentNode();
    }

    goBack() {
        if (this.currentPath.length > 1) {
            this.currentPath.pop();
            this.renderCurrentNode();
        }
    }

    getCurrentNode() {
        return this.scenarios[this.currentPath[this.currentPath.length - 1]];
    }

    navigate(nextId) {
        this.currentPath.push(nextId);
        this.renderCurrentNode();
    }

    renderCurrentNode() {
        const node = this.getCurrentNode();
        const content = document.getElementById('scenarioContent');
        const pathDisplay = document.getElementById('pathDisplay');

        pathDisplay.innerHTML = `
            <h3>Navigation Path</h3>
            <div class="path-content">${this.currentPath.join(' → ')}</div>
        `;

        let html = `
            <div class="node">
                <div class="node-header">
                    <span class="node-id">${node.id}</span>
                    ${node.title ? `<h2 class="node-title">${node.title}</h2>` : ''}
                </div>
                <div class="node-content">
                    ${node.content}
                </div>
                ${node.image ? `<img class="node-image" src="${node.image}" alt="${node.title || node.id}">` : ''}
                ${!node.isFinal && node.options ? `
                    <div class="node-options">
                        ${node.options.map(option => `
                            <button class="option-btn" data-next="${option.nextId}">
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
                ${node.isFinal && node.details ? `
                    <div class="scenario-details">
                        <div class="scenario-details-header">
                            <h3>Detailed Information</h3>
                            <span class="expand-icon">▼</span>
                        </div>
                        <div class="scenario-details-content">
                            <div class="scenario-description">
                                <p>${node.details.description}</p>
                                <div class="scenario-checkpoints">
                                    <h4>Key Checkpoints</h4>
                                    <ul>
                                        ${node.details.checkpoints.map(cp => `<li>${cp}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            <div class="scenario-tactical">
                                <img src="${node.details.tacticalImage}" alt="Tactical view for ${node.title}">
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        content.innerHTML = html;

        if (!node.isFinal && node.options) {
            content.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.navigate(e.target.dataset.next);
                });
            });
        }

        if (node.isFinal && node.details) {
            const detailsHeader = content.querySelector('.scenario-details-header');
            const detailsSection = content.querySelector('.scenario-details');
            if (detailsHeader && detailsSection) {
                detailsHeader.addEventListener('click', () => {
                    detailsSection.classList.toggle('expanded');
                    const icon = detailsHeader.querySelector('.expand-icon');
                    icon.textContent = detailsSection.classList.contains('expanded') ? '▼' : '▶';
                });
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScenarioGuide();
});