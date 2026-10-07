(function(){
  var d=document, $=function(s){return d.querySelector(s)};
  $('#yr').textContent=new Date().getFullYear();

  // Spotlight that follows the pointer over the services section
  var lit=$('.lit'), calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(lit&&!calm){
    lit.addEventListener('pointermove',function(e){
      var r=lit.getBoundingClientRect();
      lit.style.setProperty('--x',(e.clientX-r.left)+'px');
      lit.style.setProperty('--y',(e.clientY-r.top)+'px');
    });
  }
  if(calm){var v=$('.hero video');if(v){v.removeAttribute('autoplay');v.pause()}}

  // Contact form: validates, then opens the visitor's email app addressed to you.
  // Change CONTACT_EMAIL to your real address. For a hosted form, swap in Formspree or similar.
  var CONTACT_EMAIL='hello@YOUR-DOMAIN.com';
  var form=$('#form'), status=$('#status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements, ok=true;
    ['name','email','message'].forEach(function(n){
      var el=f[n], bad=!el.value.trim()||(n==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));
      el.setAttribute('aria-invalid',bad);
      if(bad)ok=false;
    });
    if(!ok){status.textContent='Please fill in your name, a valid email and a message.';return}
    var body='Name: '+f.name.value+'\nEmail: '+f.email.value+'\n\n'+f.message.value;
    location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Enquiry from '+f.name.value)+'&body='+encodeURIComponent(body);
    status.textContent='Opening your email app. Press send there to deliver your message.';
  });
})();
