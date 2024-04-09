

//this is for admin to be able to view the subscription list.
const subscribePopupBtn = document.getElementById("subscribebutton");
const viewSubsBtn = document.getElementById('subsbtn');
const submitSubsBtn = document.getElementById('submitstyle');
const closeBtn = document.getElementById('closebtnsub');
const subsTablePopup = document.getElementById("tablepopup");
const closeSubsPopupBtn = document.getElementById("closebox");
const subsPopup = document.getElementById('nsPopup');

// fetch function
fetchAndStoreJSON('index.json','index');
fetchAndStoreJSON('introduction.json','introduction');
fetchAndStoreJSON('leopard.json','leopard');
fetchAndStoreJSON('animals.json','animals');
fetchAndStoreJSON('department.json','department');
fetchAndStoreJSON('wilpathu.json','wilpathu');
fetchAndStoreJSON('yala.json','yala');
fetchAndStoreJSON('user.json','userData');

const currentPage = getCurrentPage(); // Implement getCurrentPage() function
window.addEventListener('DOMContentLoaded', LoadPageData(currentPage));

viewSubsBtn.addEventListener('click', ()=>{
    subsTablePopup.style.display = "block";
    updateSubscriptionTable();
});  //when 'view subscriptions list' button is clicked,open the table which retrieves data from the local storage.

// Add click event listener to the button
subscribePopupBtn.addEventListener('click', function() {
    subsPopup.style.display = 'block'; // Show the popup
});

submitSubsBtn.addEventListener('click', subscriptions);

closeSubsPopupBtn.addEventListener("click", function() {
    subsPopup.style.display = "none";
});

// Add click event listener to the close button
closeBtn.addEventListener('click', function() {
    const popup = document.getElementById('tablepopup');
    popup.style.display = 'none'; // Hide the popup
});

function fetchAndStoreJSON(jsonFile,storageKey){
    fetch(jsonFile)
    .then(response=>{
        if (!response.ok){
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data=>{
        localStorage.setItem(storageKey, JSON.stringify(data));
        console.log(`JSON data fetched from ${jsonFile}and stored in local storage with key ${storageKey}`);
    })
    .catch(error=>console.error('There was a problem fetching the Json:',error));
}

//load content
function LoadPageData(currentPage) {
    // Retrieve data from localStorage
    const data = JSON.parse(localStorage.getItem(currentPage));
    
    if (data) {
        // Loop through each element in the data
        for (const elementKey in data) {
            const elementContent = data[elementKey];
            const element = document.getElementById(elementKey);

            // Check if element exists in HTML and content is not empty
            if (element && elementContent) {
                // Check if element is a list
                if (element.tagName === 'UL') {
                    // If element is a list, loop through each item in the array
                    elementContent.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        element.appendChild(li);
                    });
                } else {
                    // Otherwise, set textContent directly
                    element.textContent = elementContent;
                }
            }
        }
    }
}

function getCurrentPage() {
    // Get the current URL
    const url = window.location.href;
  
    // Find the last '/' in the URL
    const lastSlashIndex = url.lastIndexOf('/');
  
    // Extract the page name from the URL
    let currentPage = url.substring(lastSlashIndex + 1);
  
    // Remove the '.html' extension if present
    currentPage = currentPage.replace('.html', '');
  
    return currentPage;
}

function subsTable (){
  subsTablePopup.style.display = "flex";
}

// newsletter js
function subscriptions () {
  // Get the email input elements
  let form = document.getElementById('subscribeForm');
  let emailInput = document.getElementById("email_");
  let fullNameInput = document.querySelector('input[name="fullname"]');

  let fullName = fullNameInput.value.trim();
  let email = emailInput.value.trim();

  // Validate email format
  if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return; // Exit function if email format is invalid
  }

  // Store subscription data in localStorage
  let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
  subscriptions.push({ fullName: fullName, email: email });
  localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));

  // Handle form submission here, like sending data to server
  alert("Subscription successful!");
  subsPopup.style.display = "none"; // Close the popup after submission
  form.reset();
}

