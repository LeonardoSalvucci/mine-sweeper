import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Social from './Social.vue'

describe('Social Component', () => {
  it('should render component with two anchors', async () => {
    const wrapper = mount(Social)
    expect(wrapper.findAll('a')).toHaveLength(2)
  })

  it('should render github link', async () => {
    const wrapper = mount(Social)
    const githubLink = wrapper.find('[data-testid="github-link"]')
    expect(githubLink.attributes('href')).toBe('https://github.com/LeonardoSalvucci/mine-sweeper')
    expect(githubLink.find('img').attributes('src')).toContain('github.svg')
  })

  it('should render linkedin link', async () => {
    const wrapper = mount(Social)
    const linkedinLink = wrapper.find('[data-testid="linkedin-link"]')
    expect(linkedinLink.attributes('href')).toBe('https://www.linkedin.com/in/leonardosalvucci/')
    expect(linkedinLink.find('img').attributes('src')).toContain('linkedin.svg')
  })
})