import { arvinn } from '@arvinn/eslint-config'

export default arvinn([
  {
    rules: {
      'import/no-default-export': 'off',
      'node/prefer-global/process': 'off',
    },
  },
])
