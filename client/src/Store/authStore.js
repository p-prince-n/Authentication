import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast';

const API_URL='http://localhost:3000/auth'
axios.defaults.withCredentials=true;

export const useAuthStore=create((set)=>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth:true,
    message: null,

    signUp:async(userData)=>{
        set({isLoading: true, error: null});
        try{
            const res= await axios.post(`${API_URL}/signUp`, userData);
            if(res.status === 201 && res.data.user){
                toast.success(res.data.message)
                set({user: res.data.user, isAuthenticated: true, error: null, isLoading: false})
            }

        }catch(e){
            set({error: e.response?.data.message || 'Error while sign up', isLoading: false})
            throw e;
        }

    },
    emailVerification:async(code)=>{
        set({isLoading: true, error: null});
        try{
            const res= await axios.post(`${API_URL}/verifyEmail`, {code});
            if(res.status === 201 && res.data.user){
                toast.success(res.data.message)
                set({user: res.data.user, isAuthenticated: true, error: null, isLoading: false})
            }

        }catch(e){
            set({error: e.response?.data.message || 'Error while sign up', isLoading: false})
            throw e;
        }
    },
    checkAuth:async()=>{
        set({isLoading: true, error: null, isCheckingAuth: true});
        try{
            const res= await axios.get(`${API_URL}/check-auth`);
            
            if(res.status === 200 && res.data.user){
                set({user: res.data.user, isAuthenticated: true,  isLoading: false, isCheckingAuth: false})
            }
            

        }catch(e){
            set({error: null, isLoading: false, isCheckingAuth: false, isAuthenticated:false})
        }
    },
    signIn:async(userData)=>{
        set({isLoading: true, error: null});
        try{
            const res= await axios.post(`${API_URL}/signIn`, userData);
            if(res.status === 201 && res.data.user){
                toast.success(res.data.message)
                set({user: res.data.user, isAuthenticated: true, error: null, isLoading: false})
            }

        }catch(e){
            set({error: e.response?.data.message || 'Error while sign up', isLoading: false})
            throw e;
        }

    },
    logout: async()=>{
        set({isLoading: true, error: null});
        try{
            const res= await axios.post(`${API_URL}/signOut`);
            if(res.status === 201 ){
                set({user: null, isAuthenticated: false, error: null, isLoading: false})
            }

        }catch(e){
            set({error: e.response?.data.message || 'Error while sign up', isLoading: false})
            throw e;
        }
    },
    forgotPassword: async(email)=>{
        set({isLoading: true, error: null})
        try{
            const res= await axios.post(`${API_URL}/forgotPassword`, {email});
            if(res.status === 200 ){
                set({ error: null, isLoading: false, message: res.data.message})
            }

        }catch(e){
            set({error: e.response?.data.message || 'Error while sign up', isLoading: false})
            throw e;
        }
    },
    resetPassword:async(token, password)=>{
        set({isLoading: true, error: null})
        try{
            const res= await axios.post(`${API_URL}/reset-password/${token}`, {password});
             if(res.status === 200 ){
            set({message: res.data.message, isLoading: false})
             }


        }catch(e){
            set({error: e.response?.data.message || 'Error while sign up', isLoading: false})
            throw e;
        }

    }

}))