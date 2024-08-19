var questions = [
    {question:"Qual seu primeito nome?"},
    {question:"Qual seu sobrenome?"},
    {question:"Qual seu email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"Crie sua senha", type: "password"}
  ]
  

  
  ;(function(){
  
    var tTime = 100 
    var wTime = 200  
    var eTime = 1000 
  
    
    var position = 0
  
    putQuestion()
  
    progressButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e){
      transform(0, 0) 
      if(e.keyCode == 13) validate()
    })
  
  
    function putQuestion() {
      inputLabel.innerHTML = questions[position].question
      inputField.value = ''
      inputField.type = questions[position].type || 'text'  
      inputField.focus()
      showCurrent()
    }
    
    
    function done() {
      
  
      register.className = 'close'
      
      
      var h1 = document.createElement('h1')
      h1.appendChild(document.createTextNode('Bem-vindo ' + questions[0].value + '!'))
      setTimeout(function() {
        register.parentElement.appendChild(h1)     
        setTimeout(function() {h1.style.opacity = 1}, 50)
      }, eTime)
      
    }
  
    
    function validate() {
  
      
      questions[position].value = inputField.value
  
      
      if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
      else ok(function() {
        
       
        progress.style.width = ++position * 100 / questions.length + 'vw'
  
       
        if (questions[position]) hideCurrent(putQuestion)
        else hideCurrent(done)
               
      })
  
    }
  
   
  
    function hideCurrent(callback) {
      inputContainer.style.opacity = 0
      inputProgress.style.transition = 'none'
      inputProgress.style.width = 0
      setTimeout(callback, wTime)
    }
  
    function showCurrent(callback) {
      inputContainer.style.opacity = 1
      inputProgress.style.transition = ''
      inputProgress.style.width = '100%'
      setTimeout(callback, wTime)
    }
  
    function transform(x, y) {
      register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }
  
    function ok(callback) {
      register.className = ''
      setTimeout(transform, tTime * 0, 0, 10)
      setTimeout(transform, tTime * 1, 0, 0)
      setTimeout(callback,  tTime * 2)
    }
  
    function wrong(callback) {
      register.className = 'wrong'
      for(var i = 0; i < 6; i++) 
        setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
      setTimeout(transform, tTime * 6, 0, 0)
      setTimeout(callback,  tTime * 7)
    }
  
  }())