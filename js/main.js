var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/'
};

var $listaTopics = $("#lista-topics");

var cargarPagina = function () {
  cargarTopics();
  $("#add-form").submit(agregarTopics);
};

var cargarTopics = function () {
  $.getJSON(api.url, function (topics) {
    topics.forEach(crearTopic);
  });
};

var crearTopic = function (topic) {
  var nombre = topic.author_name;
  var tema = topic.content[0];
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

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#author_name").val();
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