(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  'use strict';
  
  

  self.addEventListener('install', function(event){
    var urlsToCache=[
      '/',
      '/index.html', 
      'bootstrap/css/bootstrap.min.css',
      'http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
      'bootstrap/js/bootstrap.min.js',
      'bootstrap/js/jQuery.js',
      '/app.js',
      '/p5.min.js',
      '/indexController.js'

      
      
    ]; 
    event.waitUntil(
      // open a cache with the name news-cache
      // Add cache the urls from urlsToCache
      caches.open('news-cache1').then(function(cache){
        return cache.addAll(urlsToCache)
      })
      
    )
  })

  self.addEventListener('activate', function(event){
  // TODO: remove the old cache
    event.waitUntil(
      caches.delete('news-cache2')
    )
  })

  

  self.addEventListener('fetch',  function(event){
    // Todo: Respond from an entry from the cache
    // If there isn't fetch the network
    event.respondWith(
      caches.match(event.request).then(function(response){
        if(response) return response;
        return fetch(event.request)
      })

    )
  }) 
  },{}],2:[function(require,module,exports){
  "use strict";
  
  var r = FetchEvent.prototype.respondWith;
  FetchEvent.prototype.respondWith = function () {
    return new URL(this.request.url).search.endsWith("bypass-sw") ? void 0 : r.apply(this, arguments);
  };
  
  },{}]},{},[1,2])
  
  // # sourceMappingURL=sw.js.map
  
