// Fetch Initial Recipe
function fetchRecipe() {
  fetch('http://www.recipepuppy.com/api')
  .then(handleResponse)
  .then(({results}) => {
    thumbnailCheck(results)
    recipeContent(results)
  })
  .catch(err => {
    errorHandler(err)
  })
}
fetchRecipe()

// Fetch Recipe Search by Keyword
function search() {
  let searchInput = document.getElementById('searchInput').value
  document.getElementById('error').style.display = 'none'
  document.getElementById('loadingImage').style.display = 'block'
  document.getElementById('recipe').innerHTML = ""
  // check whether there's input or not
  if(!searchInput) {
    document.getElementById('loadingImage').style.display = 'block'
    fetchRecipe()
  } else {
    fetch(`http://www.recipepuppy.com/api/?q=${searchInput}`)
    .then(handleResponse)
    .then(({results}) => {
      // check whether the search results exist or not
      if(results.length === 0) {
        errorHandler()
      } else {
        thumbnailCheck(results)
        recipeContent(results)
      }
    })
    .catch(err => {
      errorHandler(err)
    })
  }
}

//  Response Handler
function handleResponse(response) {
  if(!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}

// Error Handler
function errorHandler(err) {
  let error = err || 'Recipe Search Not Found'
  document.getElementById('error').innerHTML = ""
  document.getElementById('error').style.display = 'block'
  document.getElementById('loadingImage').style.display = 'none'
  document.getElementById('title').style.display = 'none'
  let errorMessage = `
    <h1><b>${error}</b></h1>
  `
  document.querySelector('#error').insertAdjacentHTML('afterbegin', errorMessage)
}

// if there's no thumbnail picture, change to the default image
function thumbnailCheck(results) {
  results.forEach(recipe => {
    if(!recipe.thumbnail) {
      recipe.thumbnail = './assets/default-thumbnail.jpg'
    }
  });
}

// Recipe Content
function recipeContent(results) {
  document.getElementById('title').style.display = 'block'
  const content = results.map(recipe => {
    return `
      <div class="media">
        <img src="${recipe.thumbnail}" alt="img">
        <div class="content">
            <h2><b>${recipe.title}</b></h2>
            <p><b>Ingredients: </b>${recipe.ingredients}</p>
            <a href="${recipe.href}">Read More</a>
        </div> 
      </div>
    `
  })
  if(content) {
    document.querySelector('#recipe').insertAdjacentHTML('afterbegin', content)
    document.getElementById('loadingImage').style.display = 'none'
  }
}