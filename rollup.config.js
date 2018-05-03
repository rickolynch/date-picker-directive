plugins: [
  nodeResolve({
    jsnext: true,
    module: true
  }),
  commonjs({
    include: [
      'node_modules/moment/**'
    ]
  }),
  uglify()
]
