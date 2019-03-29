let CardTypes = [
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
		content: "Fall of Adam",
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
		id: "righteousness",
		content: "Righteousness",
	},
	{
		id: "righteousness",
		content: "2 Nep 9:28-29"
	},
	// {
	// 	topic: "Natural Man",
	// 	reference: "Mosiah 3:19"
	// },
	// {
	// 	topic: "Scriptures",
	// 	reference: "2 Nep 32:3"
	// },
];

let shuffleCards = () => {
	// let copy = CardTypes.concat(CardTypes);
	return CardTypes.sort(() => 0.5 - Math.random());
}

let app = new Vue({
	el: '#app',
	data: {
		showLogin: true,
		loggedIn: false,
		loginType: "email",
		loginInput: "",
		username: "",
		email: "",
		emailMessage: "",
		showEmailMessage: false,
		timeElapsed: 0,
		startTime: 0,
		duration: 0,
		turns: 0,
		matchedPairs: 0,
		disableClick: false,
		secondFlip: false,
		cards: [],
		prevCardIndex: 0,
		cardClasses: {},
		playingGame: false
	},
	computed: {
		totalPairs: function () {
			return this.cards.length();
		}
	},
	methods: {
		logInWithEmail: function() {
			this.loginType = "email";
			this.showInput = true;
		},
		logInWithUsername: function() {
			this.emailMessage = "";
			this.loginType = "username";
			this.showInput = true;
		},
		closeLogin: function() {
			this.showLogin = false;
			this.emailMessage = "";
			this.showEmailMessage = false;
		},
		closeLoginBecauseLoggedIn: function() {
			if(this.loggedIn){
				this.showLogin = false;
				this.emailMessage = "";
				this.showEmailMessage = false;
			}
		},
		openLogin: function() {
			this.showLogin = true;
		},
		getLoggedIn: function() {
			this.loggedIn = true;
		},
		handleInput: async function() {
			if(this.loginType === "username") {
				this.username = this.loginInput;
				if (this.username === "morgan_hartman") {
					this.loggedIn = true;
					this.closeLoginBecauseLoggedIn();
				}
			}
			else if (this.loginType === "email") {
				await this.processAPICall();
				this.$nextTick(this.closeLoginBecauseLoggedIn());
			} else {
				console.log('error');
				this.emailMessage = "Please enter a valid email address or username."
				this.loggedIn = false;
				this.showEmailMessage = true;
			}
		},
		logOut: function() {
			this.loggedIn = false;
			this.loginInput = "";
			this.username = "";
		},
		processAPICall: async function() {
			var _this = this;
			this.email = this.loginInput;
			console.log(`Email Input is ${this.email}.`);
			const accessKey = "81a42f979a60a5020baa7b1ec7c058e5";
			const url = "http://apilayer.net/api/check?access_key=" + accessKey + "&email=" + this.email;
			await fetch(url)
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					console.log(json);
					if (json.score >= 0.8 || json.format_valid === true) {
						console.log("success");
						_this.emailMessage = "Valid";
						_this.username = _this.email;
						_this.loggedIn = true;
					} else {
						console.log("fail");
						_this.emailMessage = "Please enter a valid email address.";
						_this.loggedIn = false;
					}
				});
			this.showEmailMessage = true;
		},
		resetGame() {
			this.cards = shuffleCards();
			this.cards.forEach((card) => {
				this.$set(card, 'flipped', false);
				this.$set(card, 'found', false);
			});
			this.startTime = 0;
			this.turns = 0;
			this.matchedPairs = 0;
			this.secondFlip = false;
			this.prevCardIndex = 0;
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
			if (card === this.cards[this.prevCardIndex]) {
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

			alert(`You Won! You completed the game in: ${ Math.round((end - this.startTime) / 1000) } seconds`);
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
			if (!this.playingGame) {
				return;
			}
			t = setTimeout(this.incrementTime, milliseconds);
		},
		async uploadPlayer() {
			try {
				const formData = new FormData();
				formData.append('photo', this.file, this.file.name)
				let res = await axios.post('/api/players', {
					name: req.body.name,
					turns: req.body.turns,
					duration: req.body.duration,
					date: req.body.date,
				});
				this.addItem = res.data;
			} catch (error) {
				console.log(error);
			}
		},
		async getplayers() {
			try {
				let res = await axios.get("/api/players");
				this.players = res.data;
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		selectItem(item) {
			console.log(item._id)
			this.findTitle = "";
			this.findItem = item;
		},
		async deleteItem(item) {
			try {
				console.log(item._id)
				let response = await axios.delete("/api/players/" + item._id);
				this.findItem = null;
				this.getplayers();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editItem(item) {
			try {
				let response = await axios.put("/api/players/" + item._id, {
					title: this.findItem.title,
				});
				this.findItem = null;
				this.getplayers();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.resetGame();
		this.showLogin = true;
	},
})