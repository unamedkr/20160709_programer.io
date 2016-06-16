
PostSubs = new SubsManager();

Number.prototype.format = function(){
    if(this==0) return 0;
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

T = Template.instance.bind(Template.instance);


loadGoogleMaps = function() {
  // GoogleMaps.load({v: '3'});
  GoogleMaps.load({v: '3', key: 'AIzaSyBzTOuFxTqjDHvrfFrB9kysq_ZjBdr-gE0'});
}
