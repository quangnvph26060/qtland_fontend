import { defineStore } from "pinia";

const auth = defineStore({
	id: "auth",
	state: () => ({
		token: "",
		user: {},
	}),
	getters: {
		isLoggedIn: (state) => !!state.token,
		isAdmin: (state) => state.user.role === "admin",
		isUser: (state) => state.user.role === "user",
		getUser: (state) => state.user,
	},

	actions: {
		login(token, user) {
			this.token = token;
			this.user = user;
			localStorage.setItem("token", token);
		},
		logout() {
			this.token = "";
			this.user = {};
			localStorage.removeItem("token");
			localStorage.removeItem("role");
		},
	},
});

export default auth;
