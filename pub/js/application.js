(function(){

  const ID='634fd573-3162-48a9-99ca-87c2e7af08e7';
  const PUBLIC='e5764723-8bb8-4c55-aef6-abc09287a48c';
  /**** MAIN ELEMENTS ***/
  var mjml = document.getElementById('main-mjml'),
      l = document.getElementById('lines'),
      p = document.getElementById('preview'),
      h = document.getElementById('main-html'),
      t = document.getElementById('text-contain'),
      type = document.getElementById('type-toggle');

  mjml.addEventListener('keydown', function(e){
    if(e.keyCode===9){
      e.preventDefault();
      // add support for tabs
    }
  });
  h.addEventListener('keydown', function(e){
    if(e.keyCode===9){
      e.preventDefault();
      // add support for tabs
    }
  });

  /*** TEXT INPUT LISTENERS ***/
  h.addEventListener('keyup', function(e){
    var lines = h.value.split(/\n/),
        nums = '';
    for( line in lines ){
      nums += `${parseInt(line) + 1}<br/>`;
    }
    l.innerHTML=nums;
    l.scrollTop = h.scrollTop;
    p.innerHTML = h.value;
  })

  mjml.addEventListener('keyup', function(e) {
    var lines = mjml.value.split(/\n/),
        nums = '';
    for( line in lines ){
      nums += `${parseInt(line) + 1}<br/>`;
    }
    l.innerHTML=nums;
    l.scrollTop = mjml.scrollTop;

    trigger_render(mjml.value);
  });

  mjml.addEventListener('scroll', function(){
    l.scrollTop = t.scrollTop;
  })
  h.addEventListener('scroll', function(){
    l.scrollTop = h.scrollTop;
  })
  l.addEventListener('scroll', function(){
    t.scrollTop = l.scrollTop;
    h.scrollTop = l.scrollTop;
  })

  mjml.focus();

  /**** TOGGLE ****/
  type.addEventListener('click', function(){
    var toggleText = document.querySelector('#type-toggle span'),
        nums = '',
        lines;
    toggleText.textContent = toggleText.textContent==='MJML' ? 'HTML' : 'MJML';

    lines = toggleText.textContent ==='HTML' ? h.value.split(/\n/) : mjml.value.split(/\n/);

    for( line in lines ){
      nums += `${parseInt(line) + 1}<br/>`;
    }
    l.innerHTML=nums;
    l.scrollTop = h.scrollTop;

    t.classList.toggle('html-show');


  });


  var trigger_render = (function(){
    var timer = 0;
    return function(toRender){
      clearTimeout (timer);
      timer = setTimeout(function(){
        render(toRender);
      }, 1000);
    };
  })();

  /*** AXIOS STUFF ***/
  var render = (content) => {
    var header = { headers: {"Authorization": `Basic ${btoa(`${ID}:${PUBLIC}`)}`} },
        body = { "mjml": content || "<mjml><mj-body><mj-container></mj-container></mj-body></mjml>" };
    axios.post('https://api.mjml.io/v1/render',body,header).then(
      (res) => {
        // render the html
        p.innerHTML=res.data.html;
        // populate the html textarea
        h.value = res.data.html;
      }
    ).catch( (err) => {
      // create error messagee
      var error = document.createElement('p');
      error.style="color:red; margin: 20px;";
      error.textContent = err.response.data.message || err.message;
      p.appendChild(error);
    })
  }

})();
