import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom has no layout engine, so recharts' ResponsiveContainer (which measures
// its parent via ResizeObserver) never sees a non-zero size and renders nothing.
// Give every element a fixed size and fire the observer callback immediately.
Element.prototype.getBoundingClientRect = () => ({
  width: 600,
  height: 280,
  top: 0,
  left: 0,
  bottom: 280,
  right: 600,
  x: 0,
  y: 0,
  toJSON() {},
})
vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(600)
vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(280)
globalThis.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe(target) {
    this.callback([{ target, contentRect: target.getBoundingClientRect() }])
  }
  unobserve() {}
  disconnect() {}
}
