const app = Vue.createApp({
	data() {
		return {
			darkmode: false
		}
	},
	methods: {
		toggleMode() {
			this.darkmode = !this.darkmode
			if (this.darkmode)
				document.body.classList.add("dark-mode")
			else
				document.body.classList.remove("dark-mode")
		}
	},
	template: `
	`
})

app.mount("#app")