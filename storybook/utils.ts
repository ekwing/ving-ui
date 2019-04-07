import { Story } from '@storybook/vue'

function addStories (stories: Story, context: __WebpackModuleApi.RequireContext, sortQueue: string[] = []) {
  const queue = sortQueue.length ? sortQueue.map(_ => `./${_}.story.ts`) : context.keys()
  queue.forEach(filename => {
    const addStory = context(filename).default
    addStory(stories)
  })
}

export {
  addStories
}