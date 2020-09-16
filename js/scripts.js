let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: "Squirtle",
            height: 0.5,
            type: "water"
        },
        {
            name: "Charmander",
            height: 0.6,
            type: "fire"
        },
        {
            name: "Igglybuff",
            height: 0.3,
            type: ["fairy", "normal"]
        }
    ];
    //If a new pokemon is added, it must be an object with name/height/type to be accepeted and added to the list.
    function add(pokemon) {
        if (
            typeof(pokemon) === 'object' &&
            "name" in pokemon &&
            "height" in pokemon &&
            "type" in pokemon
            ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Please enter valid Pokemon details as an object with name, height, and type.');
        }
    }
    function getAll() {
        return pokemonList;
    }
    function showDetails(pokemon) {
        console.log(pokemon);
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
    return {
        add: add,
        getAll: getAll,
        addListItem : addListItem
    };
})();
//Iterates over all pokemon and applies above addListItem function
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});