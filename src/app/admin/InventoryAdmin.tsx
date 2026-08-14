'use client'

/* eslint-disable @next/next/no-img-element */

import { type FormEvent, useEffect, useState } from 'react'
import { ErrorBanner } from '@/app/admin/ErrorBanner'
import { cmsApiUrl, type InventoryItem } from '@/app/inventory/InventoryGrid'

type EditorState = {
  description: string
  id?: string
  image?: File
  title: string
}

const emptyEditor = (): EditorState => ({ description: '', title: '' })

async function responseMessage(response: Response) {
  const body = (await response.json().catch(() => null)) as {
    error?: string
  } | null
  return body?.error ?? 'Something went wrong. Please try again.'
}

export function InventoryAdmin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [items, setItems] = useState<InventoryItem[]>([])
  const [editor, setEditor] = useState<EditorState | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const loadItems = async () => {
    const response = await fetch(`${cmsApiUrl}/v1/admin/inventory`, {
      credentials: 'include',
    })
    if (response.status === 401) {
      setAuthenticated(false)
      return
    }
    if (!response.ok) throw new Error(await responseMessage(response))
    const body = (await response.json()) as { items: InventoryItem[] }
    setItems(body.items)
    setAuthenticated(true)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadItems().catch((error: Error) => {
        setMessage(error.message)
        setAuthenticated(false)
      })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const form = new FormData(event.currentTarget)
      const response = await fetch(`${cmsApiUrl}/v1/auth/login`, {
        body: JSON.stringify({
          password: form.get('password'),
          username: form.get('username'),
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      if (!response.ok) return setMessage(await responseMessage(response))
      await loadItems()
    } catch {
      setMessage('Unable to reach the inventory CMS. Please try again shortly.')
    } finally {
      setSaving(false)
    }
  }

  const saveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor) return
    setSaving(true)
    setMessage(null)
    try {
      const form = new FormData(event.currentTarget)
      const response = await fetch(
        `${cmsApiUrl}/v1/admin/inventory${editor.id ? `/${editor.id}` : ''}`,
        {
          body: form,
          credentials: 'include',
          method: editor.id ? 'PATCH' : 'POST',
        },
      )
      if (!response.ok) return setMessage(await responseMessage(response))
      setEditor(null)
      await loadItems()
    } catch {
      setMessage('Unable to save the item. Please try again shortly.')
    } finally {
      setSaving(false)
    }
  }

  const deleteItem = async (item: InventoryItem) => {
    if (!window.confirm(`Remove “${item.title}” from inventory?`)) return
    setMessage(null)
    const response = await fetch(`${cmsApiUrl}/v1/admin/inventory/${item.id}`, {
      credentials: 'include',
      method: 'DELETE',
    })
    if (!response.ok) return setMessage(await responseMessage(response))
    await loadItems()
  }

  const moveItem = async (item: InventoryItem, direction: -1 | 1) => {
    const index = items.findIndex(({ id }) => id === item.id)
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const orderedItems = [...items]
    ;[orderedItems[index], orderedItems[target]] = [
      orderedItems[target],
      orderedItems[index],
    ]
    setItems(orderedItems)
    setMessage(null)
    try {
      const response = await fetch(`${cmsApiUrl}/v1/admin/inventory/order`, {
        body: JSON.stringify({ ids: orderedItems.map(({ id }) => id) }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      if (!response.ok) throw new Error(await responseMessage(response))
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to update the item order.',
      )
      await loadItems()
    }
  }

  const logout = async () => {
    await fetch(`${cmsApiUrl}/v1/auth/logout`, {
      credentials: 'include',
      method: 'POST',
    })
    setAuthenticated(false)
    setItems([])
  }

  if (authenticated === null)
    return <p className="text-slate-600">Loading inventory editor…</p>
  if (!authenticated)
    return (
      <form
        onSubmit={login}
        className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-slate-900">
          Inventory admin
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage the website inventory.
        </p>
        {message && (
          <ErrorBanner
            className="mt-4"
            message={message}
            onDismiss={() => setMessage(null)}
          />
        )}
        <label className="mt-5 block text-sm font-medium text-slate-700">
          Username
          <input
            required
            name="username"
            autoComplete="username"
            className="mt-1 block w-full rounded-lg border-slate-300"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input
            required
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 block w-full rounded-lg border-slate-300"
          />
        </label>
        <button
          disabled={saving}
          className="mt-6 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    )

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Inventory admin
          </h1>
          <p className="mt-1 text-slate-600">
            Add, update, or remove the items shown on the website.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditor(emptyEditor())}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Add item
          </button>
          <button
            onClick={logout}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300"
          >
            Sign out
          </button>
        </div>
      </div>
      {message && (
        <ErrorBanner
          className="mt-5"
          message={message}
          onDismiss={() => setMessage(null)}
        />
      )}
      {editor && (
        <form
          onSubmit={saveItem}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">
            {editor.id ? 'Edit item' : 'Add item'}
          </h2>
          <label className="mt-4 block text-sm font-medium text-slate-700">
            Title
            <input
              required
              maxLength={160}
              name="title"
              value={editor.title}
              onChange={(event) =>
                setEditor({ ...editor, title: event.target.value })
              }
              className="mt-1 block w-full rounded-lg border-slate-300"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-700">
            Description
            <textarea
              required
              maxLength={4000}
              name="description"
              value={editor.description}
              onChange={(event) =>
                setEditor({ ...editor, description: event.target.value })
              }
              rows={5}
              className="mt-1 block w-full rounded-lg border-slate-300"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-700">
            Photo
            <span className="mt-1 flex flex-wrap items-center gap-3">
              <span className="inline-flex cursor-pointer items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                Choose photo
                <input
                  required={!editor.id}
                  accept="image/jpeg,image/png,image/webp"
                  name="image"
                  type="file"
                  onChange={(event) =>
                    setEditor({ ...editor, image: event.target.files?.[0] })
                  }
                  className="sr-only"
                />
              </span>
              <span className="text-sm font-normal text-slate-500">
                {editor.image?.name ?? 'No new photo selected'}
              </span>
            </span>
          </label>
          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG, or WebP, up to 10 MB. Leave blank to keep the current
            photo.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              disabled={saving}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save item'}
            </button>
            <button
              type="button"
              onClick={() => setEditor(null)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              src={item.imageUrl}
              alt=""
              className="aspect-4/3 w-full object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                {item.description}
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => void moveItem(item, -1)}
                  disabled={index === 0}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Move up
                </button>
                <button
                  type="button"
                  onClick={() => void moveItem(item, 1)}
                  disabled={index === items.length - 1}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Move down
                </button>
                <button
                  onClick={() =>
                    setEditor({
                      description: item.description,
                      id: item.id,
                      title: item.title,
                    })
                  }
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => void deleteItem(item)}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-red-700 ring-1 ring-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!items.length && (
        <p className="mt-8 rounded-2xl bg-white p-6 text-slate-600">
          No items yet. Add your first item to show it on the inventory page.
        </p>
      )}
    </div>
  )
}
