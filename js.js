window.onload = function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {
                $("#categorias").append("<a href='#' id=" + elemento.id + ">" + elemento.nombre + "</a>");
                if (elemento.activa == "true") {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/articulos?idCat=" + elemento.id + "",
                        success: function (json) {
                            json.map(elemento => {
                                //console.log(elemento.id);
                                $("#articulos").append("<div class='caja' href='#' id=" + elemento.id + "><p>" + elemento.nombre + "</p><p>" + elemento.descripcion + "</p><p>" + elemento.precio +
                                    "</p></div>");
                            });
                        }
                    });
                }
            });
        }
    });

    $("#categorias").on("click", "a", function () {//FUNCION PARA PINTAR PRODUCTOS DE UNA CATEGORIA
        $("#articulos").html('');
        idCat = ($(this).attr("id"));
        console.log(idCat);
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?idCat=" + idCat + "",
            success: function (json) {
                json.map(elemento => {
                    console.log(elemento.id);
                    $("#articulos").append("<div class='caja' href='#' id=" + elemento.id + "><p>" + elemento.nombre + "</p><p>" + elemento.descripcion + "</p><p>" + elemento.precio +
                        "</p></div>");
                });
            }
        });
    })
    //Mostrar modal del articulo
    $("#articulos").on("click", "div", function () {
        cod = $(this).attr("id")
        console.log(cod)
        nombre = $(this).find("p:nth-child(1)").html()
        descripcion = $(this).find("p:nth-child(2)").html()
        precio = $(this).find("p:nth-child(3)").html()
        console.log(precio);
        //$(".modal-body").html("");
        //$("#id").append(cod);
        $("#id").val(cod);
        $("#nombre").val(nombre);
        $("#descripcion").val(descripcion);
        $("#precio").val(precio);
        $("#modalArticulo").modal("show");
    });

    $("#btnGrabar").on("click", function (){
        datos = $('#ficha').serialize();
        idProd = $("#id").val();
        console.log(idProd);
        $.ajax({
            method: "PATCH",
            url: "http://localhost:3000/articulos/" + idProd + "",
            data: datos,
            success: function (response) {
                alert("FUNCIONA");
            }
        });
        $("#modalArticulo").modal("hide");
    });
};