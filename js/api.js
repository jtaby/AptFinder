require('app.js');

AptFinder.API = SC.Object.create({
  loadListings: function(map) {
    var rssURL = "http://sfbay.craigslist.org/search/apa/sfc?query=&srchType=A&minAsk=500&maxAsk=1100&bedrooms=&format=rss"
    var response;

    return response = jQuery.ajax(rssURL, {
      dataType: 'xml',
      success: function(response) {
        var routes;
        console.log(response);
        var listings = AptFinder.API._listingsFromXMLResponse(response, map);
      }
    });
  },
  
  _listingsFromXMLResponse: function(xml, map) {
    var body, routes;

    $(xml).find('item').each(function(){
      var title = $(this).find('title').text()
      var description = $(this).find('description').text()
      
      var xstreet0 = description.match(/<!--\sCLTAG xstreet0=(.*)\s-->/)
      if (xstreet0) xstreet0 = xstreet0[1]
      
      var xstreet1 = description.match(/<!--\sCLTAG xstreet1=(.*)\s-->/)
      if (xstreet1) xstreet1 = xstreet1[1]
      
      var city = description.match(/<!--\sCLTAG city=(.*)\s-->/)
      if (city) city = city[1]
      
      var region = description.match(/<!--\sCLTAG region=(.*)\s-->/)
      if (region) region = region[1]
      
      var address = xstreet0 + " " + xstreet1 + " " + city + " " + region
      
      console.log('address',address);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
              map: map, 
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    });
    
    // body = $(xml).find('body > route');
    //     routes = [];
    //     body.each(function() {
    //       var route;
    //       route = $(this);
    //       return routes.push(Muni.Route.create({
    //         tag: route.attr('tag'),
    //         title: route.attr('title')
    //       }));
    //     });
    //     return routes; 
  }
  
});