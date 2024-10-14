// index.js

// Callbacks
const handleClick = (ramen) => {
  // Handle the click event for each ramen
  const imageDetail = document.getElementById('ramen-detail');
  document.getElementById('comment-display').textContent = ramen.comment
  document.getElementById('rating-display').textContent = ramen.rating
  imageDetail.querySelector('.detail-image').src = ramen.image;
  imageDetail.querySelector('.name').textContent = ramen.name;
  imageDetail.querySelector('.restaurant').textContent = ramen.restaurant;
  
};

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

  
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    
    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment,
    };

  
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then((response) => response.json())
      .then((data) => {
        
        displayRamens();
      })
  });
};

const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');


  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ramen) => {
        const ramenImage = document.createElement('img');
        
        ramenImage.src = ramen.image; 

        
        ramenImage.addEventListener('click', () => handleClick(ramen));

        ramenMenu.appendChild(ramenImage);
      });
    })
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};