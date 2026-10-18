import assert from 'node:assert';
import { useGameStore } from '../store/gameStore.js';

console.log('Testing PC Forge Foundation and Store Logic...');

const store = useGameStore.getState();

// 1. Initial State
assert.strictEqual(store.currentScreen, 'menu', 'Initial screen should be menu');

// 2. Sandbox Setup and Workshop transition
store.setSandboxConfig({ budgetType: 'custom', customBudget: 75000 });
store.startSandbox();
assert.strictEqual(useGameStore.getState().currentScreen, 'workshop', 'Should enter workshop');
assert.strictEqual(useGameStore.getState().gameMode, 'sandbox', 'Mode should be sandbox');

// 3. Part Installation and Power Check
const starterCpu = store.catalog.cpu[0];
const starterMb = store.catalog.motherboard[0];
const starterPsu = store.catalog.psu[0];

useGameStore.getState().installPart(starterCpu);
assert.ok(useGameStore.getState().installedParts.cpu, 'CPU should be installed');

// Power on without MB/PSU should fail POST
useGameStore.getState().togglePower(true);
assert.strictEqual(useGameStore.getState().powerState, 'failed', 'Power should fail without full core');

// Install remaining core parts
useGameStore.getState().installPart(starterMb);
useGameStore.getState().installPart(starterPsu);
useGameStore.getState().togglePower(true); // turn on
assert.strictEqual(useGameStore.getState().powerState, 'on', 'Power should turn on with core components');

// 4. Career Mode Transitions
useGameStore.getState().startNewCareer();
assert.strictEqual(useGameStore.getState().gameMode, 'career', 'Mode should switch to career');
assert.strictEqual(useGameStore.getState().currentScreen, 'career-dashboard', 'Screen should be career-dashboard');
assert.strictEqual(useGameStore.getState().career.balance, 45000, 'Career balance should be 45000');

useGameStore.getState().acceptCareerOrder('order-001');
assert.strictEqual(useGameStore.getState().currentScreen, 'workshop', 'Accepting order should enter workshop');
assert.strictEqual(useGameStore.getState().career.activeOrderId, 'order-001', 'Active order should match');

// 5. Settings
useGameStore.getState().updateSettings({ soundEnabled: false, graphicsQuality: 'ultra' });
assert.strictEqual(useGameStore.getState().settings.soundEnabled, false, 'Audio should be disabled');
assert.strictEqual(useGameStore.getState().settings.graphicsQuality, 'ultra', 'Graphics should be ultra');

// 6. Reset
useGameStore.getState().resetCareerSave();
assert.strictEqual(useGameStore.getState().currentScreen, 'menu', 'Reset should return to menu');

// 7. Suggestions and Contribute Hub
const initialSugCount = useGameStore.getState().suggestions.length;
assert.ok(initialSugCount >= 4, 'Should have default pre-populated community suggestions');

// Open contribute from menu
useGameStore.getState().openContribute('menu');
assert.strictEqual(useGameStore.getState().currentScreen, 'contribute', 'Should enter contribute screen');
assert.strictEqual(useGameStore.getState().previousScreen, 'menu', 'Previous screen should be recorded');

// Add custom user suggestion
useGameStore.getState().addSuggestion({
  title: 'Test GPU 4090 Monster',
  description: 'Extreme triple-slot 450W power draw card for stress tests.',
  category: 'hardware',
  author: 'BenchmarkTester'
});

const updatedSugs = useGameStore.getState().suggestions;
assert.strictEqual(updatedSugs.length, initialSugCount + 1, 'Suggestion count should increase by 1');
assert.strictEqual(updatedSugs[0].title, 'Test GPU 4090 Monster', 'New suggestion should be at the top');

// Test upvote toggle
const testId = updatedSugs[0].id;
const initialVotes = updatedSugs[0].votes;
useGameStore.getState().upvoteSuggestion(testId);
assert.strictEqual(useGameStore.getState().suggestions[0].votes, initialVotes - 1, 'Toggle upvote should decrement when already upvoted');
// 8. About Screen Navigation
useGameStore.getState().openAbout('menu');
assert.strictEqual(useGameStore.getState().currentScreen, 'about', 'Should navigate to about screen');
assert.strictEqual(useGameStore.getState().previousScreen, 'menu', 'Previous screen should be menu');

console.log('✔ All Foundation checks, Community Suggestion tests, and About Screen tests passed successfully.');
