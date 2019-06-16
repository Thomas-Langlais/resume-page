import Bowser from 'bowser'

const browser = Bowser.getParser(window.navigator.userAgent)

export const validScrollIntoView = browser.satisfies({
    windows: {
        'internet explorer': '>=8'
    },
    macos: {
        safari: '>=6'
    }
})

export const validScrollIntoViewOptions = !browser.satisfies({
    windows: {
        'internet explorer': '>=1'
    },
    macos: {
        safari: '>=1'
    }
})