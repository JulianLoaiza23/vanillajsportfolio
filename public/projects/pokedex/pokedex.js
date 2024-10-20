(function () {
  const pokemonSearchContainer = document.querySelector('#pokemonSearch');
  const searchButton = document.querySelector('#searchButton');
  
  searchButton.addEventListener('click', searchPokemon);

  searchButton.disabled = true;

  pokemonSearchContainer.addEventListener('keyup', (keypressEvt) => {
    if (keypressEvt.code === 'Enter') {
      searchPokemon();
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

  function searchPokemon() {
    const spriteResult = document.querySelector('#pokeSprite');
    const statResults = document.querySelectorAll('#pokemonStatsCtn > div');
    const errorMsgCtn = document.querySelector('#errorCtn');

    const pokemonName = pokemonSearchContainer.value;

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName) // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the API returns JSON data
      })
      .then((data) => {
        setPokemon(
          data,
          spriteResult,
          errorMsgCtn,
          statResults
        );
      })
      .catch((error) => {
        errorMsgCtn.classList.remove('hide');
        errorMsgCtn.textContent = 'Sorry This Pokemon has yet to be Discovered.';
        spriteResult.src = '';

        for (let ctn of statResults) {
          ctn.textContent = '';
        }

        console.error(error);
      });
  }

  function setPokemon(
    data,
    spriteResult,
    errorMsgCtn,
    statResults
  ) {
    const pokemon = {
      image: data.sprites.front_default,
      name: data.name,
      id: data.id,
      abilities: [],
      types: [],
    };

    for (let ability of data.abilities) {
      pokemon.abilities.push(ability.ability.name);
    }

    for (let type of data.types) {
      pokemon.types.push(type.type.name);
    }

    for (let i = 0; i < statResults.length; i++) {
      switch (i) {
        case 0:
          statResults[i].textContent = 'Name: ' + pokemon.name;
          break;
        case 1:
          statResults[i].textContent = 'ID: ' + pokemon.id;
          break;
        case 2:
          statResults[i].textContent = 'Abilities: ' + pokemon.abilities.join(', ');
          break;
        case 3:
          statResults[i].textContent = 'Type: ' + pokemon.types.join(', ');
          break;
      }
    }

    spriteResult.src = pokemon.image; //dot notation
    
    errorMsgCtn.classList.add('hide');
    errorMsgCtn.textContent = '';
  }
})();
