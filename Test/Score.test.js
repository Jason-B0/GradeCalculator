const assert = require( 'assert' );
const rewire = require( 'rewire' );

// Rewire the script.js file
const app = rewire( '../JS/index.js' );

// Get the functions from the app
const calculateGrades = app.__get__( 'calculateGrades' );
const addCategory = app.__get__( 'addCategory' );
const displayGrades = app.__get__( 'displayGrades' );

describe( 'Test index.js', function ()
{
    it( 'should calculate grades correctly', function ()
    {
        const gradesAndWeightages = [
            { grades: [ 90, 80, 70 ], weightage: 50 },
            { grades: [ 80, 70, 60 ], weightage: 20 },
            { grades: [ 70, 60, 50 ], weightage: 30 }
        ];
        const result = calculateGrades( gradesAndWeightages );
        assert.strictEqual( result, 72 );
    } );

    describe( 'addCategory', function ()
    {
        it( 'should add a new category with a unique ID', function ()
        {
            // Add a new category
            addCategory();

            // Get the last category added
            const categories = document.querySelectorAll( '.grade-category' );
            const lastCategory = categories[ categories.length - 1 ];

            // Check that the category ID is unique
            const categoryId = lastCategory.getAttribute( 'categoryId' );
            const matchingCategories = document.querySelectorAll( `div[categoryId='${ categoryId }']` );
            assert.strictEqual( matchingCategories.length, 1 );
        } );
    } );

    describe( 'displayGrades', function ()
    {
        it( 'should display the correct grade calculation', function ()
        {
            // Add some grades and weightages
            const gradesAndWeightages = [
                { grades: [ 90, 80, 70 ], weightage: 50 },
                { grades: [ 80, 70, 60 ], weightage: 20 },
                { grades: [ 70, 60, 50 ], weightage: 30 }
            ];

            // Calculate the expected grade
            let expectedGrade = calculateGrades( gradesAndWeightages );

            // Display the grades
            displayGrades();

            // Check that the displayed grade is correct
            const displayedGrade = parseFloat( document.getElementById( 'Current Grade' ).innerHTML );
            assert.strictEqual( displayedGrade, expectedGrade );
        } );
    } );
} );