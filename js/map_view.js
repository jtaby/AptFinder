require('app.js');

AptFinder.MapsLoaded = function() {
  // console.log(google);
  var latlng = new google.maps.LatLng(37.760, -122.469);
  var myOptions = {
    zoom: 13,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  };
  
  SC.$('.apt-finder-map-view').each(function(obj) {
    var map = new google.maps.Map($(this)[0], myOptions);
    
    // google.maps.event.addListener(map, 'center_changed', function() {
    //   console.log(map.center.toString());
    // })
    AptFinder.API.loadListings(map);
  });
}

AptFinder.MapView = SC.View.extend({
  
  classNames: ['apt-finder-map-view'],
  
  didCreateElement: function() {
    var script = document.createElement('script');
    var id = this.get('elementId');
    
    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=AptFinder.MapsLoaded";
    document.body.appendChild(script);
    
    return this._super();
  }  
});