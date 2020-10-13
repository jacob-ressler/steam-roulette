let archiveLoaded = false;
let suggestionsLoaded = false;

function loadArchive(partialpath = '') {
	//console.log(archiveLoaded);
	if (archiveLoaded) return;

	const guideHtml = `<p>
		<b>Hover</b> over a tile to see the game's <span>title</span>, <span>description</span>,
		<span>stream date</span>, and <span>platform availability</span>. <br /><b>Click</b> a tile
		to watch the <span>YouTube VOD</span> of the game. <br />
		<b>Click</b> a tile's <i class="fab fa-steam"></i> or <i class="fab fa-itch-io"></i> icon to
		view the game on <span>Steam</span> or <span>itch.io</span> repsectively.
	</p>`;

	// The archive is not loaded, so load it 4Head
	$.getJSON(partialpath + 'js/game-archive.json?' + new Date().getTime(), function (data) {
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
			${game.ytlink == '' ? `` : `<a href="${game.ytlink}">`}
				<img src="${game.thumbnail}" alt="${game.title}" />
				<div class="game-overlay">
					<h3 class="game-title">${game.title}</h3>
					
					<p class="game-desc">
						${game.desc}
					</p>
					<p class="stream-date">${game.stream}</p>
					<div class="platforms">${platformsHtml}</div>
				</div>
				${game.ytlink == '' ? `` : `</a>`}
		</div>`;
		}

		$('.guide').html(guideHtml);

		$('.games-container').html(archiveHtml);

		archiveLoaded = true;
		suggestionsLoaded = false;
	});
}

function loadSuggestions(file = 'js/game-suggestions.json') {
	if (suggestionsLoaded) return;

	const guideHtml = `<p>
		<b>Hover</b> over a tile to see the game's <span>title</span>, <span>description</span>
		, <span>platform availability</span>, and <span>roulette number</span>. <br />
		<b>Click</b> a tile's <i class="fab fa-steam"></i> or <i class="fab fa-itch-io"></i> icon to
		view the game on <span>Steam</span> or <span>itch.io</span> repsectively.
	</p>`;

	// The suggestions are not loaded, so load them 4Head
	$.getJSON(file + '?' + new Date().getTime(), function (data) {
		let suggestionsHtml = '';

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

			suggestionsHtml += `<div class="game">
				<img src="${game.thumbnail}" alt="${game.title}" />
				<div class="game-overlay">
					<h3 class="game-title">${game.title}</h3>
					
					<p class="game-desc">
						${game.desc}
					</p>
					<p class="stream-date">${i == 0 ? '00' : i - 1}</p>
					<div class="platforms">${platformsHtml}</div>
				</div>
		</div>`;
		}

		$('.guide').html(guideHtml);

		$('.games-container').html(suggestionsHtml);

		suggestionsLoaded = true;
		archiveLoaded = false;
	});
}

/*
		Generates a link to a roulette wheel for up to 100 games from the suggestions
*/
function generateWheel(file = 'js/game-suggestions.json') {
	let str =
		'https://wheeldecide.com/index.php?cols=1c1c1c,ececec,c02e2e&t=Steam+Roulette&time=5&tcol=ececec,1c1c1c,ececec&width=750';
	let roulettevals = [];
	$.getJSON(file + '?' + new Date().getTime(), function (data) {
		for (let i = 0; i < data.length && i < 100; i++) {
			roulettevals[i] = i == 0 ? '00' : `${i - 1}`;
			//console.log(roulettevals);
		}
		for (let i = 0; i < data.length; i++) {
			let s = '&c' + (i + 1) + '=';
			let n = Math.floor(Math.random() * (roulettevals.length - 1));
			//console.log(n);
			s += roulettevals.splice(n, 1);
			str += s;
		}

		let htmlString = `<a target="_blank" href="${str}">
			<i class="fas fa-external-link-alt"></i>Go to Roulette Wheel<i class="fas fa-external-link-alt show"></i>
		</a><p>Hullo chat, you can guess anywhere from 00 to ${data.length - 2}</p>`;
		//console.log(str);
		$('.roulette-wheel').html(htmlString);
	});
}
