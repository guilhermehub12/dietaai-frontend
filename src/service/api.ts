import axios from 'axios'

// Create an axios instance
export const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3333'
})