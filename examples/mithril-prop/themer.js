const themer =

  (function(){

  const transformMany = R.curry(function transformMany(lens, f, s){
      return R.converge( 
          lens
          ,[R.pipe( R.view( lens ), R.map( f )) , R.identity]
      )([s])[0]
  })

  const transformOne = R.curry(function transformOne(lens, f, s){
      return R.over( lens, f, [s] )[0]
  })

  function Transformer({ path, type }){
      return (
          type == 'many' 
              ? transformMany
              : transformOne
      )(path)
  }

  const pathToLens = 
    R.pipe(
        R.map(
            R.ifElse(
                R.is(Number)
                , R.lensIndex
                , R.lensProp
            )
        )
        ,R.apply(R.compose)
    )

  // Queries -> { [key]: Transformer }
  // where Transformer is
  //   T -> a -> b
  // where T is ( a, b ) -> c
  const themer =
  
    R.map(
      R.pipe(
        R.over(
            R.lensProp('path')
            ,pathToLens
        )
        ,Transformer
      )
    )

    return themer
}())