let archiveLoaded = false;
let suggestionsLoaded = false;

function loadArchive() {
	//console.log(archiveLoaded);
	if (archiveLoaded) return;

	// The archive is not loaded, so load it 4Head

	$.getJSON('js/game-archive.json?' + new Date().getTime(), function (data) {
		let archiveHtml = '';
		for (let i = 0; i < data.length; i++) {
			const game = data[i];
			let platformsHtml = '';
			for (let j = 0; j < game.platforms.length; j++) {
				switch (game.platforms[j]) {
					case 'steam':
						platformsHtml += `<object><a href="${game.links[j]}"><i class="fab fa-steam"></i></a></object>`;
						continue;
					case 'itch':
						platformsHtml += `<object><a href="${game.links[j]}"><i class="fab fa-itch-io"></i></a></object>`;
						continue;
				}
			}

			archiveHtml += `<div class="game">
			<a href="${game.ytlink}">
				<img src="${game.thumbnail}" alt="${game.title}" />
				<div class="game-overlay">
					<h3 class="game-title">${game.title}</h3>
					
					<p class="game-desc">
						${game.desc}
					</p>
					<p class="stream-date">${game.stream}</p>
					<div class="platforms">${platformsHtml}</div>
				</div>
			</a>
		</div>`;
		}

		console.log(archiveHtml);
		$('.games-container').html(archiveHtml);

		archiveLoaded = true;
		suggestionsLoaded = false;
	});
}

function loadSuggestions() {
	if (suggestionsLoaded) return;

	// The suggestions are not loaded, so load them 4Head
	$.getJSON('js/game-suggestions.json?' + new Date().getTime(), function (data) {
		// Gotta populate the json file first, lol
	});
}
