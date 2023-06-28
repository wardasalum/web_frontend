function submitAttendance(event) {
    event.preventDefault();

    const teacherName = document.getElementById("teacherName").value;
    const courseName = document.getElementById("courseName").value;
    const studentID = document.getElementById("studentID").value;
    const studentName = document.getElementById("studentName").value;
    const yearOfStudy = document.getElementById("yearOfStudy").value;
    const attendanceStatus = document.getElementById("attendanceStatus").value;

    const tableBody = document.getElementById("attendanceLogBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${teacherName}</td>
        <td>${courseName}</td>
        <td>${studentID}</td>
        <td>${studentName}</td>
        <td>${yearOfStudy}</td>
        <td>${attendanceStatus}</td>
    `;
    tableBody.appendChild(row);

    // Clear the form fields
    document.getElementById("teacherName").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("studentID").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("yearOfStudy").value = "";
    document.getElementById("attendanceStatus").value = "Present";
}

