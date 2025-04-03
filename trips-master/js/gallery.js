function filterImages(category) {
    // Get all images
    const items = document.querySelectorAll('.listing-item');

    // Filter items based on the selected category
    items.forEach(item => {
        if (item.getAttribute('data-category') === category) {
            item.classList.add('show'); 
        } else {
            item.classList.remove('show');
        }
    });

    // Update active tab
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    filterImages('top-places'); // Show ALL items first to calculate layout
});