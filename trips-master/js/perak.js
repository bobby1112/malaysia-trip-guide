let images = [
    {
        img: 'images/perak/ipoh.jpg', 
        title: 'Discover the Beauty of IPOH', 
        description: 'From limestone caves and colonial streets to mouthwatering street food, Ipoh is where adventure and tradition meet. Plan your perfect getaway today!', 
        name: 'IPOH',
        link: 'https://www.tourismperakmalaysia.com/ipoh-old-town/' 
    },
    { 
        img: 'images/perak/kampar.jpg', 
        title: 'Discover the Beauty of KAMPAR', 
        description: 'Kampar is a town known for its beautiful parks and historical significance. Explore its rivers, landscapes, and delicious local food.', 
        name: 'KAMPAR',
        link: 'https://www.tourismperakmalaysia.com/our-destinations/districts/kampar/' 
    },
    { 
        img: 'images/perak/kualakangsar.jpg', 
        title: 'Discover the Beauty of KUALA KANGSAR', 
        description: 'Kuala Kangsar, the royal town of Perak, offers visitors a glimpse into Malaysia\'s royal history, with grand palaces and beautiful riverside views.', 
        name: 'KUALA KANGSAR',
        link: 'https://www.tourismperakmalaysia.com/kuala-kangsar/'
     },
    { 
        img: 'images/perak/pulaupangkor.jpg', 
        title: 'Discover the Beauty of PULAU PANGKOR', 
        description: 'Pulau Pangkor is a serene island with pristine beaches, crystal-clear waters, and rich marine life perfect for a peaceful getaway.', 
        name: 'PULAU PANGKOR',
        link: 'https://www.tourismperakmalaysia.com/pangkor-island/' 
    }
  ];

  let currentIndex = 0;

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const carouselImage = document.getElementById('carousel-image');
  const placeTitle = document.getElementById('place-title');
  const placeDescription = document.getElementById('place-description');
  const placeName = document.getElementById('place-name');
  const visitBtn = document.getElementById('visit-btn');
  const dots = document.querySelectorAll('.dot');

  const changePlace = (index) => {
    carouselImage.style.backgroundImage = `url(${images[index].img})`;
    placeTitle.innerText = images[index].title;
    placeDescription.innerText = images[index].description;
    placeName.innerText = images[index].title.split(' ')[3].toUpperCase();
    visitBtn.href = images[index].link;
    setActiveDot(index); // Update the active dot
  };

  const setActiveDot = (index) => {
    dots.forEach((dot, i) => {
      dot.classList.remove('active');
      if (i === index) {
        dot.classList.add('active');
      }
    });
  };

  // Function to automatically slide the carousel
  const autoSlide = () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    changePlace(currentIndex);
    setActiveDot(currentIndex); // Sync the active dot with the carousel slide
  };

  // Initialize with the first image and dot active
  changePlace(currentIndex);
  setActiveDot(currentIndex);

  // Auto-slide every 3 seconds
  setInterval(autoSlide, 3000);

  // Add event listeners for left and right buttons
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    changePlace(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    changePlace(currentIndex);
  });

  // Event listener for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      changePlace(currentIndex);
    });
  });

 // Get the comment form, inputs, and comment list
const commentForm = document.getElementById('comment-form');
const usernameInput = document.getElementById('username');
const commentInput = document.getElementById('comment');
const commentList = document.getElementById('comment-list');

// Load comments from localStorage for the current page
const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // e.g., "ipoh", "penang", "sabah"
let comments = JSON.parse(localStorage.getItem(currentPage + '_comments')) || [];

// Function to save comments based on the current page
function saveComments() {
  localStorage.setItem(currentPage + '_comments', JSON.stringify(comments));
}

// Function to render comments for the current page
function renderComments() {
  commentList.innerHTML = '';
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

// Initial render for the current page
renderComments();

// Add new comment
commentForm.addEventListener('submit', function (e) {
  e.preventDefault();  // Prevent the page from reloading on form submit
  const name = usernameInput.value.trim();
  const text = commentInput.value.trim();

  if (!name || !text) return;

  // Add new comment to the correct page's comments array
  comments.push({ name, text });
  saveComments();
  renderComments();

  // Clear the form
  usernameInput.value = '';
  commentInput.value = '';
});

// Handle edit & delete for the current page
commentList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const i = e.target.dataset.index;
    comments.splice(i, 1);
    saveComments();
    renderComments();
  } else if (e.target.classList.contains('edit-btn')) {
    const i = e.target.dataset.index;
    const newText = prompt('Edit comment:', comments[i].text);

    if (newText !== null) {
      comments[i].text = newText;
      saveComments();
      renderComments();
    }
  }
});
