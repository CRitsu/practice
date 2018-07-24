(function() {
  var $search = $("#search");
  $("#search-icon").on("click", action);
  $search.on('blur', action);
  function action() {
    $search.toggleClass("opacity-0");
    placeSearchIcon();
  }
  function placeSearchIcon() {
    if ($search.hasClass("opacity-0")) {
      var w = $search.width();
      $("#search-area").css("left", w + 18);
      $search.css("opacity", 0);
      // $search.blur();
      return;
    }
    $("#search-area").css("left", 0);
    $search.css("opacity", 1);
    $search.focus();
  }
  placeSearchIcon();
})();
