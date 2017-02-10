const PropAutocomplete = BaseAutocomplete(
  m
  ,o => f => o( f(o) )
  ,o => o()
  ,o => x => o(x)
)

var Main = {
  controller: function(){
    
    return {
      m_list: m.prop([
          'apples'
          , 'bananas'
          , 'banobos'
          , 'pears'
          , 'cherries'
      ])
      ,m_value: m.prop('')
      ,m_chosen: m.prop('')
      ,m_open: m.prop(false)
    }
  }
  
  ,view: function (ctrl){
    const { m_list , m_value, m_chosen, m_open } = ctrl

    console.log(JSON.stringify(ctrl))
    return [
      ,m('p','Mithril Prop Autocomplete')
      ,PropAutocomplete( m_list, m_value, m_chosen, m_open  )
    ]
  }
}   
    
m.mount( document.querySelector('#demo_container'), Main )