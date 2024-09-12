import Profile from '../models/profileSchema.js'
import bcrypt from "bcrypt"

/* export const addProfile = async (req, res) => {
    // crea nuova istanza del modello profile con i dati definiti nel corpo della richiesta 
    const profile = new Profile(req.body)
    profile.avatar = profile.avatar ? profile.avatar : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg'
    profile.backgroundImage = profile.backgroundImage ? profile.backgroundImage : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg'
    try {
        await profile.save() // salva i dati nel DB

        return res.send(profile)  // mando in risposta il nuovo profile salvato 
    } catch (error) {
        return res.status(400).send(error)
    }
} */

export const getSpecificProfile = async (req,res) => {
    // recupero l'id dal query string
    const id = req.params.id
    console.log(id)
    try {
        const foundProfile = await Profile.findById(id)
        res.status(200).send(foundProfile)
    } catch (error) {
        console.log('Profile not found')
        res.status(404).send('Profile not found')
    }
}

export const registerProfile = async (req, res) => {

    try {
        // verificare che la mail sia già utilizzata
        console.log('backend')
        const data = req.body
        console.log(data)
        const profile = await Profile.findOne({ email: req.body.email })
        if (profile) {
            return res.status(500).send('Mail già nel database.')
        }
        // se non è utilizzata allora registrare il nuovo utente con la password hashata
        const newProfile = new Profile({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            role: req.body.role,
            avatar: req.file ? req.file.path : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg',
            description: req.body.description,
            backgroundImage: req.file ? req.file.path : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg',
            experiences: [],
            // serve    googleId,
            verifictedAct: new Date()
        })

        const createdProfile = await newProfile.save()
        res.send(createdProfile)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
}

export const getAllProfile = async (req, res) => {
    try {
        const page = req.query.page || 1;
        let perPage = req.query.perPage || 3;
        perPage = perPage > 9 ? 3 : perPage  // se l'utente richiede più di 20 authors su una pagina saranno mostrati 3 authors come di default

        const profile = await Profile.find({})
            .collation({ locale: 'it' }) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
            .sort({ name: 1, surname: 1 })  // ordino gli oggetti JSON in ordine alfabetico secondo il nome e la cognome
            .skip((page - 1) * perPage) // salto documenti pagina precedente 
            .limit(perPage) // indico gli elementi da mostrare per pagina
            // .populate('experiences'); // serve in Me ??

        const totalResults = await Profile.countDocuments(); // conta tutti i documenti author nella collection 
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: profile,
            totalPages,
            totalResults,
            page,
        });
    } catch (err) {
        res.status(404).send();
    }
}

export const editProfile = async (req, res) => {
    const { id } = req.params
    try {
        const profile = await Profile.findByIdAndUpdate(id, {...req.body, password: await bcrypt.hash(req.body.password, 10)} , { new: true }) // trovo il profilo attraverso il proprio id pescato dalla richiesta e modifico i campi secondo il suo corpo
        await profile.save(); // salvo le modifiche sul DB
        res.send(profile)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const deleteProfile = async (req, res) => {
    const { id } = req.params
    try {
        const profile = await Profile.findByIdAndDelete(id)
        res.send(`Successfully deleted profile with id ${id}.`)
    } catch (error) {
        res.status(404).send({ message: `ID ${id} not found` })
    }
}

export const putAvatar = async (req, res) => {

    const { id } = req.params // recupero l'id dalla richiesta
    console.log(id)
    try {
        const profile = await Profile.findByIdAndUpdate(id, { avatar: req.file.path }, { new: true }) // trovo il profilo attraverso il proprio id esplicitato nella richiesta e lo modifica secondo il corpo di quest'ultima
        // console.log(profile)
        // await profile.save()
        res.status(200).send(profile)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const putbackImage = async (req, res) => {

    const { id } = req.params // recupero l'id dalla richiesta
    try {
        const profile = await Profile.findByIdAndUpdate(id, { backgroundImage: req.file.path }, { new: true }) // trovo il profilo attraverso il proprio id esplicitato nella richiesta e lo modifica secondo il corpo di quest'ultima

        res.status(200).send(profile)
    } catch (error) {
        res.status(400).send(error)
    }
}