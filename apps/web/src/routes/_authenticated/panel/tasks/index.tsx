import Tasks from '#features/tasks/index.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/panel/tasks/')({
  component: Tasks,
})