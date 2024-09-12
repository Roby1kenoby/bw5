import Experiences from '../models/experiencesSchema.js';
import Profile from '../models/profileSchema.js';

export const getUserExperiences = async (req, res) => {
/*      try {
        const experiences = await Experiences.find({ user: req.params.userId });
        res.send(experiences);
    } catch (error) {
        res.status(404).send({ message: 'Experiences not found' });
    }  */
    const user = await Profile.findById(req.params.userId).populate('experiences')
    console.log(user)
    res.send(user.experiences)
    
};

export const getExperiences = async (req, res) => {
/*     try {
        const experiences = await Experiences.find({ user: req.user._id });
        res.send(experiences);
    } catch (error) {
        res.status(404).send({ message: 'Experiences not found' });
    } */
        res.send(req.loggedUser.experiences)
};

/* export const addExperience = async (req, res) => {
    const newExperience = new Experiences({
        ...req.body,
        user: req.user.id
    });

    try {
        const savedExperience = await newExperience.save();
        res.status(201).send(savedExperience);
    } catch (error) {
        res.status(400).send(error);
    }
}; */

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
        // userId: req.loggedUser.id,
        imageExperience: coverPath // percorso del file caricato
    }); 

    let exper
    try {
        exper = await experiences.save() // salva i dati nel DB
        req.loggedUser.experiences.push(exper)
        await req.loggedUser.save()
        // mando in risposta il nuovo blogpost salvato 
        res.send(exper) // non eseguo il return per poter mandare la mail e dunque per entrare nel secondo blocco try 
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

export const uploadImageExperience = async (req, res) => {
    const coverPath = req.file ? req.file.path : null;
    if (!coverPath) {
        return res.status(400).send({ message: 'No image uploaded' });
    }

    try {
        const experience = await Experiences.findByIdAndUpdate(
            req.params.expId,
            { imageExperience: coverPath },
            { new: true }
        );
        res.send(experience);
    } catch (error) {
        res.status(400).send({ message: 'Error uploading image' });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const experience = await Experiences.findOneAndUpdate(
            { _id: req.params.expId, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!experience) {
            return res.status(404).send({ message: 'Experience not found' });
        }

        res.send(experience);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const experience = await Experiences.findOneAndDelete({
            _id: req.params.expId,
            user: req.user._id
        });

        if (!experience) {
            return res.status(404).send({ message: 'Experience not found' });
        }

        res.send({ message: 'Experience deleted' });
    } catch (error) {
        res.status(400).send({ message: 'Error deleting experience' });
    }
};