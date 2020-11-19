const cors = require('cors')({origin: true});

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp()
admin.firestore().settings({
  timestampsInSnapshots: true
})
const db = admin.firestore()


exports.actualizarcolor = functions.firestore
  .document('categoriaEventos/{id}')
  .onUpdate(async (change, context) => {
    const actual = change.after.data()
    const anterior = change.before.data()
    console.log(actual);


    if (actual.color !== anterior.color) {
      let batch = db.batch()

      try{
        let resultado = await db.collection('categoriaEventos').doc(context.params.id).get()
          console.log(resultado.data());

          resultado.forEach((doc) => {
            let evento = doc.data();
            
            console.log(evento);
  
            batch.update(
              db.collection('Eventos')
              .where('idTipoEvento', '==', evento.idTipoEvento), {
                'colorCat': actual.color,
              }
            );
          });
        return batch.commit()
      } catch (error) {
        console.log(error)
      }
    }

    return null
  })