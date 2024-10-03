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
			localStorage.setItem("is_login", user.is_login);
			localStorage.setItem("role_id", user.role_id);
			localStorage.setItem("user_create_id", user.user_id);
			localStorage.setItem("user_id", user.id);
			localStorage.setItem("token", token);
		},
		logout() {
			this.token = "";
			this.user = {};
			localStorage.removeItem("token");
			localStorage.removeItem("role_id");
			localStorage.removeItem("user_id");
			localStorage.removeItem("role");
			localStorage.removeItem("is_login");
			localStorage.removeItem("user_create_id");
		},
	},
});

export default auth;
