import { useEffect, useState } from 'react'
import { listUsers } from '@/services/userService'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function UsersAdmin() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const rows = await listUsers()
        if (!cancelled) setUsers(rows)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Unable to read users collection.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Users</h1>
        <p className="text-muted">
          Promotion to admin happens securely inside Firebase Authentication &
          Firestore — client SDK cannot elevate privileges by itself.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrators</CardTitle>
          <CardDescription>
            Create accounts via Firebase Auth, then write{' '}
            <code className="rounded bg-background px-1 text-xs">role: admin</code> on the{' '}
            matching Firestore document in the{' '}
            <code className="rounded bg-background px-1 text-xs">users</code> collection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open Firebase Console → Authentication → add Email / Password user.</li>
            <li>Open Cloud Firestore → collection users → document ID must equal UID.</li>
            <li>
              Fields recommended:
              <code className="ml-2 rounded bg-background px-1 text-xs">
                email, displayName, role
              </code>
              .
            </li>
          </ol>
          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-900">
              {error}{' '}
              Adjust Firestore security rules so admins may read directory listings — this UI is optional read-only.
            </p>
          ) : null}
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="p-3 font-medium">UID</th>
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-muted">
                      No readable profiles yet — tighten Firestore rules if empty unintentionally.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="border-t border-border">
                      <td className="p-3 font-mono text-xs">{u.id}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <Badge variant={u.role === 'admin' ? 'default' : 'outline'}>
                          {u.role || 'customer'}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
