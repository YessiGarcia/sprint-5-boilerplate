var api = {
  url: 'https://examen-laboratoria-sprint-5.herokuapp.com/'
};

var $listaComentarios = $("#lista-topics");
var $plantillaFinal = "";

var cargarPagina = function () {
  cargarComentarios();
  $("#add-form").submit(agregarComentario);
};

var plantilla = 
'<tr>' +
  '<td>__autor__</td>' +
  '<td>__topic__</td>' +
'</tr>';

var crearComentario = function(topic){
   plantillaFinal += plantilla.replace("__autor__", comentario.autor)
     .replace("__topic__", comentario.topic);
 };

var cargarComentarios = function (){
  $.getJSON(api.url, function(topics){
    topics.forEach(crearComentario);
    $('#lista-comentarios').html(plantillaFinal);
  });
};

var agregarComentario = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-comentario").val();
  var comentario = $("#comentario").val();
  $.post(api.url, {
    autor: nombre,
    topic:comentario
  }, function (topic) {
    crearComentario(comentario);
    $("#myModal").modal("hide");
  });
};

$(document).ready(cargarPagina);
