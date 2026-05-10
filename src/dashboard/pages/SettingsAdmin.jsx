import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getSiteSettings, saveSiteSettings } from '@/services/settingsService'
import { isFirebaseConfigured } from '@/api/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notify } from '@/utils/notify'

export default function SettingsAdmin() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      siteName: '',
      phone: '',
      email: '',
      whatsapp: '',
      address: '',
    },
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await getSiteSettings()
      if (!cancelled) reset(data)
    })()
    return () => {
      cancelled = true
    }
  }, [reset])

  const onSubmit = async (values) => {
    if (!isFirebaseConfigured()) {
      notify({
        variant: 'destructive',
        title: 'Firebase required',
        description: 'Firestore persists settings/hints across deployments.',
      })
      return
    }
    try {
      await saveSiteSettings(values)
      notify({ title: 'Settings saved' })
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Save failed',
        description: e.message,
      })
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl">Settings</h1>
        <p className="text-muted">
          Lightweight CRM footprint stored inside{' '}
          <code className="rounded bg-background px-1 text-xs">settings/site</code>.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Global contacts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="siteName">Site name</Label>
              <Input id="siteName" {...register('siteName')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register('phone')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (digits)</Label>
              <Input id="whatsapp" {...register('whatsapp')} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Public email</Label>
              <Input id="email" {...register('email')} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register('address')} />
            </div>
          </CardContent>
        </Card>
        <Button className="mt-8" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </Button>
      </form>
    </div>
  )
}
