import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hashtag utilities
export function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g
  const matches = text.match(hashtagRegex)
  if (!matches) return []
  
  // Remove the # symbol and return unique hashtags
  return Array.from(new Set(matches.map(tag => tag.slice(1).toLowerCase())))
}

export function formatHashtags(text: string): { text: string; hashtags: string[] } {
  const hashtags = extractHashtags(text)
  return { text, hashtags }
}

export function highlightHashtags(text: string): string {
  return text.replace(/#[\w\u0590-\u05ff]+/g, '<span class="text-blue-500 font-medium">$&</span>')
}

export function formatDate(date: Date | string) {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d`
  } else {
    return d.toLocaleDateString()
  }
}

export function generateUsername(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 15)
}

export function validateUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/
  return usernameRegex.test(username)
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
} 