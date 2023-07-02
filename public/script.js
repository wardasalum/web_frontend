
  function deleteAttendance(id) {
    if (confirm("Are you sure you want to delete this attendance record?")) {
      fetch(`/delet/${id}`, { method: 'GET' })
        .then(response => {
          if (response.ok) {
            // Display a success message
            alert("Attendance record deleted successfully");
            location.reload(); // Refresh the page after successful deletion
          } else {
            throw new Error('Error deleting the attendance record');
          }
        })
        .catch(error => {
          console.error(error);
          // Handle the error as needed
        });
    }
  }


  
  