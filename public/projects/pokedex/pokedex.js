(function () {
  const pokemonSearchContainer = document.querySelector('#pokemonSearch');
  const searchButton = document.querySelector('#searchButton');

  searchButton.addEventListener('click', myFunction);

  searchButton.disabled = true;

  pokemonSearchContainer.addEventListener('keyup', (keypressEvt) => {
    if (keypressEvt.code === 'Enter') {
      myFunction();
    }

    const userInput = keypressEvt.target;
    const userString = userInput.value;
    const stringLength = userString.length;

    if (stringLength === 0) {
      searchButton.disabled = true;
    } else {
      searchButton.disabled = false;
    }
  });

  //define variables for h1 element here ONE FOR THE INOPUT ONE FOR STRING VALUE OF INPUT ONE FOR THE LENGTH

  function myFunction() {
    const spriteResult = document.querySelector('#pokeSprite');
    const pokemonName = pokemonSearchContainer.value;
    const errorMessage = document.querySelector('#pokeHeader');

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName) // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the API returns JSON data
      })
      .then((data) => {
        spriteResult.src = data.sprites.front_default; //dot notation
        errorMessage.innerText = '';
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch innertext

        //set h1 'innerText' here
        errorMessage.innerText = 'Sorry This Pokemon has yet to be Discovered.';
        spriteResult.src = '';
      });
  }
})();
