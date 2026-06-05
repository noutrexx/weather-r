import axios from 'axios'

import { en, translateApiMessage } from '../i18n/en'
import type { OpenWeatherErrorResponse } from '../types/weather'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<OpenWeatherErrorResponse>(error)) {
    const status = error.response?.status
    const apiMessage = error.response?.data?.message

    if (status === 404) {
      return en.errors.cityNotFound
    }

    if (status === 401) {
      const msg = apiMessage?.toLowerCase() ?? ''
      if (msg.includes('activate') || msg.includes('activation')) {
        return en.errors.apiKeyPending
      }
      return apiMessage
        ? translateApiMessage(apiMessage)
        : en.errors.invalidApiKey
    }

    if (apiMessage) {
      return translateApiMessage(apiMessage)
    }

    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return en.errors.networkError
    }

    return error.message || en.errors.requestFailed
  }

  if (error instanceof Error) {
    if (error.message === en.errors.missingApiKey) {
      return error.message
    }
    return translateApiMessage(error.message)
  }

  return en.errors.generic
}
