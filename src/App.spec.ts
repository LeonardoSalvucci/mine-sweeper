import { describe, it, beforeEach, expect, vi } from 'vitest'
import { shallowMount, type VueWrapper, type DOMWrapper } from '@vue/test-utils'

import {
  createRandomGameBoard, 
  createBoardData, 
  checkPosition,
  checkWinCondition
} from './logic/game'
import { createMockBoardData, createMockRandomGameBoard } from './logic/gameMock'
import App from './App.vue'

vi.mock('./logic/game')

describe('MineSweeper', () => {
  
  describe('Board', () => {
    let app: VueWrapper;
  
    beforeEach(() => {
      vi.mocked(createRandomGameBoard).mockRestore()
      vi.mocked(createBoardData).mockRestore()
      vi.mocked(checkPosition).mockRestore()
      vi.mocked(checkWinCondition).mockRestore()
      app = shallowMount(App)
    })
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

  describe('Game', () => {
    let app: VueWrapper;
    
    // We are going to mock createRandomGame function to allways return the same board
    // There's will be only one mine in cell 0,0 with a board of 9x9
    beforeEach(async () => {
      // Mock createRandomGame function
      vi.mocked(createRandomGameBoard).mockImplementation(createMockRandomGameBoard)
      vi.mocked(createBoardData).mockImplementation(createMockBoardData)
      vi.mocked(checkPosition).mockRestore()
      vi.mocked(checkWinCondition).mockRestore()
      app = shallowMount(App)
    })

    it('verify if the board is correct', () => {
      expect(app.findAll('.cell')).toHaveLength(9)
    })

    it('should add a flag when right click on a cell', async () => {
      const cell = app.find<HTMLDivElement>('.cell')
      await cell.trigger('click.right')

      expect(app.findAll('.flag')).toHaveLength(1)
    })
  })
})