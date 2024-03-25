const assert = require('assert');
const rewire = require('rewire');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Rewire the script.js file
const app = rewire('./script.js');

// Mock the document object
const { document } = (new JSDOM('')).window;
global.document = document;

// Get the functions from the app
const addItem = app.__get__('addItem');
const displayGrades = app.__get__('displayGrades');
const calculateAverage = app.__get__('calculateAverage');
const deleteItem = app.__get__('deleteItem');

describe('Test script.js', function () {
    beforeEach(function () {
        // Reset the grades object before each test
        app.__set__('grades', {});
    });

    it('should add an item to the grades object', function () {
        document.getElementById = id => ({
            value: id === 'itemName' ? 'Test' : 'homework',
            checked: false
        });
        addItem();
        const grades = app.__get__('grades');
        assert.deepStrictEqual(grades, { homework: [{ name: 'Test', mark: NaN, weight: NaN, dropped: false }] });
    });

    it('should display the grades', function () {
        app.__set__('grades', { homework: [{ name: 'Test', mark: 90, weight: 10, dropped: false }] });
        const gradesDiv = document.createElement('div');
        document.getElementById = () => gradesDiv;
        displayGrades();
        assert.strictEqual(gradesDiv.innerHTML, '<div>homework:<div>Item: Test, Mark: 90, Weight: NaN%</div></div>');
    });

    it('should calculate the average mark', function () {
        app.__set__('grades', { homework: [{ name: 'Test', mark: 90, weight: 10, dropped: false }] });
        const averageDiv = document.createElement('div');
        document.getElementById = () => averageDiv;
        calculateAverage();
        assert.strictEqual(averageDiv.textContent, 'Average Mark: 90.00');
    });

    it('should delete an item from the grades object', function () {
        app.__set__('grades', { homework: [{ name: 'Test', mark: 90, weight: 10, dropped: false }] });
        deleteItem('homework', 0);
        const grades = app.__get__('grades');
        assert.deepStrictEqual(grades, { homework: [] });
    });
});
