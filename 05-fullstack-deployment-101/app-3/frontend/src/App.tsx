import { useEffect, useMemo, useState } from 'react'

import { taskApi } from './api'
import { TaskDetails } from './components/TaskDetails'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import type { Task, TaskPayload } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTask = async (id: string, showLoader = true) => {
    if (showLoader) {
      setDetailLoading(true)
    }

    try {
      const task = await taskApi.get(id)
      setSelectedTask(task)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to load task detail')
    } finally {
      if (showLoader) {
        setDetailLoading(false)
      }
    }
  }

  const refreshTasks = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await taskApi.list()
      setTasks(response.items)

      if (response.items.length > 0) {
        await loadTask(response.items[0].id, false)
      } else {
        setSelectedTask(null)
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to load tasks')
      setSelectedTask(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refreshTasks()
  }, [])

  const handleCreate = async (payload: TaskPayload) => {
    setSaving(true)
    setError(null)

    try {
      const created = await taskApi.create(payload)
      setTasks((current) => [created, ...current])
      setSelectedTask(created)
      return true
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to create task')
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setError(null)

    try {
      await taskApi.remove(id)
      const nextTasks = tasks.filter((task) => task.id !== id)
      setTasks(nextTasks)

      if (selectedTask?.id === id) {
        if (nextTasks[0]) {
          await loadTask(nextTasks[0].id)
        } else {
          setSelectedTask(null)
        }
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to delete task')
    }
  }

  const stats = useMemo(
    () => ({
      total: tasks.length,
      selected: selectedTask ? selectedTask.title : 'None selected',
      api: error ? 'Needs attention' : 'Connected',
    }),
    [error, selectedTask, tasks.length],
  )

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Northstar</p>
          <h1>A calm workspace for focused planning.</h1>
          <p className="hero-copy">
            Keep priorities, quick notes, and small action items in one place.
            Small enough to stay simple, polished enough to feel real.
          </p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Total tasks</span>
            <strong>{stats.total}</strong>
          </article>
          <article className="stat-card">
            <span>Selected</span>
            <strong>{stats.selected}</strong>
          </article>
          <article className="stat-card">
            <span>API</span>
            <strong>{stats.api}</strong>
          </article>
        </div>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}

      <main className="content-grid">
        <section className="column">
          <TaskForm onSubmit={handleCreate} loading={saving} />
          <TaskList
            tasks={tasks}
            loading={loading}
            selectedId={selectedTask?.id}
            onSelect={(id) => void loadTask(id)}
            onDelete={(id) => void handleDelete(id)}
          />
        </section>

        <section className="column">
          <TaskDetails task={selectedTask} loading={detailLoading} />

          <section className="panel note-panel">
            <p className="eyebrow">Product note</p>
            <p>
              The app talks to its API through <code>/api</code>, and the health
              check lives at <code>/health</code>.
            </p>
          </section>
        </section>
      </main>
    </div>
  )
}

export default App
