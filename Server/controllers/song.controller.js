import Song from '../models/song.model.js'

export const SongController = {
    createSong: async (req, res) => {
        try{
            const newSong = await Song.create(req.body)
            console.log(newSong);
            return res.status(201).json(newSong)
        }
        catch(err){

            return res.status(500).json(err)
        }
    },

    getAllSongs: async (req, res) => {
        try{
            const allSongs = await Song.find()
            return res.status(200).json(allSongs)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    getOneSong: async (req, res) => {
        try{
            const id = req.params.id
            const oneSong = await Song.findById(id)
            return res.status(200).json(oneSong)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    deleteSong: async (req, res) => {
        try{
            const id = req.params.id
            await Song.findByIdAndDelete(id)
            return res.status(204).send()
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    updateSong: async (req, res) => {
        try{
            const options = {
                new: true,
                runValidators: true}
            const id = req.params.id
            const updatedSong = await Song.findByIdAndUpdate(id, req.body, options)
            return res.status(201).json(updatedSong)
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
}