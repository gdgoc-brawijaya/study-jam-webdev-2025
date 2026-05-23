import type { Task } from '../types'

type TaskListProps = {
  tasks: Task[]
  loading: boolean
  selectedId?: string
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, loading, selectedId, onSelect, onDelete }: TaskListProps) {
  if (loading) {
    return (
      <div className="panel">
        <p className="eyebrow">Items</p>
        <div className="loading-list">
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="panel empty-state">
        <p className="eyebrow">Items</p>
        <h3>No items yet</h3>
        <p>Add the first note or action item to get started.</p>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Items</p>
          <h2>Stored in SQLite and ready to use.</h2>
        </div>
        <span className="count-chip">{tasks.length} items</span>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div className={`task-row ${selectedId === task.id ? 'is-active' : ''}`}>
              <button
                type="button"
                className="task-row__main"
                onClick={() => onSelect(task.id)}
              >
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </button>

              <button
                type="button"
                className="task-row__delete"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
