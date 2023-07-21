module.exports = {
    root: true,
    plugins: [
      '@typescript-eslint',
      '@typescript-eslint/internal',
      'deprecation',
      'eslint-comments',
      'eslint-plugin',
      'import',
      'jest',
      'simple-import-sort',
      'unicorn',
    ],
    env: {
      es2020: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:eslint-plugin/recommended',
    ],
    parserOptions: {
      sourceType: 'module',
      project: [
        './tsconfig.eslint.json',
        './packages/*/tsconfig.json',
        './packages/scope-manager/tsconfig.build.json',
        './packages/scope-manager/tsconfig.spec.json',
      ],
      allowAutomaticSingleRunInference: true,
      tsconfigRootDir: __dirname,
      warnOnUnsupportedTypeScriptVersion: false,
      EXPERIMENTAL_useSourceOfProjectReferenceRedirect: false,
      cacheLifetime: {
        glob: 'Infinity',
      },
    }
}