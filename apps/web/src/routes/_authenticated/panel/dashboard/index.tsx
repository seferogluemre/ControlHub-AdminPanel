import Dashboard from '#features/dashboard/index.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/panel/dashboard/')({
  component: Dashboard,
})
