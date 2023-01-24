import { describe, it, beforeEach, expect } from 'vitest'
import { shallowMount, type Wrapper } from '@vue/test-utils'
import App from './App.vue'

describe('MineSweeper', () => {
  let app: Wrapper;

  beforeEach(() => {
    app = shallowMount(App)
  })

  describe('Board', () => {
    it('should render a 9x9 board by default', () => {
      expect(app.findAll('.cell')).toHaveLength(81)
    })
    it('should have every cell overlaped by default', () => {
      expect(app.findAll('.overlap')).toHaveLength(81)
    })
    it('should have no visible flags by default', () => {
      expect(app.findAll('.flag')).toHaveLength(0)
    })
  })
})