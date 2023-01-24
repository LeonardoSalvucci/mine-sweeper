import { describe, it, beforeEach, expect } from 'vitest'
import { shallowMount, type VueWrapper, type DOMWrapper } from '@vue/test-utils'
import App from './App.vue'

describe('MineSweeper', () => {
  let app: VueWrapper;

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
    it('should have 3 buttons with "JUNIOR", "SEMI-SENIOR" and "SENIOR" text', () => {
      const buttons = app.findAll<HTMLButtonElement>('.actions > button')
      expect(buttons).toHaveLength(3)

      // Get every text of buttons
      const buttonsText = buttons.map( (button: DOMWrapper<HTMLButtonElement>) => button.text())
      expect(buttonsText).toContain('JUNIOR')
      expect(buttonsText).toContain('SEMI-SENIOR')
      expect(buttonsText).toContain('SENIOR')
    })
    it('should have a board of 16x16 when click on SEMI-SENIOR button', async () => {
      const semiSeniorButton = app.find<HTMLButtonElement>('[data-testid="semi-senior"]')
      await semiSeniorButton.trigger('click')
      expect(app.findAll('.cell')).toHaveLength(256)
    })
    it('should have a board of 30x30 when click on SENIOR button', async () => {
      const semiSeniorButton = app.find<HTMLButtonElement>('[data-testid="senior"]')
      await semiSeniorButton.trigger('click')
      expect(app.findAll('.cell')).toHaveLength(900)
    })
  })
})