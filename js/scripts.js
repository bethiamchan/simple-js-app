let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    //If a new pokemon is added, it must be an object with name/height/type to be accepeted and added to the list.
    function add(pokemon) {
        if (
            typeof(pokemon) === 'object' &&
            "name" in pokemon
            ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon does not have correct details.');
        }
    }
    function getAll() {
        return pokemonList;
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }
    //Add buttons as list items and append to ul. Event listener to call showDetails function to log pokemon on button click.
    function addListItem(pokemon) {
        let pokemonButtonList = document.querySelector('.pokemon-list');
        let pokemonListItem = document.createElement('li');
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button');
        pokemonListItem.appendChild(pokemonButton);
        pokemonButtonList.appendChild(pokemonListItem);
        pokemonButton.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }
    //Loads pokemon data from API
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    //loads additional pokemon details from individual pokemon URL from API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // item.imageUrl = details.sprites.other.dream_world.front_default;
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.types = details.types.map(function (object) {
                return object.type.name;
            });
            item.height = details.height;
            item.weight = details.weight;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(item) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let modalGrid = document.createElement('div');
        modalGrid.classList.add('grid');


        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let nameElement = document.createElement('h2');
        nameElement.classList.add('modal-title');
        nameElement.innerText = item.name;

        let heightElement = document.createElement('p');
        heightElement.classList.add('grid','grid-item','modal-content');
        heightElement.innerText = 'Height: ' + (item.height / 10) + ' m';

        let weightElement = document.createElement('p');
        weightElement.classList.add('grid','grid-item','modal-content');
        weightElement.innerText = 'Weight: ' + (item.weight / 10) + ' kg';

        let typesElement = document.createElement('p');
        typesElement.classList.add('grid','grid-item','modal-content');
        if (item.types.length === 1) {
            typesElement.innerText = 'Type: ' + item.types;
        } else {
            typesElement.innerText = 'Types: ' + item.types.join(', ');
        }

        let imageElement = document.createElement('img');
        imageElement.classList.add('grid','grid-item','modal-image');
        imageElement.setAttribute('src', item.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modalGrid.appendChild(heightElement);
        modalGrid.appendChild(weightElement);
        modalGrid.appendChild(typesElement);
        modalGrid.appendChild(imageElement);
        modal.appendChild(modalGrid);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
      }

      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          hideModal();
        }
      });

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target ===modalContainer) {
          hideModal();
        }
      });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

//Iterates over all pokemon and applies above addListItem function
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});