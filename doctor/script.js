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

function addPatient() {
  document.getElementById('addPatientForm').style.display = 'block';
}

function submitPatient() {
  const name = document.getElementById('patientName').value;
  const email = document.getElementById('patientEmail').value;
  const age = document.getElementById('patientAge').value;

  if (!name || !email || !age) {
    alert("Please fill in all fields");
    return;
  }

  const newPatient = { name, email, age, password: "default123" }; // Default password for now

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPatient)
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    document.getElementById('addPatientForm').style.display = 'none';
  })
  .catch(error => console.error('Error adding patient:', error));
}
