// Add this JavaScript code to your HTML template

  // Get the delete buttons
  const deleteButtons = document.querySelectorAll('.btn-delete');

  // Add a click event listener to each delete button
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const confirmation = confirm("Are you sure you want to delete this record?");

      if (confirmation) {
        const form = button.parentElement;
        const url = form.action;

        // Send a DELETE request to the server
        fetch(url, { method: 'DELETE' })
          .then((response) => response.text())
          .then((message) => {
            alert(message);
            window.location.reload(); // Reload the page after successful deletion
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while deleting the record.');
          });
      }
    });
  });

