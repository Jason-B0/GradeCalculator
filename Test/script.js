let grades = {};

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemType = document.getElementById('itemType').value;
    const dropItem = document.getElementById('dropItem').checked;
    const itemMark = parseFloat(document.getElementById('itemMark').value);
    const itemWeight = parseFloat(document.getElementById('itemWeight').value);


    if(itemMark > 100) {
        alert('Max mark is 100');
        document.getElementById('itemMark').value = '';
        document.getElementById('itemName').value = '';
        document.getElementById('itemType').value = 'homework';
        document.getElementById('itemWeight').value = '';
        return;
    }

    if(itemName && itemType && itemWeight){
        if(!grades[itemType]) {
            grades[itemType] = []
        }
        grades[itemType].push({ name: itemName, mark: itemMark, weight: itemWeight, dropped: dropItem});
        displayGrades();
        calculateAverage();
    } else {
        alert('Please fill in all fields correctly.');
    }
}


function displayGrades() {
    const gradesDiv = document.getElementById('grades');
    gradesDiv.innerHTML = '';
  for (const itemType in grades) {
    if (grades.hasOwnProperty(itemType)) {
        if(grades[itemType].length == 0) {
            continue;
        }
      const itemTypeDiv = document.createElement('div');
      itemTypeDiv.textContent = `${itemType}:`;
      grades[itemType].forEach((grade, index) => {
        const dropText = grade.dropped ? ' (Dropped)' : '';
        const gradeElement = document.createElement('div');
        gradeElement.textContent = `Item: ${grade.name}, Mark: ${grade.mark}${dropText}, Weight: ${grade.weight}%`;
       
        // Create a delete button for each item
        const deleteButton = document.createElement('button');
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
    for(const itemType in grades) {
        console.log(grades[itemType]);
    }
}

function calculateAverage() {
    let totalMark = 0;
    let totalItems = 0;
    for (const itemType in grades) {
      if (grades.hasOwnProperty(itemType)) {
        grades[itemType].forEach((grade) => {
          if (!grade.dropped) {
            totalMark += grade.mark;
            totalItems++;
          }
        });
      }
    }
    const averageMark = totalItems > 0 ? totalMark / totalItems : 0;
    document.getElementById('average').textContent = `Average Mark: ${averageMark.toFixed(2)}`;
}

function deleteItem(itemType, index) {
    grades[itemType].splice(index, 1); // Remove the item at the specified index
    displayGrades(); // Update the displayed grades
    calculateAverage(); // Recalculate the average
}


