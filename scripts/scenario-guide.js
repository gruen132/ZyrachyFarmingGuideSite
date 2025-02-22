class ScenarioGuide {
    constructor() {
        this.currentPath = ['start'];
        this.scenarios = {
            start: {
                id: 'start',
                title: 'Initial Assessment',
                content: 'Zyrachy is always visible in all scenarios.',
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
                    { text: 'Yes, but bugged behind rock', nextId: 'leftGuardBugged' },
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
            leftGuardBugged: {
                id: 'leftGuardBugged',
                title: 'Bugged Left Guard Scenario',
                content: `
                    <div class="warning-box">
                        Special Scenario (5): Left guard is bugged behind rock
                        - Only gun is visible
                        - Guard may be sitting or standing
                    </div>
                `,
                image: '../assets/scenarios/bugged-guard.jpg',
                options: [
                    { text: 'Complete Scenario', nextId: 'scenario5' }
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
                title: 'Scenario 1',
                content: 'Only right guard and Zyrachy are visible',
                image: '../assets/scenarios/scenario1.jpg',
                isFinal: true,
                details: {
                    description: `In this scenario, you'll encounter Zyrachy alongside the right guard positioned near the bridge's eastern section. The absence of the left guard creates an optimal opportunity for engagement from the southern approach. The right guard typically maintains a patrol pattern between the bridge's midpoint and eastern checkpoint, while Zyrachy remains visible from multiple vantage points. Consider using the terrain elevation to your advantage, as the southern ridgeline provides excellent cover and clear sightlines to both targets. Be mindful of the right guard's regular scanning patterns, which often include checks towards the southern hills.`,
                    tacticalImage: '../assets/scenarios/scenario1-tactical.jpg',
                    checkpoints: [
                        'Confirm left guard absence',
                        'Track right guard patrol pattern',
                        'Identify Zyrachy\'s position',
                        'Scout southern approach routes',
                        'Verify optimal sniping positions'
                    ]
                }
            },
            scenario2: {
                id: 'scenario2',
                title: 'Scenario 2',
                content: 'Both guards and Zyrachy are visible',
                image: '../assets/scenarios/scenario2.jpg',
                isFinal: true,
                details: {
                    description: `This scenario presents the most complex engagement, with both guards actively patrolling alongside Zyrachy. The guards maintain coordinated patrol routes, covering both bridge approaches and the central area. Your primary advantage lies in timing your approach between their patrol cycles. The eastern ridge offers the best vantage point for observing guard patterns while maintaining cover. Watch for moments when the guards separate, as this creates opportunities for isolated engagements. The western approach, while more exposed, can be viable during specific patrol configurations when both guards are focused on the eastern side.`,
                    tacticalImage: '../assets/scenarios/scenario2-tactical.jpg',
                    checkpoints: [
                        'Monitor guard patrol synchronization',
                        'Identify guard separation patterns',
                        'Map Zyrachy\'s movement relative to guards',
                        'Note cover positions along approach routes',
                        'Plan primary and backup extraction paths'
                    ]
                }
            },
            scenario3: {
                id: 'scenario3',
                title: 'Scenario 3',
                content: 'Only left guard and Zyrachy are visible',
                image: '../assets/scenarios/scenario3.jpg',
                isFinal: true,
                details: {
                    description: `With only the left guard and Zyrachy present, this scenario offers a moderate challenge focused on the western section of the area. The left guard follows a predictable patrol route between the western bridge entrance and the central checkpoint. Zyrachy's position remains constant, allowing for strategic positioning. The northern ridgeline provides excellent oversight of both targets while maintaining safe distance. Be particularly attentive to the left guard's frequent scanning of the northern approaches, as they tend to focus more attention on this direction compared to other scenarios.`,
                    tacticalImage: '../assets/scenarios/scenario3-tactical.jpg',
                    checkpoints: [
                        'Verify right guard absence',
                        'Study left guard patrol timing',
                        'Mark Zyrachy\'s static position',
                        'Identify northern approach routes',
                        'Plan counter-measures for guard scans'
                    ]
                }
            },
            scenario4: {
                id: 'scenario4',
                title: 'Scenario 4',
                content: 'Only Zyrachy is visible',
                image: '../assets/scenarios/scenario4.jpg',
                isFinal: true,
                details: {
                    description: `This represents the optimal scenario for engagement, with only Zyrachy present in the area. Without guard interference, you have maximum flexibility in choosing your approach and engagement timing. Zyrachy maintains their standard behavior patterns but without the additional security of guard patrols. The eastern high ground offers the best combination of cover and firing positions, though all approach vectors are viable. Despite the lack of guards, maintain awareness of other potential threats and always plan multiple extraction routes.`,
                    tacticalImage: '../assets/scenarios/scenario4-tactical.jpg',
                    checkpoints: [
                        'Confirm absence of both guards',
                        'Track Zyrachy\'s isolated patterns',
                        'Survey all possible approach routes',
                        'Identify optimal firing positions',
                        'Map multiple extraction paths'
                    ]
                }
            },
            scenario5: {
                id: 'scenario5',
                title: 'Scenario 5',
                content: 'Bugged Left Guard Scenario',
                image: '../assets/scenarios/scenario5.jpg',
                isFinal: true,
                details: {
                    description: `This unique scenario features a bugged left guard partially visible behind a rock, with only their weapon exposed. The guard's position remains fixed, but their stance may vary between sitting and standing. The right guard's presence is variable and should not affect your tactical approach. This scenario requires special attention to the bugged guard's limited visibility, as their actual threat radius may not match their visible profile. Maintain extra distance from the rock formation where the guard is bugged, as their attack patterns can be unpredictable despite their limited visibility.`,
                    tacticalImage: '../assets/scenarios/scenario5-tactical.jpg',
                    checkpoints: [
                        'Identify bugged guard\'s weapon position',
                        'Note guard\'s current stance',
                        'Check right guard presence/absence',
                        'Mark safe distances from bugged guard',
                        'Plan approach avoiding guard\'s attack radius'
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