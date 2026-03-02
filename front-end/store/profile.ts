import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profileInformation: {} as any, 
  }),
  actions: {
    setBasicInformation(info: any) {
        this.profileInformation = {
            ...info
        }
    },
    updateProfileInformation(info: any) {
        this.profileInformation = {
            ...this.profileInformation,
            ...info
        }
    },
    updatePassword(newPassword: string){
        this.profileInformation.password = newPassword
    },
    updatePhone(phone: string){
        this.profileInformation.phone = phone
    }
  },
})