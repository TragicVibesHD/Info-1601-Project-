const appID = 'a3cb4e71'; // Replace with your Edamam API app ID
const appKey = '1c882f0a617c6026dd3adda02ceeff50'; // Replace with your Edamam API app key
const defaultSearch = 'popular'; // Default search term for popular recipes

async function fetchRecipes(s) {
  const searchTerm = s; // Replace with your search term
  const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${appID}&app_key=${appKey}&from=0&to=5&s`);
  const data = await response.json();
  const recipes = data.hits;

  const main = document.getElementById('main');
  main.innerHTML = ''; // Clear the previous search results
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.recipe.image;
    recipeImage.alt = recipe.recipe.label;

    const recipeName = document.createElement('h3');
    recipeName.classList.add('recipe-name');
    recipeName.textContent = recipe.recipe.label;

    const recipeButton = document.createElement('a');
    recipeButton.classList.add('recipe-button');
    recipeButton.href = 'recipe.html'; // Open the recipe details in a new page
    recipeButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the link from navigating to recipe.html immediately
      let recipeData = recipe.recipe.label; // encode the recipe data as a base64 string
      console.log(recipeData);
      window.location.replace(`recipe.html?data=${recipeData}`); // redirect the user to the recipe.html page
    });
    recipeButton.textContent = 'View Recipe';

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(recipeButton);

    main.appendChild(recipeCard);
  });
}



const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

// Show popular recipes when the page first loads
window.onload = function() {
  fetchRecipes(defaultSearch);
}

searchButton.addEventListener('click', searchRecipes);

async function searchRecipes() {
  const query = searchInput.value;
  fetchRecipes(query);
}
