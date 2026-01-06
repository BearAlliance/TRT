import nextTypescriptConfig from 'eslint-config-next/typescript'
import nextCoreWebVitalsConfig from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextCoreWebVitalsConfig,
  ...nextTypescriptConfig,
  {
    ignores: ['node_modules/**', 'build/**', '.next/**'],
  },
]

export default eslintConfig
