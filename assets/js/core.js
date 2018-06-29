angular.module('CRUD', ["firebase"]).
controller('crudController', function($scope, $firebaseObject) {
  
  var ref = firebase.database().ref().child("data"),
  syncObject = $firebaseObject(ref);

  syncObject.$bindTo($scope, "oData");
    /*$scope.oData = {
      marcaSelecionada: "",
      modeloSelecionado: "",
      valor: "",
      marcas : ["Fiat","Toyota"],
      modelos : {
        Toyota: ["D","E","F"],
        Fiat: ["A","B","C"]      
      }
    }*/
});

function removerItem(p_item){ $(p_item).closest(".item").remove(); }

$(document).ready(function(){  
  $('select').formSelect();  

  $('[data-acao="inserir"]').on('click',function(){
    var oData = angular.element($('[ng-app="CRUD"]')).scope().oData,
    strValor = $('#valor').val();

    if(strValor == "" || oData.modeloSelecionado == null || oData.marcaSelecionada == null){
      M.toast({html: 'Por favor, insira as informações adequadamente!', classes: 'red darken-3'});
      return;
    }
    
    var strHTML = '<tr class="item">'
      +'<td>'+oData.marcaSelecionada+'</td>'
      +'<td>'+oData.modeloSelecionado+'</td>'
      +'<td>'+strValor+'</td>'
      +'<td><a onclick="removerItem(this);" class="btn-floating btn-large waves-effect waves-light blue darken-1"><i class="material-icons">delete_forever</i></a></td>'
    +'</tr>'
    
    $('#valor').val("");
    $('.conteudo-tabela').append(strHTML);
  });  
});