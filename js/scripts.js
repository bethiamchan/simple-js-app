let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
            console.log(pokemon);
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
            item.imageUrl = details.sprites.front_default;
            item.types = details.types;
            item.height = details.height;
            item.weight = details.weight;
        }).catch(function (e) {
            console.error(e);
        });
    }

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