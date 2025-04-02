function filterImages(category) {
    // Get all images
    const items = document.querySelectorAll('.listing-item');

    // Show all items if "all" is selected
    if (category === 'all') {
        items.forEach(item => {
            item.classList.add('show');
        });
    } else {
        // Otherwise, filter items by category
        items.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    }

    // Update active tab
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

// Initialize by showing all images
filterImages('all');
