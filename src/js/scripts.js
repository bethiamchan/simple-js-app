let pokemonRepository = (function () {
	let pokemonList = [];
	let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	//If a new pokemon is added, it must be an object with name/height/type to be accepeted and added to the list.
	function add(pokemon) {
		if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log('Pokemon does not have correct details.');
		}
	}
	function getAll() {
		pokemonList = pokemonList.sort((a, b) => (a.name < b.name ? -1 : 1));
		return pokemonList;
	}
	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}
	//Add buttons as list items and append to ul. Event listener to call showDetails function to log pokemon on button click.
	function addListItem(pokemon) {
		pokemonRepository.loadList(pokemon).then(function () {
			let $list = $('.list-group');
			let $button = $('<button type="button" class="btn btn-primary pokemon-button" data-toggle="modal" data-target="#pokemonModal">' + pokemon.name + '</button>');

			$list.append($button);

			$button.on('click', function (event) {
				showDetails(pokemon);
			});
		});
	}

	//Loads pokemon data from API
	function loadList() {
		return fetch(apiURL)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}
	//loads additional pokemon details from individual pokemon URL from API
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.height = details.height;
				item.weight = details.weight;
				item.imageUrl = details.sprites.other.dream_world.front_default;
				item.types = [];
				for (let i = 0; i < details.types.length; i++) {
					item.types.push(details.types[i].type.name);
				}
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showModal(item) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		let modalDetails = $('.modal-details');
		let modalImage = $('.modal-image');

		modalTitle.empty();
		modalBody.empty();
		modalImage.empty();
		modalDetails.empty();

		let nameElement = $('<h2>' + item.name + '</h2>');

		let heightElement = $('<p> Height: ' + item.height / 10 + ' m</p>');

		let weightElement = $('<p> Weight: ' + item.weight / 10 + ' kg</p>');

		let typesElement = null;

		if (item.types.length === 1) {
			typesElement = $('<p> Type: ' + item.types + '</p>');
		} else {
			typesElement = $('<p> Types: ' + item.types.join(', ') + '</p>');
		}

		let imageElement = $('<img class="modal-img" style="width:75%">');
		imageElement.attr('src', item.imageUrl);

		modalTitle.append(nameElement);
		modalDetails.append(heightElement);
		modalDetails.append(weightElement);
		modalDetails.append(typesElement);
		modalImage.append(imageElement);
		modalBody.append(modalDetails);
		modalBody.append(modalImage);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
	};
})();

//Iterates over all pokemon and applies above addListItem function
pokemonRepository.loadList().then(function () {
	let newList = pokemonRepository.getAll();
	newList.forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
	console.log(newList);
});


