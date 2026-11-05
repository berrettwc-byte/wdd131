// courses.js
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
  { 
    sectionNum: 1, 
    roomNum: 'STC 353', 
    enrolled: 26, 
    days: 'TTh', 
    instructor: 'Bro T'
  },
  { 
    sectionNum: 2, 
    roomNum: 'STC 347', 
    enrolled: 28, 
    days: 'TTh', 
    instructor: 'Sis A'
  }
],
// Embedding a method into the array
enrollStudent: function(num) {
  // get the section that has sectionNum == num
  const theSection = this.sections.find(
    section => section.sectionNum === num);
  // increment enrolled
  console.log(theSection);
  theSection.enrolled++;
},
dropStudent: function(num) {
  // get the section that has sectionNum == num
  const theSection = this.sections.find(
    section => section.sectionNum === num);
  // increment enrolled
  console.log(theSection);
  theSection.enrolled--;
}
};

console.log(aCourse.sections.enrolled);

function courseInfo(course) {
    const courseName = document.querySelector("#courseName");
    const courseCode = document.querySelector("#courseCode");
    courseName.textContent = course.name;
    courseCode.textContent = course.code;
}

function sectionTemplate(section) {
    return `<tr>
          <td>${section.sectionNum}</td>
          <td>${section.roomNum}</td>
          <td>${section.enrolled}</td>
          <td>${section.days}</td>
          <td>${section.instructor}</td>
        </tr>
    
    `
}

function setSections(sections) {
    const sectionsEl = document.querySelector("#sections");
    const html = sections.map(sectionTemplate)
    sectionsEl.innerHTML = html.join("");
}

courseInfo(aCourse);
setSections(aCourse.sections);

function enrollHandler(ev) {
  console.log(ev)
  if(ev.target.id === "enrollStudent")
    return 
}

document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  aCourse.enrollStudent(sectionNum);
  setSections(aCourse.sections);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  aCourse.dropStudent(sectionNum);
  setSections(aCourse.sections);
});