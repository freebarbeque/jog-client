/* globals jest */
jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
})

// Stub modules so that the sanity test runs
// If we ever actually have component tests, these will need to mocked out properly
jest.mock('react-native-fetch-blob', () => 'react-native-fetch-blob')
