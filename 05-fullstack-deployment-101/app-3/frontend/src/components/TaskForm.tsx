import type { FormEvent } from 'react'
import { useState } from 'react'

import type { TaskPayload } from '../types'

type TaskFormProps = {
  onSubmit: (payload: TaskPayload) => Promise<boolean>
  loading: boolean
}

export function TaskForm({ onSubmit, loading }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const saved = await onSubmit({
      title: title.trim(),
      description: description.trim(),
    })

    if (saved) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Add item</p>
          <h2>Capture a quick note or action item.</h2>
        </div>
      </div>

      <label className="field">
        <span>Title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Draft launch checklist"
          maxLength={80}
          required
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Short note for the team..."
          rows={4}
          maxLength={220}
        />
      </label>

      <button className="button button-primary" type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add item'}
      </button>
    </form>
  )
}
