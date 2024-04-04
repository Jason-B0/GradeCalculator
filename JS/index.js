let grades = {};
let catInd = 0;



function printItemList() {
  for (let itemType in grades) {
    console.log(grades[itemType]);
  }
}
function displayGrades ()
{
  let gradesAndWeightages = [];

  // Get all the grade categories
  const categories = document.querySelectorAll( '.grade-category' );

  // Loop through each category
  categories.forEach( ( category ) =>
  {
    // Get the weightage for this category
    const weightage = parseFloat( category.querySelector( '.input-weightage' ).value );

    // Get all the grades for this category
    const grades = [];
    const gradeInputs = category.querySelectorAll('.input-item-grade');
    for (let i = 0; i < gradeInputs.length; i++) {
      const gradeInput = gradeInputs[i];
      const grade = parseFloat(gradeInput.value);
      const categoryBody = gradeInput.closest('.category-body');
      if (!isNaN(grade) && !categoryBody.classList.contains('dropped')) {
        grades.push(grade);
      }
    }

    gradesAndWeightages.push( { grades, weightage } );
  } );

  let grade = calculateGrades( gradesAndWeightages );
  console.log( grade );
  document.getElementById( 'Current Grade' ).innerHTML = grade;
}

function calculateGrades ( gradesAndWeightages )
{
  let totalGrade = 0;

  // Loop through each category
  gradesAndWeightages.forEach( ( { grades, weightage } ) =>
  {
    // Calculate the average grade for this category
    let categoryGrade = grades.reduce( ( a, b ) => a + b, 0 ) / grades.length;

    // Add the weighted grade to the total grade
    totalGrade += categoryGrade * ( weightage / 100 );
  } );

  // Return the total grade
  return totalGrade;
}

function deleteItem(itemType, index) {
  grades[itemType].splice(index, 1); // Remove the item at the specified index
  displayGrades(); // Update the displayed grades
  calculateAverage(); // Recalculate the average
}

function toggleDropdown ( categoryId ) {
  // This function will toggle the visibility of the category-content
  let categoryContent = document.querySelector( `div[categoryId='${ categoryId }'] .category-content` );
  let dropdownArrow = document.querySelector( `div[categoryId='${ categoryId }'] .dropdown-arrow` );
  if ( categoryContent.style.display === 'none' )
  {
    categoryContent.style.display = 'block';
    dropdownArrow.textContent = '▲'; // Change the arrow to up
  } else
  {
    categoryContent.style.display = 'none';
    dropdownArrow.textContent = '▼'; // Change the arrow to down
  }
}

function addItem( categoryId ) {
  // This function will clone the category-body and append it to the category-content
  let categoryContent = document.querySelector( `div[categoryId='${ categoryId }'] .category-content` );
  let newCategoryBody = categoryContent.children[ 0 ].cloneNode( true );
  newCategoryBody.querySelector('.input-item-name').value = '';
  newCategoryBody.querySelector('.input-item-grade').value = '';
  newCategoryBody.querySelector('input[type="checkbox"]').checked = false;
  categoryContent.appendChild(newCategoryBody);
}

function dropItem ( categoryId, checkbox )
{
  // Select the category with the given categoryId
  let category = document.querySelector( `div[categoryId='${ categoryId }']` );

  // Get the categoryId of the checkbox's grandparent
  let checkboxCategoryId = checkbox.parentElement.parentElement.parentElement.parentElement.getAttribute( 'categoryId' );

  // Check if the checkbox is in the correct category
  if ( categoryId === checkboxCategoryId )
  {
    if ( checkbox.checked )
    {
      checkbox.closest( '.category-body' ).classList.add( 'dropped' );
    } else
    {
      checkbox.closest( '.category-body' ).classList.remove( 'dropped' );
    }
  } else
  {
    console.error( 'The item is not in the correct category' );
  }
}
function addCategory() {
  // This function will add a new 'TwentyTwoCharacters' section
  catInd++;

  let container = document.querySelector('.main-box'); // Assuming .main-box is where the categories should be added
  let categoryTemplate = document.querySelector('.grade-category'); // This should be the template you want to clone

  // Clone the 'TwentyTwoCharacters' section
  categoryTemplate.setAttribute( 'categoryId', 'category-' + catInd );
  let newCategory = categoryTemplate.cloneNode( true );
  let categoryBodies = newCategory.querySelectorAll( '.category-body' );

  // If there's more than one category body, remove all but one
  if ( categoryBodies.length > 1 )
  {
    for ( let i = 1; i < categoryBodies.length; i++ )
    {
      categoryBodies[ i ].parentNode.removeChild( categoryBodies[ i ] );
    }
  }
  
  categoryTemplate.setAttribute( 'categoryId', 'category-' + 0 );

  // Clear any input fields in the cloned section
  let inputs = newCategory.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.type === 'text') {
      input.value = '';
    } else if (input.type === 'checkbox') {
      input.checked = false;
    }
  });

  // Append the new category to the container
  container.appendChild(newCategory);
}



