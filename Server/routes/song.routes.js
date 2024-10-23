import {Router} from 'express'
import { SongController } from "../controllers/song.controller.js"

const router = Router()

router.route('/songs')
    .post(SongController.createSong)
    .get(SongController.getAllSongs)

router.route('/songs/:id')
    .get(SongController.getOneSong)
    .delete(SongController.deleteSong)
    .put(SongController.updateSong)

    export default router;