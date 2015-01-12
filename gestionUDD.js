Mejoras = new Mongo.Collection('mejoras');

if (Meteor.isClient) {
  Session.setDefault("filtroResponsables", "nadie");

  Template.Home.helpers({
    mejora: function() {
      //return Mejoras.find( {} , { sort: { ndebilidad: 1, naccion: 1 } });
      var filtroResponsables = Session.get("filtroResponsables");

      switch (filtroResponsables) {
        case "decano":
          return Mejoras.find({
            "responsables.decano": true
          }).fetch()
          break;

        case "viceDecano":
          return Mejoras.find({
            "responsables.viceDecano": true
          }).fetch()
          break;

        case "directorPregrado":
          return Mejoras.find({
            "responsables.directorPregrado": true
          }).fetch()
          break;


        case "directorExtension":
          return Mejoras.find({
            "responsables.directorExtension": true
          }).fetch()
          break;

        case "coordinadorPlanificacion":
          return Mejoras.find({
            "responsables.coordinadorPlanificacion": true
          }).fetch()
          break;

        case "coordinadorPregradoScl":
          return Mejoras.find({
            "responsables.coordinadorPregradoScl": true
          }).fetch()
          break;

        case "coordinadorPregradoCcp":
          return Mejoras.find({
            "responsables.coordinadorPregradoCcp": true
          }).fetch()
          break;

        case "investigador":
          return Mejoras.find({
            "responsables.investigador": true
          }).fetch()
          break;


        case "coordinadorAdmision":
          return Mejoras.find({
            "responsables.coordinadorAdmision": true
          }).fetch()
          break;


        default:
          return Mejoras.find({}).fetch();

      }


      //return Mejoras.find({ "responsables.decano":true}).fetch()


    },
    responsableActual: function() {
      return Session.get("filtroResponsables")
    }
  });


  Template.mejoraShow.helpers({
    muestraResponsables: function() {
      var _mejora = Mejoras.fincOne(this._id);
      return _mejora;
    }
  });


  Router.route('/', function() {
    this.render('Home');
  });

  Router.route('/nueva', function() {
    this.render('Nueva');
  });

  Router.route('/mejora', function() {
    this.render('Nueva');
  });

  Router.route('/mejora/:_id', function() {
    this.render('Mejora', {
      data: function() {
        return Mejoras.findOne({
          _id: this.params._id
        });
      }
    });
  });

  Router.route('/edicion/:_id', function() {
    this.render('Edita', {
      data: function() {
        return Mejoras.findOne({
          _id: this.params._id
        });
      }
    });
  });

  Template.nav.events({
    'click .deleteButton': function() {
      var confirmation = prompt("Escribe BORRAR para confirmar", "");
      if (confirmation != null) {
        if (confirmation == "BORRAR") {
          Mejoras.remove(this._id);
          //console.log("Borré este id")
          Router.go('/');

        } else {
          console.log("No borré nada")
        }
      }
    },
    'click .saveButton': function(event) {
      var _id = this._id;

      var _ndebilidad = document.getElementsByName("v_ndebilidad").value;
      var _naccion = document.getElementsByName("v_naccion").value;
      var _estado = document.getElementsByName("v_estado").value;
      var _descripcion = document.getElementsByName("v_descripcion").value;
      var _objetivos = document.getElementsByName("v_objetivos").value;
      var _accion = document.getElementsByName("v_accion").value;
      var _indicador = document.getElementsByName("v_indicador").value;
      var _meta = document.getElementsByName("v_meta").value;
      var _plazo = document.getElementsByName("v_plazo").value;
      var _presupuesto = document.getElementsByName("v_presupuesto").value;
      var _responsable = document.getElementsByName("v_responsable[]");
      var _avance = document.getElementsByName("v_avance").value;

      var _responsables = {}

      for (k = 0; k < _responsable.length; k++) {
        _responsables[_responsable[k].value] = _responsable[k].checked;
      }

      var updateData = {
        ndebilidad: _ndebilidad,
        naccion: _naccion,
        estado: _estado,
        descripcion: _descripcion,
        objetivos: _objetivos,
        accion: _accion,
        indicador: _indicador,
        meta: _meta,
        plazo: _plazo,
        presupuesto: _presupuesto,
        responsables: _responsables,
        avance: _avance,
        revision: new Date()

      }
      console.log(_ndebilidad);

      //Mejoras.update(_id, {$set: {newData} );



      /*Mejoras.update(this._id, {$set: {
        accion: _accion.innerHTML,
        meta: editor.v_meta
      }})*/

    },
    'click .filterMenu': function(event) {
      //console.log(event.target.dataset.id)
      Session.set("filtroResponsables", event.target.dataset.id);
    }
  });


  Template.nuevaAccion.events({
    'submit form': function(event) {
      event.preventDefault();

      var _id = this._id;
      var _ndebilidad = event.target.v_ndebilidad.value;
      var _naccion = event.target.v_naccion.value;
      var _estado = event.target.v_estado.value;
      var _descripcion = event.target.v_descripcion.value;
      var _objetivos = event.target.v_objetivos.value;
      var _accion = event.target.v_accion.value;
      var _indicador = event.target.v_indicador.value;
      var _meta = event.target.v_meta.value;
      var _plazo = event.target.v_plazo.value;
      var _presupuesto = event.target.v_presupuesto.value;
      var _responsable = document.getElementsByName("v_responsable[]");
      var _avance = event.target.v_avance.value;

      var _responsables = {}

      for (k = 0; k < _responsable.length; k++) {
        _responsables[_responsable[k].value] = _responsable[k].checked;
      }

      var newData = {
        ndebilidad: _ndebilidad,
        naccion: _naccion,
        estado: _estado,
        descripcion: _descripcion,
        objetivos: _objetivos,
        accion: _accion,
        indicador: _indicador,
        meta: _meta,
        plazo: _plazo,
        presupuesto: _presupuesto,
        responsables: _responsables,
        avance: _avance,
        revision: new Date()

      }

      if (_id == undefined) {
        //console.log("new entry, therefor insert");
        Meteor.call("crearAccion", newData);
      } else {
        //console.log("Existing entry, therefor update");
        Meteor.call("actualizarAccion", _id, newData);
      }
    }
  });

  Template.mejoraForm.events({
    'submit form': function(event) {
      event.preventDefault();

      var _id = this._id;
      var _ndebilidad = event.target.v_ndebilidad.value;
      var _naccion = event.target.v_naccion.value;
      var _estado = event.target.v_estado.value;
      var _descripcion = event.target.v_descripcion.value;
      var _objetivos = event.target.v_objetivos.value;
      var _accion = event.target.v_accion.value;
      var _indicador = event.target.v_indicador.value;
      var _meta = event.target.v_meta.value;
      var _plazo = event.target.v_plazo.value;
      var _presupuesto = event.target.v_presupuesto.value;
      var _responsable = document.getElementsByName("v_responsable[]");
      var _avance = event.target.v_avance.value;

      var _responsables = {}

      for (k = 0; k < _responsable.length; k++) {
        _responsables[_responsable[k].value] = _responsable[k].checked;
      }

      var newData = {
        ndebilidad: _ndebilidad,
        naccion: _naccion,
        estado: _estado,
        descripcion: _descripcion,
        objetivos: _objetivos,
        accion: _accion,
        indicador: _indicador,
        meta: _meta,
        plazo: _plazo,
        presupuesto: _presupuesto,
        responsables: _responsables,
        avance: _avance,
        revision: new Date()

      }

      if (_id == undefined) {
        console.log("new entry, therefor insert");
        Mejoras.insert(newData, function(err, newId) {
          Router.go('/edicion/' + newId);
        });
      } else {
        console.log("Existing entry, will update", newData);
        Mejoras.update(_id, {
          $set: newData
        });
        //Router.go('/');
      }
    }
  });

  Template.mejoraEdit.events({
    'submit form': function(event) {
      event.preventDefault();

      var _id = this._id;
      var _ndebilidad = event.target.v_ndebilidad.value;
      var _naccion = event.target.v_naccion.value;
      var _estado = event.target.v_estado.value;
      var _descripcion = event.target.v_descripcion.value;
      var _objetivos = event.target.v_objetivos.value;
      var _accion = event.target.v_accion.value;
      var _indicador = event.target.v_indicador.value;
      var _meta = event.target.v_meta.value;
      var _plazo = event.target.v_plazo.value;
      var _presupuesto = event.target.v_presupuesto.value;
      var _responsable = document.getElementsByName("v_responsable[]");
      var _avance = event.target.v_avance.value;

      var _responsables = {}

      for (k = 0; k < _responsable.length; k++) {
        _responsables[_responsable[k].value] = _responsable[k].checked;
      }

      var newData = {
        ndebilidad: _ndebilidad,
        naccion: _naccion,
        estado: _estado,
        descripcion: _descripcion,
        objetivos: _objetivos,
        accion: _accion,
        indicador: _indicador,
        meta: _meta,
        plazo: _plazo,
        presupuesto: _presupuesto,
        responsables: _responsables,
        avance: _avance,
        revision: new Date()

      }

      if (_id == undefined) {
        console.log("new entry, therefor insert");
        //Meteor.call("crearAccion", newData);
      } else {
        console.log("Existing entry, will update", newData);
        Mejoras.update(_id, {
          $set: newData
        });
        //Router.go('/');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}

// Use UI.registerHelper.
var DateFormats = {
  short: "DD/MMMM/YYYY",
  long: "dddd DD.MM.YYYY HH:mm"
};

UI.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    f = DateFormats[format];
    return moment(datetime).format(f);
  } else {
    return datetime;
  }
});
UI.registerHelper('selected', function(key, value) {
  return key == value ? {
    selected: 'selected'
  } : '';
});
UI.registerHelper('checked', function(key, value) {
  return key == value ? {
    checked: 'checked'
  } : '';
});
UI.registerHelper('arrayify', function(obj) {
  result = [];
  for (var key in obj) result.push({
    name: key,
    value: obj[key]
  });
  return result;
});


Meteor.methods({
  guardarAccion: function(mejoraId, newData) {
    Mejoras.update(mejoraId, {
      $set: newData
    });
    Router.go('/');
  },
  crearAccion: function() {
    Mejoras.insert(newData);
    Router.go('/');
  }
});