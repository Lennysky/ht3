import {NextFunction, Request, Response} from "express";

export const authValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    /* ЛЕГКИЙ СПОСОБ С ХАРДКОДОМ
    * Мы знаем, что л/п конкретно admin:qwerty.
    * Мы можем сами закодировать и получить закодированный admin:qwerty
    * Потом прибавить к ней Basic.
    * Потом проверить, что тот заголовок, который к нам прилетает, равен этой строке.
    **/
    /* БОЛЕЕ ГРОМОЗДКИЙ СПОСОБ С БД
    * Когда закодированная строка прилетит на бэк...
    * Если бы бэку, нужно было доставать по логину юзера,
    * смотреть его пароль в БД, то
    * нужно было бы расшифровать кодировку,
    * получить строку,
    * достать логин
    * пойти в БД, проверить, есть ли такой юзер,
    * если есть, соответствует ли его пароль тому паролю, который мы расшифровали,
    * если да, пропустить, если нет - 401
    * */
    /*
    * Объявить переменную с л/п, запилить туда в строку это значение.
    * Объявить переменную с буфером, присвоить ей новый метод Buffer, скормить перем. с л/п.
    * Объявить переменную с закодированным паролем, заюзать метод buff.toString,
    * скормить, в какой кодировке шифровать.
    * Объявить переменную с готовой строкой, где сконкатенированы слово Basic и знач-е закодир. л/п.
    * Объявить перем. с вытащенными хэдерами, присвоить ей значение, что оно пришло из
    * реквестов-хэдеров, в массиве - значение ['authorization']
    * сравнить готовую строку и то, что пришло из хедеров
    * если ок, передать исполнение дальше. Если нет - 401.
    */
    const encodedCreds = Buffer.from('admin:qwerty').toString('base64');
    const fullAuthHeaderValue = 'Basic ' + encodedCreds;
    const incomeAuthValue = req.headers['authorization'];
    console.log(fullAuthHeaderValue === incomeAuthValue)
    if (fullAuthHeaderValue === incomeAuthValue) {
        next()
    } else {
        res.status(401).send()
    }
}