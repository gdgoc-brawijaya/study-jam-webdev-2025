import type { Task } from '../types'

type TaskDetailsProps = {
  task: Task | null
  loading: boolean
}

export function TaskDetails({ task, loading }: TaskDetailsProps) {
  if (loading) {
    return (
      <section className="panel detail-panel">
        <p className="eyebrow">Selected item</p>
        <div className="detail-skeleton">
          <span />
          <span />
          <span />
        </div>
      </section>
    )
  }

  if (!task) {
    return (
      <section className="panel detail-panel">
        <p className="eyebrow">Selected item</p>
        <h3>Pick an item from the list.</h3>
        <p>The detail view fetches one record at a time.</p>
      </section>
    )
  }

  return (
    <section className="panel detail-panel">
      <p className="eyebrow">Selected item</p>
      <h3>{task.title}</h3>
      <p className="detail-description">{task.description}</p>
      <div className="detail-meta">
        <span>ID: {task.id}</span>
        <span>{new Date(task.createdAt).toLocaleString()}</span>
      </div>
    </section>
  )
}
