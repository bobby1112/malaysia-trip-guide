$(document).ready(function () {
	// Get the button
	var mybutton = $("#btn-back-to-top");
  
	// When the user scrolls down 20px from the top of the document, show the button
	$(window).on("scroll", function () {
	  if ($(this).scrollTop() > 20) {
		mybutton.fadeIn();
	  } else {
		mybutton.fadeOut();
	  }
	});
  
	// When the user clicks on the button, scroll to the top of the document
	mybutton.on("click", function () {
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	});
  });

  

// // Get the state from the current page
// const currentState = window.location.pathname.includes("ipoh") ? "ipoh" : 
//                      window.location.pathname.includes("penang") ? "penang" : 
//                      window.location.pathname.includes("Sabah") ? "Sabah" : null;

// // Get the form elements
// const commentForm = document.getElementById('comment-form');
// const usernameInput = document.getElementById('username');
// const commentInput = document.getElementById('comment');
// const commentList = document.getElementById('comment-list');

// // Load saved comments from localStorage based on the current state
// let comments = JSON.parse(localStorage.getItem(`${currentState}_comments`)) || [];

// // Function to save comments for the specific state
// function saveComments() {
//   localStorage.setItem(`${currentState}_comments`, JSON.stringify(comments));
// }

// // Function to render the comments
// function renderComments() {
//   commentList.innerHTML = '';  // Clear previous comments
//   comments.forEach((c, index) => {
//     const li = document.createElement('li');
//     li.className = 'list-group-item d-flex justify-content-between align-items-center flex-wrap';
    
//     li.innerHTML = `
//       <div style="flex: 1;">
//         <strong>${c.name}</strong>: <span class="comment-text">${c.text}</span>
//       </div>
//       <div>
//         <button class="btn btn-sm btn-warning mr-2 edit-btn" data-index="${index}">Edit</button>
//         <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
//       </div>
//     `;
//     commentList.appendChild(li);
//   });
// }

// // Initial render of comments
// renderComments();

// // Add new comment
// commentForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   const name = usernameInput.value.trim();
//   const text = commentInput.value.trim();

//   if (!name || !text) return;

//   comments.push({ name, text });
//   saveComments();
//   renderComments();

//   // Clear form
//   usernameInput.value = '';
//   commentInput.value = '';
// });

// // Handle edit & delete actions
// commentList.addEventListener('click', function(e) {
//   if (e.target.classList.contains('delete-btn')) {
//     const i = e.target.dataset.index;
//     comments.splice(i, 1);  // Remove the comment
//     saveComments();
//     renderComments();
//   } else if (e.target.classList.contains('edit-btn')) {
//     const i = e.target.dataset.index;
//     const newText = prompt('Edit comment:', comments[i].text);
//     if (newText !== null) {
//       comments[i].text = newText;  // Update the comment text
//       saveComments();
//       renderComments();
//     }
//   }
// });

// Check if Web Storage is supported
if (typeof(Storage) !== "undefined") {
  
  // Get the state from the current page URL
  const currentState = window.location.pathname.includes("ipoh") ? "ipoh" : 
                       window.location.pathname.includes("penang") ? "penang" : 
                       window.location.pathname.includes("Sabah") ? "Sabah" : null;

  // Get the form elements
  const commentForm = document.getElementById('comment-form');
  const usernameInput = document.getElementById('username');
  const commentInput = document.getElementById('comment');
  const commentList = document.getElementById('comment-list');

  // Load saved comments for this specific state (ipoh/penang/Sabah)
  let comments = JSON.parse(localStorage.getItem(`${currentState}_comments`)) || [];

  // Save comments to localStorage
  function saveComments() {
    localStorage.setItem(`${currentState}_comments`, JSON.stringify(comments));
  }

  // Render comments on the page
  function renderComments() {
    commentList.innerHTML = ''; // Clear before rendering
    comments.forEach((c, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center flex-wrap';
      li.innerHTML = `
        <div style="flex: 1;">
          <strong>${c.name}</strong>: <span class="comment-text">${c.text}</span>
        </div>
        <div>
          <button class="btn btn-sm btn-warning mr-2 edit-btn" data-index="${index}">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      commentList.appendChild(li);
    });
  }

  // Initial render
  renderComments();

  // Add new comment
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = usernameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) return;

    comments.push({ name, text });
    saveComments();
    renderComments();

    // Clear input fields
    usernameInput.value = '';
    commentInput.value = '';
  });

  // Edit or delete comment
  commentList.addEventListener('click', function(e) {
    const i = e.target.dataset.index;
    if (e.target.classList.contains('delete-btn')) {
      comments.splice(i, 1); // Delete
      saveComments();
      renderComments();
    } else if (e.target.classList.contains('edit-btn')) {
      const newText = prompt('Edit comment:', comments[i].text);
      if (newText !== null) {
        comments[i].text = newText; // Edit
        saveComments();
        renderComments();
      }
    }

  });

} else {
  // Web Storage not supported
  alert("Sorry! Your browser does not support Web Storage. Comments will not be saved.");
}

