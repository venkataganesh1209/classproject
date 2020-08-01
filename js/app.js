window.addEventListener("DOMContentLoaded", () => {
  //get number of courses on first form submission
  let numCourses;

  document
    .getElementById("numCoursesSubmit")
    .addEventListener("click", (event) => {
      event.preventDefault();
      numCourses = document.querySelector("#numberOfCourses").value;
      generateGPAForm(numCourses);
      //display GPA on new form submission
      document
        .getElementById("GPASubmit")
        .addEventListener("click", (event) => {
          event.preventDefault();
          const GPA = calculateGPA(numCourses);
          document.getElementById("GPA").innerText = GPA;
        });
    });

  //generate form asking for each courses details
  function generateGPAForm(numCourses) {
    const fragment = new DocumentFragment();
    const form = document.createElement("form");
    for (i = 1; i <= numCourses; i++) {
      const div = document.createElement("div");
      div.classList.add("GPAcourseData");
      div.innerHTML = `
        <h4>Course ${i}</h4>
        <label for="creditHours${i}">Credit Hours :</label>
        <input id="creditHours${i}" type="number" name="creditHours" class="creditHours" min="0" placeholder="Enter positive number" required>
        <label for="grade${i}">Letter Grade :</label>
        <input id="grade${i}" type="text" name="letterGrades" class="letterGrades" maxlength="1" placeholder="Enter single letter" required>`;
      form.append(div);
    }
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.id = "GPASubmit";
    submit.value = "Submit";
    form.append(submit);
    fragment.append(form);
    document.body.insertBefore(fragment, document.getElementById("displayGPA"));
  }

  //calculate GPA
  function calculateGPA(numCourses) {
    const creditHourInputs = document.getElementsByClassName("creditHours");
    const letterGradeInputs = document.getElementsByClassName("letterGrades");
    let creditHoursSum = 0,
      gradeXcreditHourSum = 0;
    for (i = 0; i < numCourses; i++) {
      const grade = letterGradeInputs[i].value;
      const creditHours = Number(creditHourInputs[i].value);
      const gradeXcreditHour = convertLettertoNumeric(grade) * creditHours;
      creditHoursSum += creditHours;
      gradeXcreditHourSum += gradeXcreditHour;
    }
    if (creditHoursSum !== 0) {
      return (gradeXcreditHourSum / creditHoursSum).toFixed(2);
    } else {
      return "credit hours cannot be equal to zero";
    }
  }

  //convert letter grade to numeric
  function convertLettertoNumeric(letterGrade) {
    switch (letterGrade) {
      case "A":
      case "a":
        return 4.0;
      case "B":
      case "b":
        return 3.0;
      case "C":
      case "c":
        return 2.0;
      case "D":
      case "d":
        return 1.0;
      case "F":
      case "f":
        return 0;
      default:
        alert("your letter grade input was invalid");
    }
  }
});
