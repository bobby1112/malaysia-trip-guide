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

function initializeFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const item = btn.closest('.listing-item');
    if (!item) return;

    const itemData = {
      id: item.dataset.id,
      title: item.dataset.title,
      image: item.dataset.image,
      description: item.dataset.description
    };

    // Only proceed if item has valid data
    if (!itemData.id) return;

    // Set button state
    if (favorites.some(fav => fav.id === itemData.id)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }

    // Bind click event
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();



      const exists = favorites.find(fav => fav.id === itemData.id);
      if (exists) {
        favorites = favorites.filter(fav => fav.id !== itemData.id);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>';
      } else {
        favorites.push(itemData);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    };
  });
}
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.favorite-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const item = this.closest('.listing-item');

      const image = item.querySelector('img').getAttribute('src');
      const title = item.querySelector('h2 a')?.textContent || "No Title";
      const description = item.querySelector('.content p')?.textContent || "No description";

      const newFavorite = { image, title, description };

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      // Check for duplicates
      const exists = favorites.some(fav => fav.image === newFavorite.image);
      if (!exists) {
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
      } else {
        alert('Successfully removed!');
      }

      // Toggle heart icon to filled
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      icon.classList.toggle('fas');
      icon.classList.toggle('far');
    });
  });
});
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
