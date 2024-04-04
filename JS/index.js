let grades = {};
let catInd = 0;

function displayGrades() {
  let gradesDiv = document.getElementById('grades');
  gradesDiv.innerHTML = '';
  for (let itemType in grades) {
    if (grades.hasOwnProperty(itemType)) {
      if (grades[itemType].length == 0) {
        continue;
      }
      let itemTypeDiv = document.createElement('div');
      itemTypeDiv.textContent = `${itemType}:`;
      grades[itemType].forEach((grade, index) => {
        let dropText = grade.dropped ? ' (Dropped)' : '';
        let gradeElement = document.createElement('div');
        gradeElement.textContent = `Item: ${grade.name}, Mark: ${grade.mark}${dropText}, Weight: ${grade.weight}%`;

        // Create a delete button for each item
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(itemType, index); // Call deleteItem function with itemType and index
        gradeElement.appendChild(deleteButton);

        itemTypeDiv.appendChild(gradeElement);
      });
      gradesDiv.appendChild(itemTypeDiv);
      printItemList();
    }
  }
}

function printItemList() {
  for (let itemType in grades) {
    console.log(grades[itemType]);
  }
}

function calculateAverage() {
  let totalMark = 0;
  let totalItems = 0;
  for (let itemType in grades) {
    if (grades.hasOwnProperty(itemType)) {
      grades[itemType].forEach((grade) => {
        if (!grade.dropped) {
          totalMark += grade.mark;
          totalItems++;
        }
      });
    }
  }
  let averageMark = totalItems > 0 ? totalMark / totalItems : 0;
  document.getElementById('average').textContent = `Average Mark: ${averageMark.toFixed(2)}`;
}

function deleteItem(itemType, index) {
  grades[itemType].splice(index, 1); // Remove the item at the specified index
  displayGrades(); // Update the displayed grades
  calculateAverage(); // Recalculate the average
}

function toggleDropdown ( categoryId ) {
  // This function will toggle the visibility of the category-content
  let categoryContent = document.querySelector( `div[categoryId='${ categoryId }'] .category-content` );  categoryContent.style.display = categoryContent.style.display === 'none' ? 'block' : 'none';
}

function addItem() {
  // This function will clone the category-body and append it to the category-content
  let categoryContent = document.querySelector('.category-content');
  let newCategoryBody = categoryContent.children[0].cloneNode(true);
  newCategoryBody.querySelector('.input-item-name').value = '';
  newCategoryBody.querySelector('.input-item-grade').value = '';
  newCategoryBody.querySelector('input[type="checkbox"]').checked = false;
  categoryContent.appendChild(newCategoryBody);
}

function dropItem(checkbox) {
  let categoryBody = checkbox.closest('.category-body');
  if (checkbox.checked) {
    categoryBody.classList.add('dropped');
  } else {
    categoryBody.classList.remove('dropped');
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



