let grades = {};

function addItem() {
  let itemName = document.getElementById('itemName').value;
  let itemType = document.getElementById('itemType').value;
  let dropItem = document.getElementById('dropItem').checked;
  let itemMark = parseFloat(document.getElementById('itemMark').value);
  let itemWeight = parseFloat(document.getElementById('itemWeight').value);

  if (itemMark > 100) {
    alert('Max mark is 100');
    document.getElementById('itemMark').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemType').value = 'homework';
    document.getElementById('itemWeight').value = '';
    return;
  }

  if (itemName && itemType && itemWeight) {
    if (!grades[itemType]) {
      grades[itemType] = []
    }
    grades[itemType].push({ name: itemName, mark: itemMark, weight: itemWeight, dropped: dropItem });
    displayGrades();
    calculateAverage();
  } else {
    alert('Please fill in all fields correctly.');
  }
}

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

function toggleDropdown() {
  // This function will toggle the visibility of the category-content
  let categoryContent = document.querySelector('.category-content');
  categoryContent.style.display = categoryContent.style.display === 'none' ? 'block' : 'none';
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
  let container = document.querySelector('.main-box'); // Assuming .main-box is where the categories should be added
  let categoryTemplate = document.querySelector('.grade-category'); // This should be the template you want to clone

  // Clone the 'TwentyTwoCharacters' section
  let newCategory = categoryTemplate.cloneNode(true);

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



