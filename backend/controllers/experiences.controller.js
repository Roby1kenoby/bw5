import Experiences from '../models/experiencesSchema.js'
import Profile from '../models/profileSchema.js' 

export const addExperience = async (req, res) => {
    // crea nuova istanza del modello blogpost con i dati definiti nel corpo della richiesta 
    // per RestClient per Code => const blogpost = new blogPost(req.body) 
    /* blogPost di questo tipo 
    {
        "category": "Category2",
        "title": "La guerra fredda e il mondo diviso",
        "readTime": {
            "value": 36,
            "unit": "sec"
        },
        "author": "66d2e60e3bd1d520a9ab8840",
        "content": "This is the content of my awesome blog post.",
        "tags": [
            {"name": "history"},
            {"name": "politics scienze"}
        ]
    }
    in http PUT /blogpost */ 
    const coverPath = req.file ? req.file.path : null
    const experiences = new Experiences({
        ...req.body,
        imageExperience: coverPath // percorso del file caricato
    }); 
    let exper
    try {
        exper = await experiences.save() // salva i dati nel DB
        // mando in risposta il nuovo blogpost salvato 
        res.send(exper) // non eseguo il return per poter mandare la mail e dunque per entrare nel secondo blocco try 
    } catch (error) {
        return res.status(400).send(error)
    }
}

export const getExperiences = async (req,res)=>{
    try {
        const experiences = await Experiences.find({
            experience: req.params.id,
        })
       
        res.send({
            dati: experiences,
        })
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }  
}