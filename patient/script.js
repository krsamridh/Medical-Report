function viewRecords() {
    fetch('http://localhost:3000/getUser')
      .then(response => response.json())
      .then(data => {
        const recordsDiv = document.getElementById('records');
        recordsDiv.innerHTML = '<h2>Medical Records</h2>';
        recordsDiv.style.display = 'block';
  
        data.userDetails.forEach(user => {
          const record = `<p><strong>Name:</strong> ${user.name} <br>
                          <strong>Email:</strong> ${user.email} <br>
                          <strong>Age:</strong> ${user.age} <br>
                          <strong>Registered:</strong> ${new Date(user.dateRegistered).toLocaleDateString()}
                          </p><hr>`;
          recordsDiv.innerHTML += record;
        });
      })
      .catch(error => console.error('Error fetching records:', error));
  }
  
  function scheduleAppointment() {
    alert("Feature to schedule an appointment is coming soon!");
  }
  