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

for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 0.5){
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!</p>');
    } else {
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') </p>');
    }
}