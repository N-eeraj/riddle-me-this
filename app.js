const app = Vue.createApp({
	data() {
		return {
			splashScreen: true,
			loaded: false,
			categories: null,
			levels: null,
			audios: null,
			currentAudio: null,
			darkmode: false
		}
	},
	mounted() {
		fetch("data.json")
		.then(response => response.json())
		.then(data => {
			this.categories = data.categories
			this.levels = data.levels
			this.audios = data.sound
			this.currentAudio = new Audio(this.audios.bgm)
			setTimeout(() => this.loaded = true, 3000)
		})
	},
	methods: {
		closeSplashScreen() {
			if (this.loaded) {
				this.splashScreen = false
				this.currentAudio.play()
			}
		},
		toggleMode() {
			this.darkmode = !this.darkmode
			if (this.darkmode)
				document.body.classList.add("dark-mode")
			else
				document.body.classList.remove("dark-mode")
		}
	},
	template: `
		<splash-screen v-if="splashScreen" :loading="loaded" @click="closeSplashScreen" />
		<main-menu />
	`
})



app.component("splash-screen", {
	props: ["loading"],
	template: `
		<div class="splash-screen">
			<h1>Riddle Me This</h1>
			<img src="src/images/favicon.jpg" alt="Riddler Hat">
			<span :class="loading?'visible':''">Tap on Screen</span>
		</div>
	`
})


app.component("main-menu", {
	template: `
		<nav>
			<ul>
				<li>Home</li>
				<li>High Scores</li>
				<li>Settings</li>
			</ul>
		</nav>
	`
})


app.mount("#app")