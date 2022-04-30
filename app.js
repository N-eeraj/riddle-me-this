const app = Vue.createApp({
	data() {
		return {
			splashScreen: true,
			loaded: false,
			categories: null,
			levels: null,
			audios: null,
			currentAudio: null,
			currentTab: null,
			highScores: null,
			storage: null,
		}
	},
	mounted() {
		fetch("data.json")
		.then(response => response.json())
		.then(data => {
			this.categories = data.categories
			this.levels = data.levels
			this.audios = data.sound
			this.storage = JSON.parse(localStorage.getItem("riddleMeThis"))
			if (this.storage === null)
				this.storage = {
								scores: {},
								darkmode: false,
								sound: false
							}
			this.setScores()
			this.currentAudio = new Audio(this.audios.bgm)
			setTimeout(() => this.loaded = true, 1000)
		})
	},
	methods: {
		closeSplashScreen() {
			if (this.loaded) {
				this.splashScreen = false
				this.currentTab = 0
				this.currentAudio.loop = true
				if (this.storage.darkmode) {
					this.storage.darkmode = false
					this.toggleDarkMode()
				}
				if (this.storage.sound)
					this.currentAudio.play()
			}
		},
		playAudio(audio) {
			this.currentAudio.pause()
			this.currentAudio = new Audio(audio)
			this.currentAudio.play()
		},
		changeTab(tabNum) {
			if (tabNum !== this.currentTab && this.storage.sound) {
				if (tabNum === 1) {
					this.playAudio(this.audios.highscores)
					this.currentAudio.volume = 0.3
				}
				else if (this.currentTab + tabNum !== 2)
					this.playAudio(this.audios.bgm)
			}
			this.currentTab = tabNum
		},
		getCategory() {
			let categoryResult = []
			this.categories.forEach(category => {
				categoryResult.push(category.category)
			})
			return categoryResult
		},
		setScores() {
			this.levels.forEach(level => {
				this.storage.scores[level.level] = {}
				this.categories.forEach(category => this.storage.scores[level.level][category.category] = 0)
			})
		},
		updateSettings(action) {
			switch (action) {
				case "soundToggle":
					this.toggleSound()
					break
				case "darkModeToggle":
					this.toggleDarkMode()
					break
				case "reset":
					this.setScores()
					break
			}
			this.updateLocalStorage()
		},
		toggleSound() {
			if (this.currentAudio.paused) {
				this.storage.sound = true
				return this.currentAudio.play()
			}
			this.storage.sound = false
			return this.currentAudio.pause()
		},
		toggleDarkMode() {
			this.storage.darkmode = !this.storage.darkmode
			if (this.storage.darkmode)
				return document.body.classList.add("dark-mode")
			return document.body.classList.remove("dark-mode")
		},
		updateLocalStorage() {
			localStorage.setItem("riddleMeThis", JSON.stringify(this.storage))
		}
	},
	template: `
		<splash-screen v-if="splashScreen" :loading="loaded" @click="closeSplashScreen" />
		<template v-if="!splashScreen">
			<main-nav @selectTab="num => changeTab(num)" />
			<play v-if="currentTab===0" :categories="categories" :levels="levels" />
			<highscores v-else-if="currentTab===1" :levels="levels" :categories="getCategory()" :scores="storage.scores" />
			<settings v-else @changeSettings="updateSettings" :options="storage" />
		</template>
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


app.component("main-nav", {
	methods: {
		changeTab(tab) {
			return this.$emit("selectTab", tab)
		}
	},
	template: `
		<nav>
			<h1>Riddle Me This</h1>
			<ul>
				<li @click="changeTab(0)">
					<i class="fa-solid fa-home"></i>
					<span>Home</span>
				</li>
				<li @click="changeTab(1)">
					<i class="fa-solid fa-trophy"></i>
					<span>High Scores</span>
				</li>
				<li @click="changeTab(2)">
					<i class="fa-solid fa-gear"></i>
					<span>Settings</span>
				</li>
			</ul>
		</nav>
	`
})


app.component("play", {
	template: `
		<main>
			<h2>Choose Category</h2>
		</main>
	`
})


app.component("highscores", {
	props: ["categories", "levels", "scores"],
	data() {
		return {
			levelSelected : false,
			categoriesScores: null
		}
	},
	methods: {
		selectLevel(level) {
			this.categoriesScores = this.scores[level]
			this.levelSelected = true
		}
	},
	template: `
		<main>
			<h2>High Scores</h2>
			<levels v-if="!levelSelected" :levels="levels" @levelSelected="lvl => selectLevel(lvl)" />
			<category-scores v-else :categories="categories" :categoriesScores="categoriesScores" />
		</main>
	`
})


app.component("levels", {
	props: ["levels"],
	template: `
		<ul class="levels">
			<li v-for="level in levels" class="row" @click="() => this.$emit('levelSelected', level.level)">
				{{level.level}}
				<img :src="level.image" :alt="level.level">
			</li>
		</ul>
	`
})


app.component("category-scores", {
	props: ["categories", "categoriesScores"],
	template: `
		<ul class="categories">
			<li v-for="category in categories" class="block">
				<span>{{categoriesScores[category]}}</span>
				<span>{{category}}</span>
			</li>
		</ul>
	`
})


app.component("settings", {
	methods: {
		settingsAction(action) {
			this.$emit('changeSettings', action)
		}
	},
	props: ["options"],
	template: `
		<main>
			<h2>Settings</h2>
			<ul class="settings">
				<li class="row">
					<label for="soundOn">
						<span>Sound</span>
						<input type="checkbox" id="soundOn" :checked="options.sound?true:false" @change="settingsAction('soundToggle')">
						<div class="switch"></div>
					</label>
				</li>
				<li class="row">
					<label for="darkMode">
						<span>Darkmode</span>
						<input type="checkbox" id="darkMode" :checked="options.darkmode?true:false" @change="settingsAction('darkModeToggle')">
						<div class="switch"></div>
					</label>
				</li>
				<li class="row">
					<button @click="settingsAction('reset')">Reset High Scores</button>
				</li>
			</ul>
		</main>
	`
})


app.mount("#app")