(function(){
	
/*
* The following utilities are all adapted from 
* https://github.com/LeaVerou/awesomplete
*/

// String -> String -> Boolean
function contains(input) {
  return function(text){
     return input.trim().length
     ? RegExp(regExpEscape(input.trim()), "i").test(text) 
     : true
  }
}

// String -> String
function regExpEscape(s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

// a -> b -> Number
function sortByLength(a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b? -1 : 1;
};

// a -> a
function I(x){
  return x
}
    
function K(a){
  return function(b){
    return a
  }
}
    

// Config
const baseConfig = {
  minChars: 2
  ,maxItems: 10
  ,autoFirst: false
  ,filter: contains
  ,sort: sortByLength
  ,renderItem: I
  ,extractValue: I
  ,replace: K(I)
}

/* 
   HyperscriptConstructor -> Over -> View -> Set -> Autocomplete
   
   where Over is a -> ( (x,a) -> a ) -> a
   where View is -> a
   where Set is a -> x -> a
   where Autocomplete is
      a -> a -> a -> a -> Config
   
   where Config is 
      { minChars: PositiveNumber 
        maxItems: PositiveNumber
        autoFirst: Boolean
        filter: String -> String -> Boolean
        sort: a -> b -> Number
        renderItem: a -> Hyperscript a
        extractValue: a -> String
        replace: String -> String -> String
      }
*/
function BaseAutocomplete(h, over, view, set){
    
  
  function Autocomplete( list, input, chosen, open, instanceConfig){
    
    const config = Object.assign({}, baseConfig, instanceConfig)
    const sort = (a,b) => 
      [  [a,b].map( config.extractValue )  ]
      .map( ([a,b]) => config.sort(a,b) )
      [0]
       
    var value = view(input)
    
    function item(x) {
      return h(
        'li'
        ,{ 
          onclick: () => { 
            set(chosen)(x)
            set(input)( 
              config.replace(value)
                (config.extractValue(x))
            )
            set(open)(false)
          }
        , tabindex: -1 
        }
        , config.renderItem(x)
      )
    } 
    
    return h('div'
      ,h('input'
         ,{ value
         , oninput: function(e){
           [e.currentTarget.value]
             .map( config.extractValue )
             .map( set(input) )
         }
           , onfocus: () => { set(open)(true) }
           , onblur: () => { setTimeout( set(open), 0, false) }
         }
      )
      ,view(open) && value.length >= config.minChars
      ? h('ul'
        , view( list )
            .filter(contains(value))
            .sort(sort)
            .slice(0, config.maxItems)
            .map( item )
        )
      : h('ul')
    )

  }

  return Autocomplete  
}

if( typeof module != 'undefined' ){
  module.exports = BaseAutocomplete   
} else {
  window.BaseAutocomplete = BaseAutocomplete
}
	
}()
