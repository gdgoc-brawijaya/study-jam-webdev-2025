import type { Task, TaskPayload } from './types'

const API_BASE = '/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const fallback = 'Request failed'
    const payload = await response.json().catch(() => null)
    const message = typeof payload?.error === 'string' ? payload.error : fallback
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const taskApi = {
  list: () => request<{ items: Task[] }>('/tasks'),
  get: (id: string) => request<Task>(`/tasks/${id}`),
  create: (payload: TaskPayload) =>
    request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
}
