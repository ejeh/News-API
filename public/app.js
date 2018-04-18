//  var url = 'https://newsapi.org/v2/top-headlines?country=ca&apiKey=80c8bc2d96c347cab62f73c7322bf490'
// import idb from 'idb' 


// creating IndexedDb database for storing articles and also bookmark favourite articles
var dbPromise = idb.open('test-db', 3, function (upgradeDb) {
    switch (upgradeDb.oldVersion) {
        case 0:

        case 1:
            var alcNews = upgradeDb.createObjectStore('alcNews', { keyPath: 'publishedAt' });
            alcNews.createIndex('time-index', 'publishedAt');
        case 2:
            var favNews = upgradeDb.createObjectStore('fav-news', { keyPath: 'title' })
            favNews.createIndex('fav-index', 'title')
    }
})

//fetching headline news
var api = 'https://newsapi.org/v2/top-headlines?country='

var apiKey = '&apiKey=80c8bc2d96c347cab62f73c7322bf490';

function setup() {
    document.getElementById('submit').
        onclick = clickHandler;
    function clickHandler() {
        var city = document.getElementById('city').value;
        console.log(city);
        var url = api + city + apiKey;
        loadJSON(url, gotData);
    }
}
function gotData(data) {
    var articles = data.articles
    dbPromise.then(function (db) {
        var tx = db.transaction('alcNews', 'readwrite');
        var store = tx.objectStore('alcNews')
        data.articles.map(article => {
            return store.put(article)
        })
    })


    var articles = data.articles
    for (var i = 0; i < articles.length; i++) {
        var newsapi = document.getElementById('headlines').
            innerHTML += `<p>${articles[i].source.name} </p><p>${articles[i].title}</p><a href="${articles[i].url}">${articles[i].url}`
        console.log(articles[i].source.name)
        console.log(articles[i].title)

    }
}
setup();

//fetching news sources
function settup() {
    var sourcesApi = 'https://newsapi.org/v2/sources?apiKey=80c8bc2d96c347cab62f73c7322bf490'
    document.getElementById('click').
        onclick = clickHandler;
    function clickHandler() {
        var city = document.getElementById('source').value;
        //console.log(city);
        // var url = api + city + apiKey;
        loadJSON(sourcesApi, getData);
    }
}

function getData(data) {
    console.log(data)
    var sources = data.sources
    for (var i = 0; i < sources.length; i++) {
        var newsapi = document.getElementById('news').
            innerHTML += `<p>${sources[i].name}
        <a href="${sources[i].url}">${sources[i].url}</a>`
        // console.log(sources[i].url)
        // console.log(sources[i].name)


    }
}
settup()
