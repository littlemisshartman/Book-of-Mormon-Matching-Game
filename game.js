let app = new Vue({
	el: '#app',
	data: {
		timeElapsed: 0,
		startTime: 0,
		duration: 0,
		turns: 0,
		matchedPairs: 0,
		disableClick: false,
		secondFlip: false,
		cards: [],
		prevCardIndex: null,
		cardClasses: {},
		playingGame: false,
		gameDifficulty: "Easy",
		gameType: "scriptureMastery",
		cardTypes: {
			"scriptureMasteryEasy" : [
				{
					id: "obedience",
					content: "I will go and do",
				},
				{
					id: "obedience",
					content: "1 Nep 3:7"
				},
				{
					id: "theFall",
					content: "The Fall brings joy",
				},
				{
					id: "theFall",
					content: "2 Nep 2:25"
				},
				{
					id: "agency",
					content: "We are free to choose",
				},
				{
					id: "agency",
					content: "2 Nep 2:27"
				},
				{
					id: "righteousness",
					content: "Being learned is good if you follow God",
				},
				{
					id: "righteousness",
					content: "2 Nep 9:28-29"
				}
			],
			"scriptureMasteryHard" : [
				{
					id: "obedience",
					content: "Obedience",
				},
				{
					id: "obedience",
					content: "1 Nep 3:7"
				},
				{
					id: "theFall",
					content: "The Fall",
				},
				{
					id: "theFall",
					content: "2 Nep 2:25"
				},
				{
					id: "agency",
					content: "Agency",
				},
				{
					id: "agency",
					content: "2 Nep 2:27"
				},
				{
					id: "learned",
					content: "Righteousness",
				},
				{
					id: "learned",
					content: "2 Nep 9:28-29"
				},
				{
					id: "christ",
					content: "Christ brings the remission of sins",
				},
				{
					id: "christ",
					content: "2 Nep 25:23, 26"
				},
				{
					id: "truth",
					content: "Ask to know the truth",
				},
				{
					id: "truth",
					content: "Mor 10: 4, 5"
				},
				{
					id: "faith",
					content: "Faith is things hoped for",
				},
				{
					id: "faith",
					content: "Ether 12:6"
				},
				{
					id: "humility",
					content: "Weak things become strong",
				},
				{
					id: "humility",
					content: "Ether 12:27"
				}
			],
			"placesEasy" : [
				{
					id: "nephi",
					content: "The City of Nephi",
				},
				{
					id: "nephi",
					content: "Named after the author of the first book in the Book of Mormon"
				},
				{
					id: "zarahemla",
					content: "The people gathered here to hear King Benjamin speak",
				},
				{
					id: "zarahemla",
					content: "Zarahemla"
				},
				{
					id: "mormon",
					content: "The Waters of Mormon",
				},
				{
					id: "mormon",
					content: "Alma baptized people here"
				},
				{
					id: "bountiful",
					content: "Bountiful",
				},
				{
					id: "bountiful",
					content: "Where Lehi and his family camped before going to the Promised Land"
				}
			],
			"placesHard" : [
				{
					id: "bountiful",
					content: "Bountiful",
				},
				{
					id: "bountiful",
					content: "Southward of Desolation and northward of Zarahemla"
				},
				{
					id: "mormon",
					content: "The Waters of Mormon",
				},
				{
					id: "mormon",
					content: "Where Alma taught and baptized people"
				},
				{
					id: "nephi",
					content: "The City of Nephi",
				},
				{
					id: "nephi",
					content: '"And it came to pass that Limhi and his people returned to _____, and began to dwell in the land again in peace."'
				},
				{
					id: "zarahemla",
					content: "Zarahemla",
				},
				{
					id: "zarahemla",
					content: "King Benjamin gave his speech here"
				},
				{
					id: "sidom",
					content: "Sidom",
				},
				{
					id: "sidom",
					content: "Where Alma the Younger established the church"
				},
				{
					id: "ammonihah",
					content: "Ammonihah",
				},
				{
					id: "ammonihah",
					content: "A city of wicked people that wouldn't listen to Alma and Amulek"
				},
				{
					id: "lehi-nephi",
					content: "Ammon finds Limhi's people here",
				},
				{
					id: "lehi-nephi",
					content: "The Land of Lehi-Nephi"
				},
				{
					id: "angola",
					content: "Angola",
				},
				{
					id: "angola",
					content: "Part of the final battle between the nephites and lamanites happened here"
				}
			],
			"peopleEasy" : [
				{
					id: "nephi",
					content: "Nephi",
				},
				{
					id: "nephi",
					content: "Son of Lehi, great prophet, founder of the Nephites"
				},
				{
					id: "abinadi",
					content: "Abinadi",
				},
				{
					id: "abinadi",
					content: "Nephite prophet that preached to King Noah"
				},
				{
					id: "alma",
					content: "Alma the Elder",
				},
				{
					id: "alma",
					content: "Nephite prophet that was previously a priest of King Noah"
				},
				{
					id: "mormon",
					content: "Mormon",
				},
				{
					id: "mormon",
					content: "A Nephite prophet, military general, and record keeper in the Book of Mormon"
				}
			],
			"peopleHard" : [
				{
					id: "nephi",
					content: "Nephi",
				},
				{
					id: "nephi",
					content: "Born of goodly parents"
				},
				{
					id: "abinadi",
					content: "Abinadi",
				},
				{
					id: "abinadi",
					content: "Nephite prophet whose teachings led to the conversion of Alma"
				},
				{
					id: "alma",
					content: "Alma the Elder",
				},
				{
					id: "alma",
					content: "Nephite prophet and founder of the Church in Zarahemla"
				},
				{
					id: "mormon",
					content: "Mormon",
				},
				{
					id: "mormon",
					content: "A Nephite prophet, military general, and record keeper in the Book of Mormon"
				},
				{
					id: "moroni",
					content: "Moroni",
				},
				{
					id: "moroni",
					content: "The last Nephite prophet in the Book of Mormon"
				},
				{
					id: "nehor",
					content: "Nehor",
				},
				{
					id: "nehor",
					content: "Executed for teaching false doctrine and killing Gideon"
				},
				{
					id: "ishmael",
					content: "Ishmael",
				},
				{
					id: "ishmael",
					content: "An Ephraimite from Jerusalem"
				},
				{
					id: "jacob",
					content: "Jacob",
				},
				{
					id: "jacob",
					content: "Elder son of Lehi born in the wilderness"
				}
			]
		}
	},
	computed: {
		totalPairs: function () {
			return this.cards.length();
		},
		cardArray: function() {
			return this.gameType + this.gameDifficulty;
		}
	},
	methods: {
		resetGame() {
			//this.cards = this.shuffleCards();
			this.cards.forEach((card) => {
				this.$set(card, 'flipped', false);
				this.$set(card, 'found', false);
			});
			this.startTime = 0;
			this.turns = 0;
			this.matchedPairs = 0;
			this.secondFlip = false;
			this.prevCardIndex = null;
			this.duration = 0;
			this.playingGame = false;
		},
		flipCard(card) {
			if (this.turns == 0) {
				this.playingGame = true;
				this.startTime = new Date();
				this.timer(1000);
			}
			//is second flip
			console.log(this.cards.indexOf(card), this.prevCardIndex);
			if (this.cards.indexOf(card) === this.prevCardIndex) {
				console.log("Pick a different card.");
				return;
			}
			if (this.disableClick) {
				console.log("click not allowed yet");
				return;
			}
			card.flipped = true;
			if (this.secondFlip) {
				this.disableClick = true;
				setTimeout(() => {
					if (this.checkMatch(this.cards[this.prevCardIndex], card)) {
						this.matchedPairs++;
						this.cards[this.prevCardIndex].found = true;
						card.found = true;
						console.log("cards match!");
					} else {
						card.flipped = false;
						this.cards[this.prevCardIndex].flipped = false;
						console.log("cards don't match");
					}
					this.secondFlip = false;
					this.disableClick = false;
					if (this.matchedPairs == this.cards.length / 2) {
						this.endGame();
					}
				}, 1000);
			} else {
				this.prevCardIndex = this.cards.indexOf(card);
				this.secondFlip = true;
			}

			this.turns++;
		},
		checkMatch(firstCard, secondCard) {
			return ((firstCard.id === secondCard.id) ? true : false);
		},
		fileChanged(event) {
			this.file = event.target.files[0]
		},
		endGame() {
			let end = new Date();

			alert(`You Won! You completed the game in: ${ Math.round((end - this.startTime) / 1000) } seconds and ${this.turns} turns`);
			this.resetGame();;
		},
		incrementTime() {
			if (!this.playingGame) {
				return;
			}
			this.duration++;
			this.timer(1000);
		},
		timer(milliseconds) {
			t = setTimeout(this.incrementTime, milliseconds);
		},
		shuffleCards() {
			this.cards = this.cardTypes[this.cardArray].sort(() => 0.5 - Math.random());
			//return this.cardTypes[this.cardArray].sort(() => 0.5 - Math.random());
		},
		setGameType(gameType) {
			console.log("changing game type to " + gameType);
			this.gameType = gameType;
			this.shuffleCards();
		},
		setGameDifficulty(gameDifficulty) {
			console.log("changing game type to " + gameDifficulty);
			this.gameDifficulty = gameDifficulty;
			this.shuffleCards();
		}
	},
	created() {
		this.shuffleCards();
		this.resetGame();
	},
})