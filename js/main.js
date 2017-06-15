var api = {
  url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $listaTopics = $("#lista-topics");

var cargarPagina = function () {
  cargarTopics();
  $("#add-form").submit(agregarTopic);
};

var cargarTopics = function () {
  $.getJSON(api.url, function (contents) {
    contents.forEach(crearTopic);
  });
};

var crearTopic = function (content) {
  var nombre = content.author_name;
  var tema = content.content[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $temaTd = $("<td />");
  $temaTd.text(tema);
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($temaTd);
  // agregamos filas a la tabla
  $listaTopics.append($tr);
};

var agregarTopic = function (e) {
  e.preventDefault();
  var nombre = $("#autor").val();
  var tema = $("#comentario").val();
  $.post(api.url, {
    author_name: nombre,
    content: tema
  }, function (topic) {
    crearTopic(topic);
    $("#myModal").modal("hide");
  }); 
};

$(document).ready(cargarPagina);