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

			],
			"placesHard" : [

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