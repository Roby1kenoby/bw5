import jwt from 'jsonwebtoken'
import Profiles from '../models/profileSchema.js'
import 'dotenv/config'

export default (req, res, next) => {
    const authData = req.headers.authorization
    // non c'è l'header authorization
    if(!authData) return res.status(400).send('Unauthorized access')
    
    const authPart = authData.split(' ')
    // c'è l'header authorization, ma non ha i parametri corretti (bearer e token)
    if(authPart.length != 2) return res.status(400).send('Unauthorized access')
    
    // c'è il numero giusto di parti, ma non c'è il Bearer
    if(authPart[0] != 'Bearer') return res.status(400).send('Unauthorized access')

    const token = authPart[1]

    jwt.verify(token,
        process.env.JWT_SECRET,
        //callback
        async(error, payload) => {
            if(error) return res.status(500).send('Server error: ' + error)
            
            // cerco il profilo corrispondente all'id memorizzato nel token e recupero i dati (tranne la pass)
            const profile = await Profiles.findById(payload.userId).select('-password').populate('experiences')
            // se non trovo l'autore, errore
            if(!profile) return res.status(400).send('Unauthorized access')
            
            // aggiungo alla richiesta l'utente individuato
            req.loggedUser = profile
 
            // passo allo step successivo
            next()
        }
    )
}