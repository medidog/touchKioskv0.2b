var _preventDefault = function(evt) { evt.preventDefault(); };
$("div").bind("dragstart", _preventDefault).bind("selectstart", _preventDefault);