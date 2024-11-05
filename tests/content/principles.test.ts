import { describe, test, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils'

describe('Principles Pages', () => {
  test('principles index is accessible', async () => {
    const html = await $fetch('/principles')
    expect(html).toContain('Principles')
  })

  test('privacy first page is accessible', async () => {
    const html = await $fetch('/principles/privacy-first')
    expect(html).toContain('Privacy First Practices')
  })
})
