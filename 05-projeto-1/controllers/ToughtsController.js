const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController{
    static async showToughts(req, res){

        const toughtsData = await Tought.findAll({
            include: User,
        })

        //console.log(toughtsData)

        const toughts =  toughtsData.map(result => result.get({ plain: true }))

        console.log(toughts)

        res.render('toughts/home', { toughts })
    }

    static async dashboard(req, res){
        // Get id user on session
        const userid = req.session.userid
        
        // Find user by id
        const user = await User.findOne({plain:true, where: { id: userid } , include: Tought})

        // Check if user exists
        if(!user){
            res.redirect('/login')
        }

        const toughts =  user.Toughts.map(result => result.dataValues)

        //console.log(toughts)

        let emptyToughts = false

        if(toughts.length == 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = { 
            title: req.body.title,
            UserId: req.session.userid,
        }
        try{
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
            
        } catch(err){
            console.log('Aconteceu um erro ao criar o pensamento', err)
        }
    }
    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userid

        try{
            await Tought.destroy({where: { id:id, UserId: UserId}})

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        }catch (error){
            console.log('Aconteceu um erro ao remover o pensamento', error)
        }
    }

    static async updateTought(req, res){
        const id = req.params.id

        const tought = await Tought.findOne({raw: true, where: { id: id}})

        //console.log(tought)

        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res){
        const { id, title } = req.body
        
        try{
            await Tought.update({title}, {where: { id }})

            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }catch (error){
            console.log('Aconteceu um erro ao atualizar o pensamento', error)
        }
    }
}