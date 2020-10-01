let pokemonRepository = (function () {
	let t = [],
		e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	function o(e) {
		'object' == typeof e && 'name' in e && 'detailsUrl' in e ? t.push(e) : console.log('Pokemon does not have correct details.');
	}
	function n(t) {
		let e = $('.modal-body'),
			o = $('.modal-title'),
			n = $('.modal-details'),
			i = $('.modal-image');
		o.empty(), e.empty(), i.empty(), n.empty();
		let p = $('<h2>' + t.name + '</h2>'),
			a = $('<p> Height: ' + t.height / 10 + ' m</p>'),
			l = $('<p> Weight: ' + t.weight / 10 + ' kg</p>'),
			r = null;
		r = 1 === t.types.length ? $('<p> Type: ' + t.types + '</p>') : $('<p> Types: ' + t.types.join(', ') + '</p>');
		let s = $('<img class="modal-img" style="width:75%">');
		s.attr('src', t.imageUrl), o.append(p), n.append(a), n.append(l), n.append(r), i.append(s), e.append(n), e.append(i);
	}
	return {
		add: o,
		getAll: function () {
			return t;
		},
		addListItem: function (t) {
			pokemonRepository.loadList(t).then(function () {
				let e = $('.list-group'),
					o = $('<button type="button" class="btn btn-primary pokemon-button" data-toggle="modal" data-target="#pokemonModal">' + t.name + '</button>');
				e.append(o),
					o.on('click', function (e) {
						!(function (t) {
							pokemonRepository.loadDetails(t).then(function () {
								n(t);
							});
						})(t);
					});
			});
		},
		loadList: function () {
			return fetch(e)
				.then(function (t) {
					return t.json();
				})
				.then(function (t) {
					t.results.forEach(function (t) {
						o({ name: t.name, detailsUrl: t.url });
					});
				})
				.catch(function (t) {
					console.error(t);
				});
		},
		loadDetails: function (t) {
			let e = t.detailsUrl;
			return fetch(e)
				.then(function (t) {
					return t.json();
				})
				.then(function (e) {
					(t.height = e.height), (t.weight = e.weight), (t.imageUrl = e.sprites.other.dream_world.front_default), (t.types = []);
					for (let o = 0; o < e.types.length; o++) t.types.push(e.types[o].type.name);
				})
				.catch(function (t) {
					console.error(t);
				});
		},
		showModal: n,
	};
})();
pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (t) {
		pokemonRepository.addListItem(t);
	});
});