// Function to validate email format
function isEmailValid(email) {
  // Regular expression for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// all about the view subscription list table/dashboard

// Function to update the subscription table with the data from localStorage
function updateSubscriptionTable() {
  let subscriptionsData = JSON.parse(localStorage.getItem('newsletterSubscriptions'));
  let subscriptionTableBody = document.querySelector('#subscriptionTable tbody');

  // Clear existing table rows
  subscriptionTableBody.innerHTML = '';

  // Populate table with subscription data
  if (subscriptionsData) {
      subscriptionsData.forEach(function(subscription) {
          let row = document.createElement('tr');
          row.innerHTML = '<td>' + subscription.fullName + '</td><td>' + subscription.email + '</td>';
          subscriptionTableBody.appendChild(row);
      });
  }
}

// // login js

// // Get the modal
// var modal = document.getElementById("loginPopup");

// // Get the button that opens the modal
// var loginBtn = document.getElementById("loginBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// loginBtn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// // Get the logout button
// var logoutBtn = document.getElementById("logoutBtn");

// // Listen for a submit event on the login form
// document.getElementById("loginForm").onsubmit = function(event) {
//   event.preventDefault(); // Prevent the form from submitting in the traditional way
//   alert("Login Successful!"); // Display an alert
//   modal.style.display = "none"; // Hide the login popup
//   loginBtn.style.display = "none"; // Hide the login button
//   logoutBtn.style.display = "block"; // Show the logout button
// }

// // Logout functionality
// logoutBtn.onclick = function() {
//   // For demo purposes, just switch the buttons
//   loginBtn.style.display = "block";
//   logoutBtn.style.display = "none";
// }


// Function to handle login
function login() {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");
    const currentPage = getCurrentPage();

    if (username === "user" && password === "user") {
      alert("Login successful!");
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "inline-block";
      document.getElementById("saveBtn").style.display = "inline-block"; // Show save button
      document.getElementById("subsbtn").style.display = "block";


      if(currentPage == "index"){
        enableEditing();
      } else if (currentPage == "introduction") {
        enableEditing_intro();
      } else if (currentPage == "leopard") {
        enableEditing_leopard();
      } else if (currentPage == "animals") {
        enableEditing_animals();
      }
    } 
    if (username === "admin" && password === "admin") {
      alert("Login successful!");
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "inline-block";
      document.getElementById("saveBtn").style.display = "inline-block"; // Show save button
      document.getElementById("subsbtn").style.display = "block";


      if(currentPage == "index"){
        enableEditing();
      } else if (currentPage == "introduction") {
        enableEditing_intro();
      } else if (currentPage == "leopard") {
        enableEditing_leopard();
      } else if (currentPage == "animals") {
        enableEditing_animals();
      }
    }
    else {
      alert("Login unsuccessful. Please try again.");
    }
  }
  
  // Function to handle logout
  function logout() {
    document.getElementById("loginBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("saveBtn").style.display = "none"; // Hide save button
    disableEditing();
  }

//enable editing 

 // Function to enable content editing
 function enableEditing() {
    const titleElement0 = document.getElementById("title1");
    const contentElement0 = document.getElementById("para1");
    const titleElement1 = document.getElementById("title2");
    const contentElement1 = document.getElementById("para2");
    const titleElement2 = document.getElementById("title3");
    const contentElement2 = document.getElementById("para3");
    const titleElement3 = document.getElementById("title4");
    const contentElement3 = document.getElementById("para4");

    titleElement0.contentEditable = true;
    contentElement0.contentEditable = true;
    titleElement1.contentEditable = true;
    contentElement1.contentEditable = true;
    titleElement2.contentEditable = true;
    contentElement2.contentEditable = true;
    titleElement3.contentEditable = true;
    contentElement3.contentEditable = true;


  }

  function enableEditing_intro(){
    const titleElement10 = document.getElementById("title1");
    const contentElement10 = document.getElementById("content1");
    const titleElement20 = document.getElementById("title2");
    const contentElement20 = document.getElementById("content2");

    titleElement10.contentEditable = true;
    contentElement10.contentEditable = true;
    titleElement20.contentEditable = true;
    contentElement20.contentEditable = true;
  }
  function enableEditing_leopard(){

    const titleElement30 = document.getElementById("title1");
    const contentElement30 = document.getElementById("content1");
    const titleElement40 = document.getElementById("title2");
    const contentElement40 = document.getElementById("content2");
    const titleElement50 = document.getElementById("title3");
    const contentElement50 = document.getElementById("content3");
    const titleElement60 = document.getElementById("title4");
    const contentElement60 = document.getElementById("content4");

    titleElement30.contentEditable = true;
    contentElement30.contentEditable = true;
    titleElement40.contentEditable = true;
    contentElement40.contentEditable = true;
    titleElement50.contentEditable = true;
    contentElement50.contentEditable = true;
    titleElement60.contentEditable = true;
    contentElement60.contentEditable = true;
  }

  function enableEditing_animals(){
    const titleElement70 = document.getElementById("title1");
    const contentElement70 = document.getElementById("content1");
    const titleElement80 = document.getElementById("title2");
    const contentElement80 = document.getElementById("content2");
    const titleElement90 = document.getElementById("title3");
    const contentElement90 = document.getElementById("content3");
    const titleElement100 = document.getElementById("title4");
    const contentElement100 = document.getElementById("content4");

    titleElement70.contentEditable = true;
    contentElement70.contentEditable = true;
    titleElement80.contentEditable = true;
    contentElement80.contentEditable = true;
    titleElement90.contentEditable = true;
    contentElement90.contentEditable = true;
    titleElement100.contentEditable = true;
    contentElement100.contentEditable = true;

  }

  
  // Function to disable content editing
  function disableEditing() {
    const titleElement = document.getElementById("title1");
    const contentElement = document.getElementById("para1");

    const titleElement01 = document.getElementById("title2");
    const contentElement01 = document.getElementById("para2");

    const titleElement2 = document.getElementById("title3");
    const contentElement2 = document.getElementById("para3");

    const titleElement3 = document.getElementById("title4");
    const contentElement3 = document.getElementById("para4");

    titleElement0.contentEditable = false;
    contentElement0.contentEditable = false;
    titleElement1.contentEditable = false;
    contentElement1.contentEditable = false;
    titleElement2.contentEditable = false;
    contentElement2.contentEditable = false;
    titleElement3.contentEditable = false;
    contentElement3.contentEditable = false;


  }

  // function disableEditing_intro(){
  //   const titleElement10 = document.getElementById("intro-title1");
  //   const contentElement10 = document.getElementById("intro-content1");

  //   const titleElement20 = document.getElementById("intro-title2");
  //   const contentElement20 = document.getElementById("intro-content1");

  //   titleElement10.contentEditable = false;
  //   contentElement10.contentEditable = false;
  //   titleElement20.contentEditable = false;
  //   contentElement20.contentEditable = false;
  // }

  // function disableEditing_leopard(){

  //   const titleElement30 = document.getElementById("leopard-title1");
  //   const contentElement30 = document.getElementById("intro-content1");

  //   const titleElement40 = document.getElementById("leopard-title2");
  //   const contentElement40 = document.getElementById("leopard-content2");

  //   const titleElement50 = document.getElementById("leopard-title3");
  //   const contentElement50 = document.getElementById("leopard-content3");

  //   const titleElement60 = document.getElementById("leopard-title4");
  //   const contentElement60 = document.getElementById("leopard-content4");

  //   titleElement30.contentEditable = false;
  //   contentElement30.contentEditable = false;
  //   titleElement40.contentEditable = false;
  //   contentElement40.contentEditable = false;
  //   titleElement50.contentEditable = false;
  //   contentElement50.contentEditable = false;
  //   titleElement60.contentEditable = false;
  //   contentElement60.contentEditable = false;
  // }

  // function disableEditing_animals(){

  //   const titleElement70 = document.getElementById("animals-title1");
  //   const contentElement70 = document.getElementById("animals-content1");

  //   const titleElement80 = document.getElementById("animals-title2");
  //   const contentElement80 = document.getElementById("animals-content2");

  //   const titleElement90 = document.getElementById("animals-title3");
  //   const contentElement90 = document.getElementById("animals-content3");

  //   const titleElement100 = document.getElementById("animals-title4");
  //   const contentElement100 = document.getElementById("animals-content4");

  //   titleElement70.contentEditable = false;
  //   contentElement70.contentEditable = false;
  //   titleElement80.contentEditable = false;
  //   contentElement80.contentEditable = false;
  //   titleElement90.contentEditable = false;
  //   contentElement90.contentEditable = false;
  //   titleElement100.contentEditable = false;
  //   contentElement100.contentEditable = false;

  // }
  // Function to save content to localStorage
  function saveContent() {
    const title = document.getElementById("title1").textContent;
    const content = document.getElementById("para1").textContent;

    const title02 = document.getElementById("title2").textContent;
    const content02 = document.getElementById("para2").textContent;

    const title03 = document.getElementById("title3").textContent;
    const content03 = document.getElementById("para3").textContent;

    const title04 = document.getElementById("title4").textContent;
    const content04 = document.getElementById("para4").textContent;


  
    localStorage.setItem("content", JSON.stringify({ title, content }));
    localStorage.setItem("content", JSON.stringify({ title02, content02 }));
    localStorage.setItem("content", JSON.stringify({ title01, content01 }));
  }
  
  // Event listeners
  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("saveBtn").addEventListener("click", saveContent); // Save button
  document.getElementById("title").addEventListener("input", saveContent);
  document.getElementById("content").addEventListener("input", saveContent);
  
  // Load initial content
  function loadContent() {
    const content = JSON.parse(localStorage.getItem("sections"));
  
    if (content) {
      document.getElementById("title1").textContent = index.title1;
      document.getElementById("para1").textContent = content.para1;
      document.getElementById("sl_wildlife_section_02_header_01").textContent = index.title;
      document.getElementById("sl_wildlife_section_02_para_01").textContent = content.content;
    }
  }
  
  loadContent(); // Load content when the page loads

// newsletter js
function subscriptions () {
  // Get the email input elements
  let form = document.getElementById('subscribeForm');
  let emailInput = document.getElementById("email_");
  let fullNameInput = document.querySelector('input[name="fullname"]');

  let fullName = fullNameInput.value.trim();
  let email = emailInput.value.trim();

  // Validate email format
  if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return; // Exit function if email format is invalid
  }

  // Store subscription data in localStorage
  let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
  subscriptions.push({ fullName: fullName, email: email });
  localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));

  // Handle form submission here, like sending data to server
  alert("Subscription successful!");
  subsPopup.style.display = "none"; // Close the popup after submission
  form.reset();
}

// Function to validate email format
function isEmailValid(email) {
  // Regular expression for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// all about the view subscription list table/dashboard

// Function to update the subscription table with the data from localStorage
function updateSubscriptionTable() {
  let subscriptionsData = JSON.parse(localStorage.getItem('newsletterSubscriptions'));
  let subscriptionTableBody = document.querySelector('#subscriptionTable tbody');

  // Clear existing table rows
  subscriptionTableBody.innerHTML = '';

  // Populate table with subscription data
  if (subscriptionsData) {
      subscriptionsData.forEach(function(subscription) {
          let row = document.createElement('tr');
          row.innerHTML = '<td>' + subscription.fullName + '</td><td>' + subscription.email + '</td>';
          subscriptionTableBody.appendChild(row);
      });
  }
}