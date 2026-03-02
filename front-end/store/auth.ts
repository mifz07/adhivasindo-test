import { defineStore } from 'pinia'

interface User {
  userId: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) =>
      state.user?.role?.toLowerCase() === 'admin',
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },

    clearUser() {
      this.user = null
    },
  },
})