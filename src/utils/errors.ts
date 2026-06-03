import axios from 'axios'

import { tr, translateApiMessage } from '../i18n/tr'
import type { OpenWeatherErrorResponse } from '../types/weather'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<OpenWeatherErrorResponse>(error)) {
    const status = error.response?.status
    const apiMessage = error.response?.data?.message

    if (status === 404) {
      return tr.errors.cityNotFound
    }

    if (status === 401) {
      const msg = apiMessage?.toLowerCase() ?? ''
      if (msg.includes('activate') || msg.includes('activation')) {
        return tr.errors.apiKeyPending
      }
      return apiMessage
        ? translateApiMessage(apiMessage)
        : tr.errors.invalidApiKey
    }

    if (apiMessage) {
      return translateApiMessage(apiMessage)
    }

    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return tr.errors.networkError
    }

    return error.message || tr.errors.requestFailed
  }

  if (error instanceof Error) {
    if (error.message === tr.errors.missingApiKey) {
      return error.message
    }
    return translateApiMessage(error.message)
  }

  return tr.errors.generic
}
