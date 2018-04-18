
if('serviceWorker' in navigator){
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Registration worked!', registration.scope);
      }).catch(function(err) {
        console.log('Registration failed!', err);
      });

  })
}
