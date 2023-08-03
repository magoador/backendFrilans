const Work = require('../models/Work.model');

module.exports.workController = {
    // Создание новой работы
    createWork: async (req, res) => {
        try {
            const { workType, subject, title, deadline, description, price } = req.body;

            // Проверка наличия типа работы и валидности ObjectId
            if (!workType.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json('Неверный формат ID типа работы');
            }

            // Создание новой работы
            const work = await Work.create({ workType, subject, title, deadline, description, price });

            res.status(201).json(work);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при создании работы');
        }
    },

    // Получение списка всех работ
    getAllWorks: async (req, res) => {
        try {
            const works = await Work.find().populate('workType', 'name');

            res.json(works);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при получении списка работ');
        }
    },

    // Удаление работы по ID
    deleteWork: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Проверка валидности ObjectId
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json('Неверный формат ID работы');
            }

            // Удаление работы
            const result = await Work.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json('Работа не найдена');
            }

            res.json('Работа успешно удалена');
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при удалении работы');
        }
    },

    // Изменение данных работы по ID
    updateWork: async (req, res) => {
        try {
            const { id } = req.params;
            const { workType, subject, title, deadline, description, price } = req.body;

            // Проверка валидности ObjectId
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json('Неверный формат ID работы');
            }

            // Изменение данных работы
            const result = await Work.findByIdAndUpdate(id, {
                workType, subject, title, deadline, description, price
            }, { new: true });

            if (!result) {
                return res.status(404).json('Работа не найдена');
            }

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при изменении работы');
        }
    }
};
