document.getElementById('noOfSubject').oninput = function() {
    const noOfSubject = parseInt(this.value);
    const subjectInputsContainer = document.getElementById('subjectInputs');
    subjectInputsContainer.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < noOfSubject; i++) {
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Enter name for Subject ' + (i + 1) + ': ';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'e.g English';
        nameInput.id = 'nameInput_' + i; // Unique ID for each input

        const scoreLabel = document.createElement('label');
        scoreLabel.textContent = 'Enter score for Subject ' + (i + 1) + ': ';
        
        const scoreInput = document.createElement('input');
        scoreInput.type = 'number';
        scoreInput.placeholder = 'e.g 50';
        scoreInput.id = 'scoreInput_' + i; // Unique ID for each input

        subjectInputsContainer.appendChild(document.createElement('br'));
        subjectInputsContainer.appendChild(nameLabel);
        subjectInputsContainer.appendChild(nameInput);
        subjectInputsContainer.appendChild(document.createElement('br'));
        
        subjectInputsContainer.appendChild(scoreLabel);
        subjectInputsContainer.appendChild(scoreInput);
        subjectInputsContainer.appendChild(document.createElement('br'));
    }
};

function generateMarksheet() {
    const noOfSubject = parseInt(document.getElementById('noOfSubject').value);
    const subjectInputsContainer = document.getElementById('subjectInputs');
    const marksheetContainer = document.getElementById('marksheet');
    const name = document.getElementById('name').value;

    marksheetContainer.innerHTML = ''; // Clear previous marksheet

    const nameHeader = document.createElement('h3');
    nameHeader.textContent = 'Name: ' + name;
    marksheetContainer.appendChild(nameHeader);

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const subjectNameHeader = document.createElement('th');
    subjectNameHeader.textContent = 'Subject Name';
    const scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Score';
    const gradeHeader = document.createElement('th');
    gradeHeader.textContent = 'Grade';
    const percentageHeader = document.createElement('th');
    percentageHeader.textContent = 'Percentage';

    headerRow.appendChild(subjectNameHeader);
    headerRow.appendChild(scoreHeader);
    headerRow.appendChild(gradeHeader);
    headerRow.appendChild(percentageHeader);
    table.appendChild(headerRow);

    let totalScore = 0;

    for (let i = 0; i < noOfSubject; i++) {
        const nameInput = document.getElementById('nameInput_' + i);
        const scoreInput = document.getElementById('scoreInput_' + i);
        const subjectName = nameInput.value;
        const score = parseInt(scoreInput.value);
        totalScore += score;

        const percentage = (score / 100) * 100;
        let grade = '';

        if (percentage >= 80) {
            grade = 'A+';
        } else if (percentage >= 70) {
            grade = 'A';
        } else if (percentage >= 60) {
            grade = 'B';
        } else if (percentage >= 50) {
            grade = 'C';
        } else if (percentage >= 40) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        const row = document.createElement('tr');
        const subjectNameCell = document.createElement('td');
        subjectNameCell.textContent = subjectName;
        const scoreCell = document.createElement('td');
        scoreCell.textContent = score;
        const gradeCell = document.createElement('td');
        gradeCell.textContent = grade;
        const percentageCell = document.createElement('td');
        percentageCell.textContent = percentage.toFixed(2) + '%';

        row.appendChild(subjectNameCell);
        row.appendChild(scoreCell);
        row.appendChild(gradeCell);
        row.appendChild(percentageCell);
        table.appendChild(row);
    }

    // Calculate overall percentage and grade
    const overallPercentage = (totalScore / (noOfSubject * 100)) * 100;
    let overallGrade = '';

    if (overallPercentage >= 80) {
        overallGrade = 'A+';
    } else if (overallPercentage >= 70) {
        overallGrade = 'A';
    } else if (overallPercentage >= 60) {
        overallGrade = 'B';
    } else if (overallPercentage >= 50) {
        overallGrade = 'C';
    } else if (overallPercentage >= 40) {
        overallGrade = 'D';
    } else {
        overallGrade = 'F';
    }

    // Create overall summary row
    const overallRow = document.createElement('tr');
    const overallCell = document.createElement('td');
    overallCell.colSpan = 4; // Span across all columns
    overallCell.textContent = `Overall Score: ${totalScore}, Overall Percentage: ${overallPercentage.toFixed(2)}%, Overall Grade: ${overallGrade}`;
    overallRow.appendChild(overallCell);
    table.appendChild(overallRow);

    marksheetContainer.appendChild(table);

    // Show download button
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';

    // Download functionality
    downloadButton.onclick = function() {
        let markSheetContent = `Name: ${name}\n\n`;
        markSheetContent += 'Subject Name\tScore\tGrade\tPercentage\n';

        for (let i = 0; i < noOfSubject; i++) {
            const nameInput = document.getElementById('nameInput_' + i);
            const scoreInput = document.getElementById('scoreInput_' + i);
            const subjectName = nameInput.value;
            const score = parseInt(scoreInput.value);

            const percentage = (score / 100) * 100;
            let grade = '';

            if (percentage >= 80) {
                grade = 'A+';
            } else if (percentage >= 70) {
                grade = 'A';
            } else if (percentage >= 60) {
                grade = 'B';
            } else if (percentage >= 50) {
                grade = 'C';
            } else if (percentage >= 40) {
                grade = 'D';
            } else {
                grade = 'F';
            }

            markSheetContent += `${subjectName}\t${score}\t${grade}\t${percentage.toFixed(2)}%\n`;
        }

        // Add overall summary to mark sheet content
        markSheetContent += `\nOverall Score: ${totalScore}, Overall Percentage: ${overallPercentage.toFixed(2)}%, Overall Grade: ${overallGrade}`;

        // Create a Blob with mark sheet content
        const blob = new Blob([markSheetContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a download link and trigger click
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mark_sheet.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
}
