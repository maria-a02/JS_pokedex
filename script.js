$(document).ready(function () {
    fetchData();
    document.getElementById('nextPkm').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('pokemons').innerHTML = '';
        fetchData();
    })
});

let url_next = 'https://pokeapi.co/api/v2/pokemon/';
    
        function fetchData(){
        $.ajax({
                url: url_next,
                dataType: 'json',
                method: 'GET',
                success: function(response){
                    //console.log(response);
                    url_next = response.next;
                    response.results.forEach(function(pokemon){
                            let pkmCard = `
                            <div class="card img-fluid col-4" >
                                <div class="container">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.url.split('/')[6]}.png" class="card-img-top" alt="...">
                                    <div class="card-body text-center">
                                        <h3 class="card-title">${pokemon.name}</h3>
                                        <a href = "#"
                                        id = "${pokemon.name}-${pokemon.url.split('/')[6]}"
                                        class = "btn btn-dark">¡Quiero saber más de este pokémon!</a>
                                    </div>
                                </div>
                            </div> `
                    $('#pokemon').append(pkmCard);
                document.querySelector('#pokemons').insertAdjacentHTML('beforeend', pkmCard);
                document.querySelector(`#${pokemon.name}-${pokemon.url.split('/')[6]}`).addEventListener('click', (e) => {
                    e.preventDefault();
                    $('#diModal').modal('show');
                    document.querySelector('#pokemonName').innerHTML = pokemon.name;
                    document.querySelector('#pokeName').innerHTML = "Nombre: " + pokemon.name;
                    $.ajax({
                        url: pokemon.url,
                        dataType: 'json',
                        method: "GET",
                        success: function (response) {
                            document.querySelector('#abilities').innerHTML = getAbilities(response)
                            document.querySelector('#pokeTypes').innerHTML = getPokeTypes(response)
                            document.querySelector('#firstFiveMoves').innerHTML = getPokeMoves(response)
                        }
                    });
                });
            });
        }
    });
}

function getAbilities(pokemon) {
    let abilities = 'Habilidades: '
    pokemon.abilities.forEach(function (ability) {
        abilities += ` ${ability.ability.name}`
    })
    return abilities;
}


function getPokeTypes(pokemon) {
    let types = 'Tipo: '
    pokemon.types.forEach(function (type) {
        types += ` ${type.type.name}`
    })
    return types;
}

function getPokeMoves(pokemon) {
    let move = 'Movimientos: '
    pokemon.moves.forEach(function (movesito, index) {
        if (index < 5) {
            move += ` ${movesito.move.name}`
        }
    })
    return move;
}