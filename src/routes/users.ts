import { response, Router } from 'express';
const router = Router();

router.get('/', (req,res) => {
    res.json({
        name: "thoai ky"
    })
})


export default router;