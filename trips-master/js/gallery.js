function filterImages(category, button = null) {
  const items = document.querySelectorAll('.listing-item');

  items.forEach(item => {
    if (item.getAttribute('data-category') === category) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');

  // Reinitialize favorite buttons
  setTimeout(initializeFavorites, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultCategory = 'top-places';

  // Add event listeners to tab buttons
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      filterImages(category, button);
    });
  });

  // Trigger initial tab
  const defaultTab = document.querySelector(`.tab-button[data-category="${defaultCategory}"]`);
  filterImages(defaultCategory, defaultTab);
});


/////////////////////////////////////////////////////Local storage for gallery.html//////////////////////////////////////////////////

//gallery.html
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.favorite-btn'); //Select all heart button

  //Load saved favorites, if no saved favorites, them assign with empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []; 

  //Get image data (URL, titles, description)
  buttons.forEach(button => {
    const item = button.closest('.listing-item');
    const image = item.querySelector('img')?.src; 
    const title = item.querySelector('h2 a')?.textContent; 
    const description = item.querySelector('.content p')?.textContent; 
    const icon = button.querySelector('i');

    // To filled the love icon of an image if it already saved
    const isFavorited = favorites.some(fav => fav.image === image);
    if (isFavorited) {
      button.classList.add('active');
      icon.classList.replace('far', 'fas'); //Change heart from unfill to fill
    }

    // To handle favourite button toggle
    button.addEventListener('click', () => {
      //check if favourite image is already in favorites
      const exists = favorites.some(fav => fav.image === image);

      //if in favourite, remove it
      if (exists) {
        favorites = favorites.filter(fav => fav.image !== image); 
        alert('Successfully removed!');
      }
      //not in favourite, then add it
      else {
        favorites.push({ image, title, description });
        alert('Added to favorites!');
      }

      //update the localStorage again
      localStorage.setItem('favorites', JSON.stringify(favorites));

      button.classList.toggle('active');
      icon.classList.toggle('fas');
      icon.classList.toggle('far');
    });
  });
});

//favourite.html
document.addEventListener('DOMContentLoaded', function () {
  //Load favourite from local Storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

   //Get the container where favorites iteam will be displayed
  const container = document.getElementById('favorites-container');

  //No favorites then output message 
  if (favorites.length === 0) { 
    container.innerHTML = '<p class="text-center">No favorites yet!</p>';
    return;
  }
  //Loop through all favorites and display the item in the page
  favorites.forEach(item => {
    if (!item.image || !item.title || !item.description) return; // skip broken data

    const image = `<img src="${item.image}" alt="" class="img-fluid">`;
    const title = `<h2>${item.title}</h2>`;
    const description = `<p>${item.description}</p>`;

    //create html to display each favorite image
    const card = `
<div class="col-lg-4 col-md-6 mb-4">
<div class="listing-item">
  <div class="listing-image">
    ${image}
  </div>
  <div class="listing-item-content">
    ${title}
    ${description}
  </div>
</div>
</div>`;

    container.insertAdjacentHTML('beforeend', card);
  });

});

//Clear all the favourite item in local storage
function clearFavorites() {
  localStorage.removeItem('favorites');
  location.reload();
}

